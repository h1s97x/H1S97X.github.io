---
title: 1281. 整数的各位积和之差
tags: [入门, 数学]
description: "计算整数各位数字的乘积与和的差"
leetcode: 1281
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个整数 `n`，请你帮忙计算并返回该整数「各位数字之积」与「各位数字之和」的差。

<https://leetcode.cn/problems/subtract-the-product-and-sum-of-digits-of-an-integer/description/>

**示例 1：**

> 输入：n = 234
> 输出：15
> 解释：各位数之积 = 2 * 3 * 4 = 24，各位数之和 = 2 + 3 + 4 = 9，24 - 9 = 15

**示例 2：**

> 输入：n = 4421
> 输出：21
> 解释：各位数之积 = 4 * 4 * 2 * 1 = 32，各位数之和 = 4 + 4 + 2 + 1 = 11，32 - 11 = 21

**约束：**

- `1 <= n <= 10⁵`

## 思路

循环取模 `n % 10` 得到最后一位，累加/累乘后 `n //= 10` 去掉最后一位。

```python
class Solution:
    def subtractProductAndSum(self, n: int) -> int:
        product = 1
        total = 0
        while n:
            digit = n % 10
            product *= digit
            total += digit
            n //= 10
        return product - total
```

```python
import unittest


class TestSubtractProductAndSum(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.subtractProductAndSum(234), 15)

    def test_example2(self):
        self.assertEqual(self.solution.subtractProductAndSum(4421), 21)

    def test_single(self):
        self.assertEqual(self.solution.subtractProductAndSum(5), 0)

    def test_all_ones(self):
        self.assertEqual(self.solution.subtractProductAndSum(111), -1)


if __name__ == '__main__':
    unittest.main()
```