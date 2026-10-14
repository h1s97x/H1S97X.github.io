---
title: 1534. 统计好三元组
tags: [入门, 循环]
description: "统计满足 |a-b| <= a, |b-c| <= b, |a-c| <= c 的三元组数目"
leetcode: 1534
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个整数数组 `arr`，以及三个整数 `a`、`b`、`c`。

请统计其中好三元组的数量。

如果三元组 `(arr[i], arr[j], arr[k])` 满足下列全部条件，则认为它是一个 **好三元组**：

- `0 <= i < j < k < arr.length`
- `|arr[i] - arr[j]| <= a`
- `|arr[j] - arr[k]| <= b`
- `|arr[i] - arr[k]| <= c`

<https://leetcode.cn/problems/count-good-triplets/description/>

**示例 1：**

> 输入：arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
> 输出：4
> 解释：一共有 4 个好三元组：(3,0,1), (3,0,1), (3,1,1), (0,1,1)

**示例 2：**

> 输入：arr = [1,1,2,2,3], a = 0, b = 0, c = 1
> 输出：0

**约束：**

- `3 <= arr.length <= 100`
- `0 <= arr[i] <= 1000`
- `0 <= a, b, c <= 1000`

## 思路

三重循环遍历所有 `i < j < k` 组合，逐一判断条件。

```python
class Solution:
    def countGoodTriplets(self, arr: list[int], a: int, b: int, c: int) -> int:
        n = len(arr)
        count = 0
        for i in range(n - 2):
            for j in range(i + 1, n - 1):
                if abs(arr[i] - arr[j]) > a:
                    continue
                for k in range(j + 1, n):
                    if abs(arr[j] - arr[k]) <= b and abs(arr[i] - arr[k]) <= c:
                        count += 1
        return count
```

```python
import unittest


class TestCountGoodTriplets(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3), 4)

    def test_example2(self):
        self.assertEqual(self.solution.countGoodTriplets([1, 1, 2, 2, 3], 0, 0, 1), 0)

    def test_all_valid(self):
        self.assertEqual(self.solution.countGoodTriplets([1, 1, 1], 0, 0, 0), 1)


if __name__ == '__main__':
    unittest.main()
```