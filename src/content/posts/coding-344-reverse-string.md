---
title: 344. 反转字符串
tags: [双指针, 字符串]
leetcode: 344
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 344. 反转字符串

## 题目描述

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `s` 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

**示例 1：**

```
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

> 题目链接: [LeetCode 344](https://leetcode.cn/problems/reverse-string/)

## 解题思路

### 核心思想

反转字符串本质是**让首尾元素两两对调**：第 1 个与倒数第 1 个交换，第 2 个与倒数第 2 个交换，依此类推。

用两个指针 `left`（指向数组开头）、`right`（指向数组末尾），相向移动：

- 每次交换 `s[left]` 与 `s[right]`；
- 然后 `left` 右移一位、`right` 左移一位；
- 当 `left >= right` 时，说明中间元素（若有）已无需交换，反转完成。

这是经典的**相向双指针**：只用一个临时变量完成交换，不额外开辟数组，满足 O(1) 空间。

### 算法步骤

1. 令 `left = 0`，`right = n - 1`。
2. 循环执行，直到 `left >= right`：
   - 交换 `s[left]` 与 `s[right]`；
   - `left` 加 1，`right` 减 1。
3. 返回 `s`（原地修改，无需返回值）。

### 逐步举例

以 `s = ["h","e","l","l","o"]` 为例：

| 轮次 | left | right | 交换 | 交换后 s |
|------|------|-------|------|----------|
| 1 | 0 | 4 | `s[0]`↔`s[4]` | `["o","e","l","l","h"]` |
| 2 | 1 | 3 | `s[1]`↔`s[3]` | `["o","l","l","e","h"]` |
| 3 | 2 | 2 | 无需交换，退出 | `["o","l","l","e","h"]` |

最终得到 `["o","l","l","e","h"]`，与示例一致。

### 复杂度分析

- 时间复杂度：O(n)，每个元素只被访问一次。
- 空间复杂度：O(1)，仅使用常数个指针变量。

## 代码实现

```python
from typing import List


class Solution:
    def reverseString(self, s: List[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
```

```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_odd_length(self):
        s = ["h", "e", "l", "l", "o"]
        Solution().reverseString(s)
        self.assertEqual(s, ["o", "l", "l", "e", "h"])

    def test_even_length(self):
        s = ["H", "a", "n", "n", "a", "h"]
        Solution().reverseString(s)
        self.assertEqual(s, ["h", "a", "n", "n", "a", "H"])

    def test_single(self):
        s = ["a"]
        Solution().reverseString(s)
        self.assertEqual(s, ["a"])

    def test_two(self):
        s = ["a", "b"]
        Solution().reverseString(s)
        self.assertEqual(s, ["b", "a"])


if __name__ == "__main__":
    unittest.main()
```