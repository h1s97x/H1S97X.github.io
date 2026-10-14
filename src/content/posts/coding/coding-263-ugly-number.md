---
title: 263. 丑数
tags: [入门, 数学]
description: "判断一个整数是否为只包含质因数 2、3 和 5 的丑数"
leetcode: 263
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

**丑数** 就是只包含质因数 `2`、`3` 和 `5` 的正整数。

给你一个整数 `n`，请你判断 `n` 是否为 **丑数**。如果是，返回 `true`；否则，返回 `false`。

<https://leetcode.cn/problems/ugly-number/description/>

**示例 1：**

> 输入：n = 6
> 输出：true
> 解释：6 = 2 × 3

**示例 2：**

> 输入：n = 1
> 输出：true
> 解释：1 通常被视为丑数。

**示例 3：**

> 输入：n = 14
> 输出：false
> 解释：14 不是丑数，因为它包含了质因数 7。

**约束：**

- `-2³¹ <= n <= 2³¹ - 1`

## 思路

反复除以 2、3、5，直到不能整除为止。最后判断剩余是否为 1。注意 `n <= 0` 不是丑数。

```python
class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0:
            return False
        for p in (2, 3, 5):
            while n % p == 0:
                n //= p
        return n == 1
```

```python
import unittest


class TestIsUgly(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_six(self):
        self.assertTrue(self.solution.isUgly(6))

    def test_one(self):
        self.assertTrue(self.solution.isUgly(1))

    def test_fourteen(self):
        self.assertFalse(self.solution.isUgly(14))

    def test_zero(self):
        self.assertFalse(self.solution.isUgly(0))

    def test_negative(self):
        self.assertFalse(self.solution.isUgly(-6))


if __name__ == '__main__':
    unittest.main()
```