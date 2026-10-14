---
title: 326. 3 的幂
tags: [入门, 数学]
description: "判断一个整数是否为 3 的幂"
leetcode: 326
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 `true`；否则，返回 `false`。

如果存在一个整数 `x` 使得 `n == 3ˣ`，则认为 `n` 是 3 的幂次方。

<https://leetcode.cn/problems/power-of-three/description/>

**示例 1：**

> 输入：n = 27
> 输出：true

**示例 2：**

> 输入：n = 0
> 输出：false

**示例 3：**

> 输入：n = 9
> 输出：true

**约束：**

- `-2³¹ <= n <= 2³¹ - 1`

## 思路

循环除以 3，直到不能整除为止，最后判断是否等于 1。

```python
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        if n <= 0:
            return False
        while n % 3 == 0:
            n //= 3
        return n == 1
```

```python
import unittest


class TestIsPowerOfThree(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_twentyseven(self):
        self.assertTrue(self.solution.isPowerOfThree(27))

    def test_nine(self):
        self.assertTrue(self.solution.isPowerOfThree(9))

    def test_zero(self):
        self.assertFalse(self.solution.isPowerOfThree(0))

    def test_not_power(self):
        self.assertFalse(self.solution.isPowerOfThree(45))

    def test_negative(self):
        self.assertFalse(self.solution.isPowerOfThree(-3))


if __name__ == '__main__':
    unittest.main()
```