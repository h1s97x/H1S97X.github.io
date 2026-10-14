---
title: 392. 判断子序列
tags: [双指针, 字符串, 动态规划]
leetcode: 392
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 392. 判断子序列

## 题目描述

给定字符串 **s** 和 **t**，判断 **s** 是否为 **t** 的子序列。

字符串的一个**子序列**是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，`"ace"` 是 `"abcde"` 的一个子序列，而 `"aec"` 不是）。

如果一个字符串是另一个字符串的子序列，则它们将相等，即返回 `true`；否则返回 `false`。

**进阶：** 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10 亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

**示例 1：**
```
输入：s = "abc", t = "ahbgdc"
输出：true
```

**示例 2：**
```
输入：s = "axc", t = "ahbgdc"
输出：false
```

**提示：**
- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- 两个字符串都只由小写字符组成。

## 解题思路

### 核心思想

用**双指针**从左到右同步扫描两个字符串。指针 `i` 指向 `s`，指针 `j` 指向 `t`：

- 只要 `s[i] == t[j]`，说明在 `t` 中匹配到了 `s` 的当前字符，`i` 前进；
- 无论是否匹配成功，`j` 都前进，因为 `t` 的每个字符只能被使用一次。

循环结束时，若 `i` 走到了 `s` 的末尾（`i == len(s)`），说明 `s` 中的每个字符都按顺序在 `t` 中出现了，即 `s` 是 `t` 的子序列。

**匹配过程示意（s = "abc", t = "ahbgdc"）：**

```
t:   a  h  b  g  d  c
     ↑  ↑  ↑  ↑  ↑  ↑
匹配: a      b     |  c
s:   a  b     c
            最终 i=3 走完 s → true
```

### 算法步骤

1. 初始化双指针 `i = 0, j = 0`。
2. 当 `i < len(s)` 且 `j < len(t)` 时循环：
   - 若 `s[i] == t[j]`，`i += 1`（`s` 中这个字符已匹配）；
   - `j += 1`（无论是否匹配，`t` 的当前字符都用过了）。
3. 返回 `i == len(s)`。

### 逐步举例

以 `s = "axc", t = "ahbgdc"` 为例：

| 步骤 | i | j | s[i] | t[j] | 是否相等 | 操作 |
| ---- | - | - | ---- | ---- | -------- | ---- |
| 1 | 0 | 0 | a | a | ✅ | i=1, j=1 |
| 2 | 1 | 1 | x | h | ❌ | j=2 |
| 3 | 1 | 2 | x | b | ❌ | j=3 |
| 4 | 1 | 3 | x | g | ❌ | j=4 |
| 5 | 1 | 4 | x | d | ❌ | j=5 |
| 6 | 1 | 5 | x | c | ❌ | j=6 结束 |

最终 `i=1 != len(s)=3`，返回 `false`。`x` 在 `t` 中出现之前没有匹配位置，故失败。

### 复杂度分析

- **时间复杂度**：O(N + M)，其中 N、M 分别为 `s` 和 `t` 的长度。每个字符最多被扫描常数次。
- **空间复杂度**：O(1)，仅使用两个指针常量空间。

## 代码实现

{{% highlight python %}}
```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = j = 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)
```
```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_true(self):
        self.assertTrue(Solution().isSubsequence("abc", "ahbgdc"))

    def test_false(self):
        self.assertFalse(Solution().isSubsequence("axc", "ahbgdc"))

    def test_empty_s(self):
        self.assertTrue(Solution().isSubsequence("", "ahbgdc"))


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
