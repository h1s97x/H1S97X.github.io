---
title: 852. 山脉数组的峰顶索引
tags: [入门, 数组, 二分查找]
description: "在山脉数组中找出峰顶元素的索引"
leetcode: 852
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

符合下列属性的数组 `arr` 称为 **山脉数组**：

- `arr.length >= 3`
- 存在下标 `i`（`0 < i < arr.length - 1`），使得：
  - `arr[0] < arr[1] < ... < arr[i]`
  - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

给你由整数组成的山脉数组 `arr`，返回任何满足 `arr[0] < arr[1] < ... < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]` 的下标 `i`。

<https://leetcode.cn/problems/peak-index-in-a-mountain-array/description/>

**示例 1：**

> 输入：arr = [0,1,0]
> 输出：1

**示例 2：**

> 输入：arr = [0,2,1,0]
> 输出：1

**示例 3：**

> 输入：arr = [24,69,100,99,79,78,67,36,26,19]
> 输出：2

**约束：**

- `3 <= arr.length <= 10⁵`
- `0 <= arr[i] <= 10⁶`
- 题目数据保证 `arr` 是一个山脉数组

## 思路

### 解法 1：线性扫描

遍历直到找到 `arr[i] > arr[i + 1]` 的位置。

### 解法 2：二分查找

山脉数组的峰顶就是「第一个下降点」，可以用二分查找在 `O(log n)` 时间内找到。

```python
class Solution:
    def peakIndexInMountainArray(self, arr: list[int]) -> int:
        left, right = 0, len(arr) - 1
        while left < right:
            mid = (left + right) // 2
            if arr[mid] < arr[mid + 1]:
                left = mid + 1
            else:
                right = mid
        return left
```

```python
import unittest


class TestPeakIndexInMountainArray(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([0, 1, 0]), 1)

    def test_example2(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([0, 2, 1, 0]), 1)

    def test_example3(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([24, 69, 100, 99, 79, 78, 67, 36, 26, 19]), 2)

    def test_large(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([1, 2, 3, 4, 5, 3, 1]), 4)


if __name__ == '__main__':
    unittest.main()
```