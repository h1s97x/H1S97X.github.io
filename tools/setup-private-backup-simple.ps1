# 私有备份仓库设置脚本 (简化版)
# 用于创建和配置与当前仓库同名的私有GitHub仓库

param(
    [Parameter(Mandatory=$false)]
    [switch]$Status = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$Help = $false
)

# 设置错误处理
$ErrorActionPreference = "Stop"

# 显示帮助信息
function Show-Help {
    Write-Host @"
使用方法: .\tools\setup-private-backup-simple.ps1 [选项]

选项:
  -Status     显示当前配置状态
  -Help       显示此帮助信息

示例:
  .\tools\setup-private-backup-simple.ps1          # 执行完整设置
  .\tools\setup-private-backup-simple.ps1 -Status  # 查看状态
"@ -ForegroundColor White
}

# 获取当前仓库名称
function Get-CurrentRepoName {
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

# 检查GitHub CLI
function Test-GitHubCLI {
    try {
        gh --version | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# 检查GitHub CLI认证
function Test-GitHubAuth {
    try {
        gh auth status 2>$null | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# 显示状态
function Show-Status {
    $currentRepoName = Get-CurrentRepoName
    $privateRepoName = "$currentRepoName-private-backup"
    
    Write-Host "📊 私有备份仓库状态:" -ForegroundColor Cyan
    Write-Host ""
    
    # 检查配置文件
    if (Test-Path ".github/private-backup-config.json") {
        $config = Get-Content ".github/private-backup-config.json" | ConvertFrom-Json
        Write-Host "✅ 配置文件存在" -ForegroundColor Green
        Write-Host "   📂 私有仓库: $($config.privateRepoName)" -ForegroundColor White
        Write-Host "   🔗 远程URL: $($config.remoteUrl)" -ForegroundColor White
        Write-Host "   👤 用户名: $($config.username)" -ForegroundColor White
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
    if (Test-GitHubCLI) {
        Write-Host "✅ GitHub CLI 已安装" -ForegroundColor Green
        if (Test-GitHubAuth) {
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

# 执行设置
function Start-Setup {
    $currentRepoName = Get-CurrentRepoName
    $privateRepoName = "$currentRepoName-private-backup"
    
    Write-Host "🎯 开始设置私有备份仓库..." -ForegroundColor Cyan
    Write-Host "📂 当前仓库: $currentRepoName" -ForegroundColor White
    Write-Host "🔒 私有备份仓库: $privateRepoName" -ForegroundColor White
    Write-Host ""
    
    # 检查GitHub CLI
    if (-not (Test-GitHubCLI)) {
        Write-Host "❌ GitHub CLI 未安装。请先安装 GitHub CLI: https://cli.github.com/" -ForegroundColor Red
        Write-Host "💡 安装后运行: gh auth login" -ForegroundColor Yellow
        return $false
    }
    
    if (-not (Test-GitHubAuth)) {
        Write-Host "❌ GitHub CLI 未认证。请运行: gh auth login" -ForegroundColor Red
        return $false
    }
    
    try {
        # 检查仓库是否已存在
        Write-Host "🔍 检查私有仓库是否存在..." -ForegroundColor Yellow
        try {
            gh repo view $privateRepoName 2>$null | Out-Null
            Write-Host "✅ 私有仓库 $privateRepoName 已存在" -ForegroundColor Green
        }
        catch {
            # 创建私有仓库
            Write-Host "📦 创建私有仓库: $privateRepoName" -ForegroundColor Yellow
            gh repo create $privateRepoName --private --description "Private backup for $currentRepoName"
            Write-Host "✅ 私有备份仓库创建成功" -ForegroundColor Green
        }
        
        # 配置远程连接
        Write-Host "🔗 配置远程仓库连接..." -ForegroundColor Yellow
        $username = (gh api user --jq .login).Trim()
        $remoteUrl = "https://github.com/$username/$privateRepoName.git"
        
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
        
        # 验证访问权限
        Write-Host "🔐 验证仓库访问权限..." -ForegroundColor Yellow
        git ls-remote backup 2>$null | Out-Null
        Write-Host "✅ 仓库访问权限验证成功" -ForegroundColor Green
        
        # 保存配置
        Write-Host "💾 保存配置信息..." -ForegroundColor Yellow
        $configData = @{
            privateRepoName = $privateRepoName
            remoteUrl = $remoteUrl
            username = $username
            createdAt = (Get-Date).ToString("o")
            lastUpdated = (Get-Date).ToString("o")
        }
        
        # 确保 .github 目录存在
        if (-not (Test-Path ".github")) {
            New-Item -ItemType Directory -Path ".github" -Force | Out-Null
        }
        
        $configData | ConvertTo-Json -Depth 10 | Out-File -FilePath ".github/private-backup-config.json" -Encoding UTF8
        Write-Host "✅ 配置已保存" -ForegroundColor Green
        
        # 生成令牌配置说明
        $instructionsContent = @"
# GitHub Access Token Configuration Guide

## Configure Access Token for GitHub Actions

1. **Create Personal Access Token (PAT)**:
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token" > "Generate new token (classic)"
   - Set token name: $privateRepoName-backup-token
   - Select permissions:
     - repo (Full repository access)
     - workflow (Workflow permissions)
   - Click "Generate token" and copy the token

2. **Configure Repository Secrets**:
   - Go to current repository Settings > Secrets and variables > Actions
   - Add the following secrets:
     - BACKUP_REPO_TOKEN: The personal access token you just created
     - BACKUP_REPO_NAME: $username/$privateRepoName

3. **Verify Configuration**:
   - Manually trigger "Daily Repository Backup" workflow
   - Check workflow logs to confirm backup success

## Security Notes

- Never commit access tokens to code repository
- Rotate access tokens regularly (recommended every 90 days)
- Grant only necessary minimum permissions
- Add descriptive names to tokens for management
"@
        
        $instructionsContent | Out-File -FilePath ".github/BACKUP_TOKEN_SETUP.md" -Encoding UTF8
        Write-Host "📋 令牌配置说明已保存" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "🎉 私有备份仓库设置完成!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 下一步操作:" -ForegroundColor Cyan
        Write-Host "1. 查看 .github/BACKUP_TOKEN_SETUP.md 配置访问令牌" -ForegroundColor White
        Write-Host "2. 在仓库 Settings > Secrets 中添加必要的 secrets" -ForegroundColor White
        Write-Host "3. 测试运行备份工作流程" -ForegroundColor White
        Write-Host ""
        Write-Host "💡 提示: 运行 npm run backup:validate 验证配置" -ForegroundColor Yellow
        
        return $true
    }
    catch {
        Write-Host "❌ 设置失败: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# 主程序
if ($Help) {
    Show-Help
    exit 0
}

if ($Status) {
    Show-Status
}
else {
    $success = Start-Setup
    if ($success) {
        exit 0
    } else {
        exit 1
    }
}