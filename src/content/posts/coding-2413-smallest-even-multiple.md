---
title: 2413. 最小偶倍数
tags: [入门, 条件判断]
description: "给你一个正整数 n，返回 2 和 n 的最小公倍数"
leetcode: 2413
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个正整数 `n` ，返回 `2` 和 `n` 的最小公倍数（正整数）。

<https://leetcode.cn/problems/smallest-even-multiple/description/>

**示例 1：**

> 输入：n = 5
> 输出：10
> 解释：5 和 2 的最小公倍数是 10。

**示例 2：**

> 输入：n = 6
> 输出：6
> 解释：6 和 2 的最小公倍数是 6。注意数字会是它自身的倍数。

**约束：**

- `1 <= n <= 150`

## 思路

2 和 n 的最小公倍数：如果 n 是偶数，最小公倍数就是 n 本身；否则是 2 * n。

```python
class Solution:
    def smallestEvenMultiple(self, n: int) -> int:
        return n if n % 2 == 0 else n * 2
```

```python
import unittest


class TestSmallestEvenMultiple(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_odd(self):
        self.assertEqual(self.solution.smallestEvenMultiple(5), 10)

    def test_even(self):
        self.assertEqual(self.solution.smallestEvenMultiple(6), 6)

    def test_one(self):
        self.assertEqual(self.solution.smallestEvenMultiple(1), 2)

    def test_two(self):
        self.assertEqual(self.solution.smallestEvenMultiple(2), 2)


if __name__ == '__main__':
    unittest.main()
```