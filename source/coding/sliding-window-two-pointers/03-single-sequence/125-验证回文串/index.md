---
title: 125. 验证回文串
notebook: coding
tags: [双指针]
leetcode: 125
studyplan: 滑动窗口与双指针
---

# 125. 验证回文串

## 题目描述

> 题目链接: [LeetCode 125](https://leetcode.cn/problems/验证回文串/)

如果在将所有**大写字符转换为小写**并移除所有**非字母数字**字符之后，正着读和反着读都一样的字符串，则它就是一个**回文串**。给定一个字符串 `s`，如果它是回文串，返回 `true`，否则返回 `false`。

**示例：**
```
输入：s = "A man, a plan, a canal: Panama"
输出：true
解释："amanaplanacanalpanama" 是回文串。
```

## 解题思路

### 核心思想
回文串对称比较，天然适合**相向双指针**：左指针指向开头、右指针指向结尾，跳过所有非字母数字字符后，比较两字符是否相等（忽略大小写）。若出现不等则不是回文串。

### 算法步骤
1. `left = 0, right = len(s) - 1`
2. 当 `left < right`：
   - **跳过非字母数字**：左指针右移直到 `s[left].isalnum()`，右指针左移直到 `s[right].isalnum()`
   - 比较 `s[left].lower() == s[right].lower()`，不等则返回 `False`
   - `left += 1, right -= 1`
3. 返回 `True`

### 逐步举例
`s = "A man, a plan, a canal: Panama"`
| 字符（原文） | 处理 | 比较 |
|------|------|------|
| `A` vs `a` | 跳过空格和标点后，忽略大小写 | `a == a` ✅ |
| `m` vs `m` | — | ✅ |
| `a` vs `a` | — | ✅ |
| … | 逐渐逼近中央 | … |
| `P` vs `n` 前 | — | 最终全部对称 ✅ |

返回 `true`。

### 复杂度分析
- 时间复杂度：O(n)，每个字符最多访问一次
- 空间复杂度：O(1)，只用了两个指针

## 代码实现

{% asset_code solution.py %}

{% asset_code solution_test.py %}