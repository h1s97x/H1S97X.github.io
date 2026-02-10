# Hexo博客仓库备份脚本
# 使用方法: .\tools\backup-repository.ps1 -BackupPath "D:\Backups\HexoBlog"

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupPath,
    
    [Parameter(Mandatory=$false)]
    [switch]$IncludeNodeModules = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$CreateBundle = $true,
    
    [Parameter(Mandatory=$false)]
    [int]$KeepDays = 30
)

# 设置错误处理
$ErrorActionPreference = "Stop"

# 获取当前日期
$Date = Get-Date -Format "yyyyMMdd"
$DateTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# 创建备份目录
$BackupDir = Join-Path $BackupPath $Date
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Write-Host "✅ 创建备份目录: $BackupDir" -ForegroundColor Green
}

Write-Host "🚀 开始备份 Hexo 博客仓库..." -ForegroundColor Cyan
Write-Host "📅 备份时间: $DateTime" -ForegroundColor Yellow

try {
    # 1. 创建 Git Bundle 备份
    if ($CreateBundle) {
        Write-Host "📦 创建 Git Bundle 备份..." -ForegroundColor Yellow
        $BundlePath = Join-Path $BackupDir "hexo-blog-$Date.bundle"
        
        git bundle create $BundlePath --all
        
        if ($LASTEXITCODE -eq 0) {
            $BundleSize = (Get-Item $BundlePath).Length / 1MB
            Write-Host "✅ Git Bundle 创建成功: $([math]::Round($BundleSize, 2)) MB" -ForegroundColor Green
        } else {
            throw "Git Bundle 创建失败"
        }
    }

    # 2. 创建项目文件备份
    Write-Host "📁 创建项目文件备份..." -ForegroundColor Yellow
    
    $ExcludePatterns = @(
        ".git",
        "node_modules",
        "public",
        ".deploy_git",
        "*.log",
        ".DS_Store",
        "Thumbs.db"
    )
    
    if (-not $IncludeNodeModules) {
        $ExcludePatterns += "node_modules"
    }
    
    # 创建排除文件列表
    $ExcludeFile = Join-Path $env:TEMP "backup-exclude.txt"
    $ExcludePatterns | Out-File -FilePath $ExcludeFile -Encoding UTF8
    
    # 使用 7zip 或 PowerShell 压缩
    $ArchivePath = Join-Path $BackupDir "hexo-blog-files-$Date.zip"
    
    if (Get-Command "7z" -ErrorAction SilentlyContinue) {
        # 使用 7zip
        & 7z a -tzip $ArchivePath . -x@$ExcludeFile
    } else {
        # 使用 PowerShell 压缩
        $TempDir = Join-Path $env:TEMP "hexo-backup-temp"
        if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
        New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
        
        # 复制文件（排除指定模式）
        Get-ChildItem -Path . -Recurse | Where-Object {
            $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 1)
            $shouldExclude = $false
            foreach ($pattern in $ExcludePatterns) {
                if ($relativePath -like "*$pattern*") {
                    $shouldExclude = $true
                    break
                }
            }
            -not $shouldExclude
        } | ForEach-Object {
            $destPath = Join-Path $TempDir $_.FullName.Substring((Get-Location).Path.Length + 1)
            $destDir = Split-Path $destPath -Parent
            if (-not (Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }
            if (-not $_.PSIsContainer) {
                Copy-Item $_.FullName $destPath
            }
        }
        
        Compress-Archive -Path "$TempDir\*" -DestinationPath $ArchivePath -Force
        Remove-Item $TempDir -Recurse -Force
    }
    
    Remove-Item $ExcludeFile -Force
    
    if (Test-Path $ArchivePath) {
        $ArchiveSize = (Get-Item $ArchivePath).Length / 1MB
        Write-Host "✅ 项目文件备份成功: $([math]::Round($ArchiveSize, 2)) MB" -ForegroundColor Green
    }

    # 3. 创建备份信息文件
    Write-Host "📋 创建备份信息..." -ForegroundColor Yellow
    
    $InfoPath = Join-Path $BackupDir "backup-info-$Date.md"
    $GitInfo = @"
# Hexo 博客备份信息

## 备份详情
- **备份时间**: $DateTime
- **备份路径**: $BackupDir
- **Git Bundle**: $(if($CreateBundle){"✅ 已创建"}else{"❌ 跳过"})
- **项目文件**: ✅ 已创建

## Git 仓库信息
- **当前分支**: $(git branch --show-current)
- **最新提交**: $(git rev-parse HEAD)
- **提交总数**: $(git rev-list --all --count)
- **远程仓库**: $(git remote get-url origin)

## 最近提交记录
``````
$(git log --oneline -10)
``````

## 文件统计
- **总文件数**: $((Get-ChildItem -Recurse -File | Measure-Object).Count)
- **源文件**: $((Get-ChildItem source -Recurse -File | Measure-Object).Count)
- **主题文件**: $((Get-ChildItem themes -Recurse -File | Measure-Object).Count)

## 备份文件
$(Get-ChildItem $BackupDir | ForEach-Object { "- $($_.Name) ($([math]::Round($_.Length / 1MB, 2)) MB)" })
"@
    
    $GitInfo | Out-File -FilePath $InfoPath -Encoding UTF8
    Write-Host "✅ 备份信息已保存" -ForegroundColor Green

    # 4. 清理旧备份
    if ($KeepDays -gt 0) {
        Write-Host "🧹 清理 $KeepDays 天前的旧备份..." -ForegroundColor Yellow
        
        $CutoffDate = (Get-Date).AddDays(-$KeepDays)
        $OldBackups = Get-ChildItem $BackupPath -Directory | Where-Object { 
            $_.CreationTime -lt $CutoffDate -and $_.Name -match '^\d{8}$'
        }
        
        foreach ($oldBackup in $OldBackups) {
            Remove-Item $oldBackup.FullName -Recurse -Force
            Write-Host "🗑️  删除旧备份: $($oldBackup.Name)" -ForegroundColor Gray
        }
        
        if ($OldBackups.Count -eq 0) {
            Write-Host "✅ 没有需要清理的旧备份" -ForegroundColor Green
        } else {
            Write-Host "✅ 已清理 $($OldBackups.Count) 个旧备份" -ForegroundColor Green
        }
    }

    # 5. 显示备份摘要
    Write-Host "`n🎉 备份完成!" -ForegroundColor Green
    Write-Host "📊 备份摘要:" -ForegroundColor Cyan
    Write-Host "   📂 备份目录: $BackupDir" -ForegroundColor White
    
    $TotalSize = (Get-ChildItem $BackupDir | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "   📦 总大小: $([math]::Round($TotalSize, 2)) MB" -ForegroundColor White
    Write-Host "   📁 文件数量: $((Get-ChildItem $BackupDir).Count)" -ForegroundColor White
    
    # 创建最新备份链接
    $LatestPath = Join-Path $BackupPath "latest"
    if (Test-Path $LatestPath) { Remove-Item $LatestPath -Force }
    New-Item -ItemType SymbolicLink -Path $LatestPath -Target $BackupDir -Force | Out-Null
    Write-Host "   🔗 最新备份链接: $LatestPath" -ForegroundColor White

} catch {
    Write-Host "❌ 备份失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`n💡 提示: 可以设置 Windows 任务计划程序来自动运行此脚本" -ForegroundColor Yellow
Write-Host "   示例: schtasks /create /tn `"Hexo备份`" /tr `"powershell.exe -File '$($MyInvocation.MyCommand.Path)' -BackupPath '$BackupPath'`" /sc daily /st 02:00" -ForegroundColor Gray