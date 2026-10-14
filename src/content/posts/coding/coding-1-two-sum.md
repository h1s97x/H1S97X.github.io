---
title: 1. 两数之和
tags: [算法]
description: "给定整数数组 nums 和目标值 target，找出和为目标值的两个整数的下标"
leetcode: 1
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** _`target`_ 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

<https://leetcode.cn/problems/two-sum/description/>

**示例 1：**

> 输入：nums = [2,7,11,15], target = 9
> 输出：[0,1]
> 解释：因为 nums[0] + nums[1] == 9，返回 [0, 1]。

**示例 2：**

> 输入：nums = [3,2,4], target = 6
> 输出：[1,2]

**示例 3：**

> 输入：nums = [3,3], target = 6
> 输出：[0,1]

**约束：**

- `2 <= nums.length <= 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= target <= 10⁹`
- **只会存在一个有效答案**

**进阶：** 你可以想出一个时间复杂度小于 `O(n²)` 的算法吗？

## Test Cases

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
```

```python
import pytest

from solution import Solution
from solution2 import Solution as Solution2


@pytest.mark.parametrize('nums, target, expected', [
    ([2,7,11,15], 9, [0, 1]),
    ([3,2,4], 6, [1, 2]),
    ([3,3], 6, [0, 1]),
])
class Test:
    def test_solution(self, nums, target, expected):
        sol = Solution()
        result = sol.twoSum(nums, target)
        assert sorted(result) == sorted(expected)

    def test_solution2(self, nums, target, expected):
        sol = Solution2()
        result = sol.twoSum(nums, target)
        assert sorted(result) == sorted(expected)
```

## Thoughts

一方面是要找到那两个相加等于目标值的数，另一方面需要能记录到这两数的原始索引下标。

用 `O(n log n)` 时间对数组排序。

从最小的数字开始遍历，直到 `target / 2`（包含）。

对于一个数字 v，用二分法，在后半数组中查找 target - v。二分查找是 `O(log n)`，总共也是 `O(n log n)`。

需要记录数字在排序前的数组下标。

## Code

```python
from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        indices = list(range(n))
        indices.sort(key=lambda i: nums[i])

        for i, p1 in enumerate(indices):
            v2 = target - nums[p1]
            p2 = self._bin_find(nums, indices, v2, i + 1)
            if p2 is not None:
                return [p1, p2]

        return []

    def _bin_find(self, nums: List[int], indices: List[int], value: int, left: int) -> int | None:
        l = left
        if l >= len(indices) or (t := nums[indices[l]]) > value:
            return None
        elif t == value:
            return indices[l]

        r = len(indices) - 1
        if (t := nums[indices[r]]) < value:
            return None
        elif t == value:
            return indices[r]

        while l <= r:
            m = (l + r) >> 1
            if (t := nums[indices[m]]) == value:
                return indices[m]
            elif t < value:
                l = m + 1
            else:
                r = m - 1

        return None
```

## 快一些

可以利用哈希表 `O(1)` 查询时间的特点，把所有数字放进哈希表，然后直接利用哈希表查找 target - v 是否存在。

因为题目限定了有唯一解，所以不用管重复的数字。唯一需要考虑的是，当 target 是偶数时，可能有两个 `target / 2`。

时间复杂度为 `O(n)`。

```python
from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        indices = {}
        half = target >> 1 if target & 1 == 0 else None
        for i, v in enumerate(nums):
            # Special treatment of `target / 2` when target is even.
            if half is not None and v == half and v in indices:
                return [indices[v], i]

            indices[v] = i

        for i, v1 in enumerate(nums):
            if half is not None and v1 == half:
                continue

            v2 = target - v1
            if v2 in indices:
                return i, indices[v2]

        return []
```
