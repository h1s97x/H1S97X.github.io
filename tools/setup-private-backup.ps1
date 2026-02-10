# 私有备份仓库设置脚本 (PowerShell版本)
# 用于创建和配置与当前仓库同名的私有GitHub仓库

param(
    [Parameter(Mandatory=$false)]
    [switch]$Status = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$Help = $false
)

# 设置错误处理
$ErrorActionPreference = "Stop"

class PrivateBackupSetup {
    [string]$CurrentRepoName
    [string]$PrivateRepoName
    [string]$ConfigPath
    
    PrivateBackupSetup() {
        $this.CurrentRepoName = $this.GetCurrentRepoName()
        $this.PrivateRepoName = "$($this.CurrentRepoName)-private-backup"
        $this.ConfigPath = ".github/private-backup-config.json"
    }
    
    # 获取当前仓库名称
    [string] GetCurrentRepoName() {
        try {
            $remoteUrl = git config --get remote.origin.url
            if ($remoteUrl -match "github\.com[:/]([^/]+)/(.+?)(?:\.git)?$") {
                return $matches[2]
            }
            throw "无法解析仓库名称"
        }
        catch {
            Write-Host "❌ 获取仓库名称失败: $($_.Exception.Message)" -ForegroundColor Red
            exit 1
        }
    }
    
    # 检查GitHub CLI是否已安装
    [bool] CheckGitHubCLI() {
        try {
            gh --version | Out-Null
            return $true
        }
        catch {
            return $false
        }
    }
    
    # 检查GitHub CLI认证状态
    [bool] CheckGitHubAuth() {
        try {
            gh auth status 2>$null | Out-Null
            return $true
        }
        catch {
            return $false
        }
    }
    
    # 创建私有备份仓库
    [bool] CreatePrivateRepo() {
        Write-Host "🚀 开始创建私有备份仓库..." -ForegroundColor Cyan
        
        if (-not $this.CheckGitHubCLI()) {
            Write-Host "❌ GitHub CLI 未安装。请先安装 GitHub CLI: https://cli.github.com/" -ForegroundColor Red
            Write-Host "💡 安装后运行: gh auth login" -ForegroundColor Yellow
            return $false
        }
        
        if (-not $this.CheckGitHubAuth()) {
            Write-Host "❌ GitHub CLI 未认证。请运行: gh auth login" -ForegroundColor Red
            return $false
        }
        
        try {
            # 检查仓库是否已存在
            try {
                gh repo view $this.PrivateRepoName 2>$null | Out-Null
                Write-Host "✅ 私有仓库 $($this.PrivateRepoName) 已存在" -ForegroundColor Green
                return $true
            }
            catch {
                # 仓库不存在，继续创建
            }
            
            # 创建私有仓库
            Write-Host "📦 创建私有仓库: $($this.PrivateRepoName)" -ForegroundColor Yellow
            gh repo create $this.PrivateRepoName --private --description "Private backup for $($this.CurrentRepoName)"
            
            Write-Host "✅ 私有备份仓库创建成功" -ForegroundColor Green
            return $true
        }
        catch {
            Write-Host "❌ 创建私有仓库失败: $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    }
    
    # 配置远程仓库连接
    [hashtable] ConfigureRemote() {
        Write-Host "🔗 配置远程仓库连接..." -ForegroundColor Cyan
        
        try {
            # 获取当前用户名
            $username = (gh api user --jq .login).Trim()
            $remoteUrl = "https://github.com/$username/$($this.PrivateRepoName).git"
            
            # 检查是否已存在 backup 远程
            try {
                git remote get-url backup 2>$null | Out-Null
                Write-Host "🔄 更新现有的 backup 远程..." -ForegroundColor Yellow
                git remote set-url backup $remoteUrl
            }
            catch {
                Write-Host "➕ 添加 backup 远程..." -ForegroundColor Yellow
                git remote add backup $remoteUrl
            }
            
            Write-Host "✅ 远程仓库配置完成: $remoteUrl" -ForegroundColor Green
            return @{
                username = $username
                remoteUrl = $remoteUrl
            }
        }
        catch {
            Write-Host "❌ 配置远程仓库失败: $($_.Exception.Message)" -ForegroundColor Red
            return $null
        }
    }
    
    # 验证仓库访问权限
    [bool] VerifyAccess() {
        Write-Host "🔐 验证仓库访问权限..." -ForegroundColor Cyan
        
        try {
            # 测试推送权限
            git ls-remote backup 2>$null | Out-Null
            Write-Host "✅ 仓库访问权限验证成功" -ForegroundColor Green
            return $true
        }
        catch {
            Write-Host "❌ 仓库访问权限验证失败: $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "💡 请检查 GitHub 认证状态和仓库权限" -ForegroundColor Yellow
            return $false
        }
    }
    
    # 生成访问令牌配置说明
    [string] GenerateTokenInstructions() {
        $username = (gh api user --jq .login).Trim()
        
        $instructions = @'
# GitHub 访问令牌配置说明

## 为 GitHub Actions 配置访问令牌

1. **创建个人访问令牌 (PAT)**:
   - 访问: https://github.com/settings/tokens
   - 点击 "Generate new token" > "Generate new token (classic)"
   - 设置令牌名称: `{0}-backup-token`
   - 选择权限:
     - `repo` (完整仓库访问权限)
     - `workflow` (工作流程权限)
   - 点击 "Generate token" 并复制令牌

2. **配置仓库 Secrets**:
   - 访问当前仓库的 Settings > Secrets and variables > Actions
   - 添加以下 secrets:
     - `BACKUP_REPO_TOKEN`: 刚创建的个人访问令牌
     - `BACKUP_REPO_NAME`: `{1}/{0}`

3. **验证配置**:
   - 手动触发 "Daily Repository Backup" 工作流程
   - 检查工作流程日志确认备份成功

## 本地配置 (可选)

如果需要本地脚本访问私有仓库，可以配置环境变量:

```powershell
# Windows (PowerShell)
$env:GITHUB_TOKEN = "your_token_here"
```

```bash
# Linux/macOS
export GITHUB_TOKEN="your_token_here"
```

## 安全注意事项

- ⚠️  **永远不要**将访问令牌提交到代码仓库
- 🔒 定期轮换访问令牌 (建议每90天)
- 👥 只授予必要的最小权限
- 📝 为令牌添加描述性名称以便管理
'@
        
        return $instructions -f $this.PrivateRepoName, $username
    }
    
    # 保存配置信息
    [void] SaveConfig([hashtable]$config) {
        Write-Host "💾 保存配置信息..." -ForegroundColor Cyan
        
        $configData = @{
            privateRepoName = $this.PrivateRepoName
            remoteUrl = $config.remoteUrl
            username = $config.username
            createdAt = (Get-Date).ToString("o")
            lastUpdated = (Get-Date).ToString("o")
        }
        
        # 确保 .github 目录存在
        $githubDir = Split-Path $this.ConfigPath -Parent
        if (-not (Test-Path $githubDir)) {
            New-Item -ItemType Directory -Path $githubDir -Force | Out-Null
        }
        
        $configData | ConvertTo-Json -Depth 10 | Out-File -FilePath $this.ConfigPath -Encoding UTF8
        Write-Host "✅ 配置已保存到: $($this.ConfigPath)" -ForegroundColor Green
        
        # 生成令牌配置说明
        $instructionsPath = ".github/BACKUP_TOKEN_SETUP.md"
        $this.GenerateTokenInstructions() | Out-File -FilePath $instructionsPath -Encoding UTF8
        Write-Host "📋 令牌配置说明已保存到: $instructionsPath" -ForegroundColor Green
    }
    
    # 执行完整设置流程
    [bool] Setup() {
        Write-Host "🎯 开始设置私有备份仓库..." -ForegroundColor Cyan
        Write-Host "📂 当前仓库: $($this.CurrentRepoName)" -ForegroundColor White
        Write-Host "🔒 私有备份仓库: $($this.PrivateRepoName)" -ForegroundColor White
        Write-Host ""
        
        # 1. 创建私有仓库
        $repoCreated = $this.CreatePrivateRepo()
        if (-not $repoCreated) {
            return $false
        }
        
        # 2. 配置远程连接
        $remoteConfig = $this.ConfigureRemote()
        if ($null -eq $remoteConfig) {
            return $false
        }
        
        # 3. 验证访问权限
        $accessVerified = $this.VerifyAccess()
        if (-not $accessVerified) {
            return $false
        }
        
        # 4. 保存配置
        $this.SaveConfig($remoteConfig)
        
        Write-Host ""
        Write-Host "🎉 私有备份仓库设置完成!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 下一步操作:" -ForegroundColor Cyan
        Write-Host "1. 查看 .github/BACKUP_TOKEN_SETUP.md 配置访问令牌" -ForegroundColor White
        Write-Host "2. 在仓库 Settings > Secrets 中添加必要的 secrets" -ForegroundColor White
        Write-Host "3. 测试运行备份工作流程" -ForegroundColor White
        Write-Host ""
        Write-Host "💡 提示: 运行 npm run backup:test 测试备份功能" -ForegroundColor Yellow
        
        return $true
    }
    
    # 显示当前配置状态
    [void] ShowStatus() {
        Write-Host "📊 私有备份仓库状态:" -ForegroundColor Cyan
        Write-Host ""
        
        # 检查配置文件
        if (Test-Path $this.ConfigPath) {
            $config = Get-Content $this.ConfigPath | ConvertFrom-Json
            Write-Host "✅ 配置文件存在" -ForegroundColor Green
            Write-Host "   📂 私有仓库: $($config.privateRepoName)" -ForegroundColor White
            Write-Host "   🔗 远程URL: $($config.remoteUrl)" -ForegroundColor White
            Write-Host "   👤 用户名: $($config.username)" -ForegroundColor White
            Write-Host "   📅 创建时间: $([DateTime]::Parse($config.createdAt).ToString())" -ForegroundColor White
        }
        else {
            Write-Host "❌ 配置文件不存在" -ForegroundColor Red
        }
        
        # 检查远程仓库
        try {
            $remoteUrl = git remote get-url backup 2>$null
            Write-Host "✅ backup 远程已配置" -ForegroundColor Green
            Write-Host "   🔗 URL: $remoteUrl" -ForegroundColor White
        }
        catch {
            Write-Host "❌ backup 远程未配置" -ForegroundColor Red
        }
        
        # 检查GitHub CLI
        if ($this.CheckGitHubCLI()) {
            Write-Host "✅ GitHub CLI 已安装" -ForegroundColor Green
            if ($this.CheckGitHubAuth()) {
                Write-Host "✅ GitHub CLI 已认证" -ForegroundColor Green
            }
            else {
                Write-Host "❌ GitHub CLI 未认证" -ForegroundColor Red
            }
        }
        else {
            Write-Host "❌ GitHub CLI 未安装" -ForegroundColor Red
        }
    }
}

# 显示帮助信息
function Show-Help {
    Write-Host @"
使用方法: .\tools\setup-private-backup.ps1 [选项]

选项:
  -Status     显示当前配置状态
  -Help       显示此帮助信息

示例:
  .\tools\setup-private-backup.ps1          # 执行完整设置
  .\tools\setup-private-backup.ps1 -Status  # 查看状态
"@ -ForegroundColor White
}

# 主程序
if ($Help) {
    Show-Help
    exit 0
}

$setup = [PrivateBackupSetup]::new()

if ($Status) {
    $setup.ShowStatus()
}
else {
    $success = $setup.Setup()
    exit ($success ? 0 : 1)
}