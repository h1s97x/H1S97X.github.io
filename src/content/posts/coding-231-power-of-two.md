---
title: 231. 2 的幂
tags: [入门, 数学]
description: "判断一个整数是否为 2 的幂"
leetcode: 231
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个整数 `n`，请你判断该整数是否是 2 的幂次方。如果是，返回 `true`；否则，返回 `false`。

如果存在一个整数 `x` 使得 `n == 2ˣ`，则认为 `n` 是 2 的幂次方。

<https://leetcode.cn/problems/power-of-two/description/>

**示例 1：**

> 输入：n = 1
> 输出：true
> 解释：2⁰ = 1

**示例 2：**

> 输入：n = 16
> 输出：true
> 解释：2⁴ = 16

**示例 3：**

> 输入：n = 3
> 输出：false

**约束：**

- `-2³¹ <= n <= 2³¹ - 1`

## 思路

2 的幂在二进制表示中只有一个 1。利用 `n & (n - 1)` 可以清除最低位的 1，如果结果为 0 说明只有一个 1。

注意 `n <= 0` 的情况，2 的幂一定是正数。

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0
```

```python
import unittest


class TestIsPowerOfTwo(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_one(self):
        self.assertTrue(self.solution.isPowerOfTwo(1))

    def test_sixteen(self):
        self.assertTrue(self.solution.isPowerOfTwo(16))

    def test_not_power(self):
        self.assertFalse(self.solution.isPowerOfTwo(3))

    def test_zero(self):
        self.assertFalse(self.solution.isPowerOfTwo(0))

    def test_negative(self):
        self.assertFalse(self.solution.isPowerOfTwo(-16))


if __name__ == '__main__':
    unittest.main()
```