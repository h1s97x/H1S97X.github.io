---
title: Git Help
notebook: notes
tags:
  - it/git
mermaid: true
date: 2025-12-28 15:21:24
updated: 2025-12-28 15:59:47
---
我来为您整理一份全面的 Git 指令集，涵盖从基础到高级的各种操作场景。

---

## 🚀 Git 指令集大全

### 一、基础配置

```bash
# 配置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
git config user.name

# 设置默认编辑器
git config --global core.editor "vim"

# 设置别名（快捷命令）
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

---

### 二、仓库操作

```bash
# 初始化新仓库
git init

# 克隆远程仓库
git clone <repository-url>
git clone <repository-url> <directory-name>  # 指定目录名

# 查看远程仓库地址
git remote -v

# 添加远程仓库
git remote add origin <repository-url>

# 修改远程仓库地址
git remote set-url origin <new-url>
```

---

### 三、基本工作流程

```bash
# 查看仓库状态
git status

# 添加文件到暂存区
git add <file-name>           # 添加指定文件
git add .                     # 添加所有修改
git add -A                    # 添加所有变化（包括删除）

# 提交更改
git commit -m "提交信息"
git commit -am "提交信息"     # 跳过 add，直接提交已跟踪文件

# 查看提交历史
git log
git log --oneline             # 简洁模式
git log --graph --oneline     # 图形化显示分支
git log -n 5                  # 最近5条
```

---

### 四、分支管理

```bash
# 查看分支
git branch                    # 本地分支
git branch -a                 # 所有分支（含远程）
git branch -r                 # 仅远程分支

# 创建分支
git branch <branch-name>      # 创建新分支
git checkout -b <branch-name> # 创建并切换
git switch -c <branch-name>   # 新方式（Git 2.23+）

# 切换分支
git checkout <branch-name>
git switch <branch-name>      # 新方式

# 合并分支
git merge <branch-name>       # 合并指定分支到当前分支

# 删除分支
git branch -d <branch-name>   # 删除已合并分支
git branch -D <branch-name>   # 强制删除

# 重命名分支
git branch -m <old-name> <new-name>
```

---

### 五、远程同步

```bash
# 拉取代码
git pull origin <branch>
git pull --rebase origin <branch>  # 使用 rebase 方式

# 推送代码
git push origin <branch>
git push -u origin <branch>        # 首次推送并关联
git push origin --delete <branch>  # 删除远程分支

# 获取远程更新（不合并）
git fetch origin

# 同步远程分支列表
git remote prune origin
```

---

### 六、撤销与回退

```bash
# 撤销工作区修改
git checkout -- <file>        # 丢弃文件修改
git restore <file>            # 新方式（Git 2.23+）

# 撤销暂存区
git reset HEAD <file>         # 取消暂存
git restore --staged <file>   # 新方式

# 版本回退
git reset --soft HEAD~1       # 回退到上一版本，保留修改到暂存区
git reset --mixed HEAD~1      # 回退到上一版本，保留修改到工作区（默认）
git reset --hard HEAD~1       # 彻底回退，丢弃修改

# 查看所有操作记录（用于找回）
git reflog
```

---

### 七、储藏（Stash）

```bash
# 临时保存修改
git stash
git stash save "描述信息"

# 查看储藏列表
git stash list

# 恢复储藏
git stash pop                 # 恢复并删除
git stash apply               # 恢复不删除
git stash apply stash@{0}     # 恢复指定

# 删除储藏
git stash drop stash@{0}      # 删除指定
git stash clear               # 清空所有
```

---

### 八、标签管理

```bash
# 创建标签
git tag <tag-name>            # 轻量标签
git tag -a <tag-name> -m "描述"  # 附注标签
git tag <tag-name> <commit-id>   # 给指定提交打标签

# 推送标签到远程
git push origin <tag-name>
git push origin --tags        # 推送所有标签

# 删除标签
git tag -d <tag-name>
git push origin :refs/tags/<tag-name>  # 删除远程标签
```

---

### 九、高级操作

```bash
# 变基（Rebase）
git rebase <branch>           # 将当前分支变基到指定分支
git rebase -i HEAD~3          # 交互式变基最近3个提交

# 拣选提交
git cherry-pick <commit-id>   # 将指定提交应用到当前分支

# 二分查找（定位问题提交）
git bisect start
git bisect bad
git bisect good <commit-id>

# 查看文件修改历史
git blame <file>

# 查看某行代码最后修改者
git blame -L 10,20 <file>
```

---

### 十、常用组合场景

| 场景 | 命令组合 |
|------|----------|
| 日常提交 | `git add .` → `git commit -m "msg"` → `git push` |
| 拉取最新代码 | `git pull origin main` |
| 创建功能分支 | `git checkout -b feature/xxx` → 开发 → `git push -u origin feature/xxx` |
| 合并功能分支 | `git checkout main` → `git pull` → `git merge feature/xxx` → `git push` |
| 临时保存工作 | `git stash` → 切换分支处理 → `git checkout -` → `git stash pop` |
| 撤销错误提交 | `git reset --soft HEAD~1` → 修改后重新提交 |

---

### 十一、.gitignore 模板

```gitignore
# 依赖
node_modules/
vendor/

# 编译输出
dist/
build/
*.exe
*.dll

# IDE
.idea/
.vscode/
*.iml

# 日志与临时文件
*.log
*.tmp
.DS_Store

# 敏感信息
.env
config.local.php
```

---

### 十二、实用技巧

```bash
# 查看某文件的修改历史
git log -p <file>

# 查看两个分支差异
git diff branch1 branch2

# 查看工作区与暂存区差异
git diff

# 查看暂存区与最新提交差异
git diff --cached

# 只查看文件名
git diff --name-only

# 统计提交贡献
git shortlog -sn

# 生成补丁文件
git format-patch HEAD~3

# 应用补丁
git apply patch-file
```

---

如需了解某个指令的详细用法，可以使用 `git <command> --help` 查看官方文档。