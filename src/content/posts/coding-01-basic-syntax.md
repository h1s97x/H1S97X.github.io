---
title: 2235. 两整数相加
tags: [入门, 基础语法]
description: "给定两个整数 num1 和 num2，返回这两个整数的和"
leetcode: 2235
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你两个整数 `num1` 和 `num2`，返回这两个整数的和。

<https://leetcode.cn/problems/add-two-integers/description/>

**示例 1：**

> 输入：num1 = 12, num2 = 5
> 输出：17

**示例 2：**

> 输入：num1 = -10, num2 = 4
> 输出：-6

**约束：**

- `-100 <= num1, num2 <= 100`

## 思路

最基础的加法运算，直接返回 `num1 + num2` 即可。

```python
class Solution:
    def sum(self, num1: int, num2: int) -> int:
        return num1 + num2
```

```python
import unittest


class TestAddTwoIntegers(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_positive(self):
        self.assertEqual(self.solution.sum(12, 5), 17)

    def test_negative(self):
        self.assertEqual(self.solution.sum(-10, 4), -6)

    def test_zero(self):
        self.assertEqual(self.solution.sum(0, 0), 0)


if __name__ == '__main__':
    unittest.main()
```