---
title: 1470. 重新排列数组
tags: [入门, 数组]
description: "按 [x1,y1,x2,y2,...,xn,yn] 顺序重排数组"
leetcode: 1470
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个数组 `nums`，数组中有 `2n` 个元素，按 `[x1,x2,...,xn,y1,y2,...,yn]` 的格式排列。

请你将数组按 `[x1,y1,x2,y2,...,xn,yn]` 格式重新排列，返回重排后的数组。

<https://leetcode.cn/problems/shuffle-the-array/description/>

**示例 1：**

> 输入：nums = [2,5,1,3,4,7], n = 3
> 输出：[2,3,5,4,1,7]
> 解释：由于 x1=2, x2=5, x3=1, y1=3, y2=4, y3=7，所以答案为 [2,3,5,4,1,7]

**示例 2：**

> 输入：nums = [1,2,3,4,4,3,2,1], n = 4
> 输出：[1,4,2,3,3,2,4,1]

**约束：**

- `1 <= n <= 500`
- `nums.length == 2n`
- `1 <= nums[i] <= 10³`

## 思路

遍历 `i` 从 0 到 n-1，依次取 `nums[i]` 和 `nums[i + n]`。

```python
class Solution:
    def shuffle(self, nums: list[int], n: int) -> list[int]:
        result = []
        for i in range(n):
            result.append(nums[i])
            result.append(nums[i + n])
        return result
```

```python
import unittest


class TestShuffle(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.shuffle([2, 5, 1, 3, 4, 7], 3), [2, 3, 5, 4, 1, 7])

    def test_example2(self):
        self.assertEqual(self.solution.shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4), [1, 4, 2, 3, 3, 2, 4, 1])

    def test_single(self):
        self.assertEqual(self.solution.shuffle([1, 2], 1), [1, 2])


if __name__ == '__main__':
    unittest.main()
```