---
title: 258. 各位相加
tags: [入门, 数学]
description: "反复将数字的各位相加，直到结果为一位数"
leetcode: 258
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给定一个非负整数 `num`，反复将各个位上的数字相加，直到结果为一位数。返回这个结果。

<https://leetcode.cn/problems/add-digits/description/>

**示例 1：**

> 输入：num = 38
> 输出：2
> 解释：3 + 8 = 11, 1 + 1 = 2。

**示例 2：**

> 输入：num = 0
> 输出：0

**约束：**

- `0 <= num <= 2³¹ - 1`

## 思路

### 解法 1：模拟

循环取各位数字之和，直到结果为一位数。

### 解法 2：数学公式（数根）

数根（digital root）公式：`1 + (num - 1) % 9`，当 num 为 0 时结果为 0。

```python
class Solution:
    def addDigits(self, num: int) -> int:
        if num == 0:
            return 0
        return 1 + (num - 1) % 9
```

```python
import unittest


class TestAddDigits(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.addDigits(38), 2)

    def test_zero(self):
        self.assertEqual(self.solution.addDigits(0), 0)

    def test_single(self):
        self.assertEqual(self.solution.addDigits(5), 5)

    def test_large(self):
        self.assertEqual(self.solution.addDigits(999), 9)


if __name__ == '__main__':
    unittest.main()
```