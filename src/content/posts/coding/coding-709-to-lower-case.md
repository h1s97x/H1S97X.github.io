---
title: 709. 转换成小写字母
tags: [入门, 位运算]
description: "将字符串中的大写字母转换成小写字母"
leetcode: 709
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个字符串 `s`，将该字符串中的大写字母转换成相同的小写字母，返回新的字符串。

<https://leetcode.cn/problems/to-lower-case/description/>

**示例 1：**

> 输入：s = "Hello"
> 输出："hello"

**示例 2：**

> 输入：s = "here"
> 输出："here"

**示例 3：**

> 输入：s = "LOVELY"
> 输出："lovely"

**约束：**

- `1 <= s.length <= 100`
- `s` 由 ASCII 字符集中的可打印字符组成

## 思路

Python 直接用 `s.lower()`。也可以用位运算：大写字母 `A-Z` 对应 ASCII 65-90，小写字母 `a-z` 对应 97-122，相差 32。大写字母按位或 `0x20`（即 `| 32`）即可转为小写。

```python
class Solution:
    def toLowerCase(self, s: str) -> str:
        return ''.join(chr(ord(c) | 32) if 'A' <= c <= 'Z' else c for c in s)
```

```python
import unittest


class TestToLowerCase(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_mixed(self):
        self.assertEqual(self.solution.toLowerCase("Hello"), "hello")

    def test_lower(self):
        self.assertEqual(self.solution.toLowerCase("here"), "here")

    def test_upper(self):
        self.assertEqual(self.solution.toLowerCase("LOVELY"), "lovely")

    def test_non_alpha(self):
        self.assertEqual(self.solution.toLowerCase("123!@#"), "123!@#")


if __name__ == '__main__':
    unittest.main()
```