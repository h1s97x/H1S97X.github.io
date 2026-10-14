---
title: "2779. 数组的最大美丽值"
tags:
  - 滑动窗口
  - 不定长
  - 排序
description: "排序后找最长子数组，使窗口内元素可调整为同一值"
leetcode: 2779
studyplan: 滑动窗口与双指针
published: 2026-08-18T13:42:56+08:00
updated: 2026-08-18T13:42:56+08:00
category: 题解
notebook: coding
---


# 2779. 数组的最大美丽值

## 题目描述

给你一个下标从 0 开始的整数数组 `nums` 和一个非负整数 `k`。

在一步操作中，你可以执行下述指令：
- 在范围 `[0, nums.length - 1]` 中选择一个此前没有选过的下标 `i`。
- 将 `nums[i]` 替换为范围 `[nums[i] - k, nums[i] + k]` 内的任一整数。

数组的**美丽值**定义为数组中由相等元素组成的最长子序列的长度。

对数组 `nums` 执行上述操作任意次后，返回数组可能取得的**最大美丽值**。

## 核心思想

**排序 + 不定长滑动窗口**。

每个元素通过操作可以变成 `[x-k, x+k]` 范围内的任意整数。要使窗口内所有元素变成同一个数，需要满足：

$$\max(\text{窗口}) - \min(\text{窗口}) \leq 2k$$

因为排序后窗口内最大值是 `nums[right]`，最小值是 `nums[left]`，所以条件简化为：

$$nums[right] - nums[left] \leq 2k$$

问题转化为：排序后，找最长的连续子数组，满足上述条件。

## 算法步骤

1. 对 `nums` 升序排序
2. 初始化 `left = 0`, `ans = 0`
3. 遍历 `right` 从 `0` 到 `n-1`：
   - 当 `nums[right] - nums[left] > 2k` 时，`left += 1`
   - 更新 `ans = max(ans, right - left + 1)`
4. 返回 `ans`

## 逐步举例

以 `nums = [4, 6, 1, 2]`, `k = 1` 为例：

**排序后**：`[1, 2, 4, 6]`，`2k = 2`

| right | nums[right] | nums[right]-nums[left] | >2k? | 收缩 | left | ans |
|-------|-------------|------------------------|------|------|------|-----|
| 0     | 1           | 1-1=0                  | 否   | —    | 0    | 1   |
| 1     | 2           | 2-1=1                  | 否   | —    | 0    | 2   |
| 2     | 4           | 4-1=3                  | 是   | l=1, 4-2=2≤2 | 1 | 2 |
| 3     | 6           | 6-2=4                  | 是   | l=2, 6-4=2≤2 | 2 | 2 |

最终 `ans = 2`（如子数组 `[1,2]` 都变成 1，或 `[4,6]` 都变成 5）。

## 复杂度分析

- **时间复杂度**：`O(n log n)`。排序占主导，滑窗 `O(n)`。
- **空间复杂度**：`O(1)`（或 `O(log n)` 取决于排序实现）。

## 参考

- [灵茶山艾府：数组的最大美丽值](https://leetcode.cn/problems/maximum-beauty-of-an-array-after-applying-operation/solutions/2370664/)

## 代码实现

```python
from typing import List


class Solution:
    def maximumBeauty(self, nums: List[int], k: int) -> int:
        nums.sort()
        n = len(nums)
        ans = left = 0
        for right in range(n):
            while nums[right] - nums[left] > 2 * k:
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestMaximumBeauty(unittest.TestCase):
    def test_example1(self):
        nums = [4, 6, 1, 2]
        k = 2
        self.assertEqual(Solution().maximumBeauty(nums, k), 3)

    def test_example2(self):
        nums = [1, 1, 1, 1]
        k = 10
        self.assertEqual(Solution().maximumBeauty(nums, k), 4)

    def test_single(self):
        nums = [5]
        k = 0
        self.assertEqual(Solution().maximumBeauty(nums, k), 1)

    def test_no_range(self):
        nums = [1, 10, 100]
        k = 0
        self.assertEqual(Solution().maximumBeauty(nums, k), 1)

    def test_large_k(self):
        nums = [1, 3, 5, 7]
        k = 5
        self.assertEqual(Solution().maximumBeauty(nums, k), 4)

    def test_two_elements(self):
        nums = [1, 10]
        k = 4
        self.assertEqual(Solution().maximumBeauty(nums, k), 1)


if __name__ == "__main__":
    unittest.main()
```
