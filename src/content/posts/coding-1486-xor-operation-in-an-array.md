---
title: 1486. 数组异或操作
tags: [入门, 循环]
description: "从 0 开始，对每个 i 计算 nums[i] = start + 2 * i，返回所有元素的异或结果"
leetcode: 1486
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你两个整数 `n` 和 `start`。

数组 `nums` 定义为：`nums[i] = start + 2 * i`（下标从 0 开始），长度为 `n`。

请返回 `nums` 中所有元素按位异或（XOR）后得到的结果。

<https://leetcode.cn/problems/xor-operation-in-an-array/description/>

**示例 1：**

> 输入：n = 5, start = 0
> 输出：8
> 解释：nums = [0, 2, 4, 6, 8]，0 ^ 2 ^ 4 ^ 6 ^ 8 = 8

**示例 2：**

> 输入：n = 4, start = 3
> 输出：8
> 解释：nums = [3, 5, 7, 9]，3 ^ 5 ^ 7 ^ 9 = 8

**约束：**

- `1 <= n <= 1000`
- `0 <= start <= 1000`

## 思路

循环生成每个元素并累加异或即可。也可以用数学公式优化，但 n 很小，直接循环最清晰。

```python
class Solution:
    def xorOperation(self, n: int, start: int) -> int:
        result = 0
        for i in range(n):
            result ^= start + 2 * i
        return result
```

```python
import unittest


class TestXorOperation(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.xorOperation(5, 0), 8)

    def test_example2(self):
        self.assertEqual(self.solution.xorOperation(4, 3), 8)

    def test_single(self):
        self.assertEqual(self.solution.xorOperation(1, 7), 7)

    def test_large(self):
        self.assertEqual(self.solution.xorOperation(10, 5), 2)


if __name__ == '__main__':
    unittest.main()
```