# 分支保护规则

本文档说明如何在 GitHub 上配置分支保护规则。

## main 分支保护

1. 进入仓库 Settings → Branches → Branch protection rules
2. 点击 "Add rule"
3. 配置如下：

### 基本设置

| 设置 | 值 |
|------|-----|
| Branch name pattern | `main` |
| ✅ Require a pull request before merging | 启用 |
| ✅ Require approvals | 1 |
| ✅ Dismiss stale approvals | 启用 |
| ✅ Require review from Code Owners | 禁用 |
| ✅ Allow specified actors to bypass PR requirements | 禁用 |

### 状态检查

| 设置 | 值 |
|------|-----|
| ✅ Require status checks to pass before merging | 启用 |
| Required status checks | `ci` |
| ✅ Require branches to be up to date before merging | 禁用 |

### 其他设置

| 设置 | 值 |
|------|-----|
| ✅ Require linear history | 启用 |
| ✅ Allow force pushes | 禁用 |
| ✅ Allow deletions | 禁用 |
| ✅ Lock branch | 禁用 |

## develop 分支保护 (可选)

| 设置 | 值 |
|------|-----|
| Branch name pattern | `develop` |
| ✅ Require a pull request before merging | 启用 |
| ✅ Require approvals | 1 |
| ✅ Require status checks to pass | 启用 |

## 分支命名规范

| 类型 | 格式 | 示例 |
|------|------|------|
| feature | `feature/<ticket>-<描述>` | `feature/123-add-login` |
| fix | `fix/<ticket>-<描述>` | `fix/456-fix-render` |
| hotfix | `hotfix/<ticket>-<描述>` | `hotfix/789-fix-deploy` |
| refactor | `refactor/<描述>` | `refactor/plugins` |
| chore | `chore/<描述>` | `chore/update-deps` |

## 管理员绕过

仓库管理员可以绕过分支保护规则。如需限制，请联系 GitHub 仓库管理员。
