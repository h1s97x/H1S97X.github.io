# PowerShell脚本：批量更新所有文章页面的样式引用
# 使用方法：在PowerShell中运行 .\update-all-posts.ps1

Write-Host "🚀 开始批量更新文章页面样式..." -ForegroundColor Green

# 查找所有文章的index.html文件
$articleFiles = Get-ChildItem -Path "2023" -Recurse -Name "index.html" -File

$updatedCount = 0
$errorCount = 0

foreach ($file in $articleFiles) {
    $fullPath = "2023\$file"
    Write-Host "处理文件: $fullPath" -ForegroundColor Yellow
    
    try {
        # 读取文件内容
        $content = Get-Content -Path $fullPath -Raw -Encoding UTF8
        
        # 检查是否已经包含theme-improvements.css
        if ($content -notmatch "theme-improvements\.css") {
            # 替换CSS引用
            $content = $content -replace '(<link rel="stylesheet" href="/css/site\.css">)', '$1`n<link rel="stylesheet" href="/css/theme-improvements.css">'
            
            # 替换字体引用
            $content = $content -replace '(href="https://fonts\.googleapis\.com/css2\?family=Source\+Code\+Pro)(&display=swap")', '$1:wght@400;500;600&family=Inter:wght@300;400;500;600;700$2'
            
            # 写回文件
            $content | Set-Content -Path $fullPath -Encoding UTF8
            
            Write-Host "✅ 已更新: $fullPath" -ForegroundColor Green
            $updatedCount++
        } else {
            Write-Host "⏭️  已是最新: $fullPath" -ForegroundColor Cyan
        }
    }
    catch {
        Write-Host "❌ 更新失败: $fullPath - $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n📊 更新完成统计:" -ForegroundColor Magenta
Write-Host "✅ 成功更新: $updatedCount 个文件" -ForegroundColor Green
Write-Host "⏭️  无需更新: $($articleFiles.Count - $updatedCount - $errorCount) 个文件" -ForegroundColor Cyan
Write-Host "❌ 更新失败: $errorCount 个文件" -ForegroundColor Red

if ($updatedCount -gt 0) {
    Write-Host "`n🎉 批量更新完成！你的博客文章现在都使用了新的主题样式。" -ForegroundColor Green
    Write-Host "💡 建议：清除浏览器缓存后查看效果。" -ForegroundColor Yellow
} else {
    Write-Host "`n✨ 所有文章都已是最新状态！" -ForegroundColor Green
}

Write-Host "`n按任意键退出..." -ForegroundColor Gray
Read-Host "按Enter键继续"