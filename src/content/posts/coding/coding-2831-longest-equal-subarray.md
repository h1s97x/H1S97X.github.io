---
title: "2831. 找出最长等值子数组"
tags:
  - 滑动窗口
  - 不定长
  - 哈希表
description: "滑动窗口 + 哈希表，维护窗口内最大频率，窗口长度 - 最大频率 ≤ k"
leetcode: 2831
studyplan: 滑动窗口与双指针
published: 2026-08-18T13:45:32+08:00
updated: 2026-08-18T13:45:32+08:00
category: 题解
notebook: coding
---


# 2831. 找出最长等值子数组

## 题目描述

给你一个下标从 0 开始的整数数组 `nums` 和一个整数 `k`。

如果子数组中所有元素都相等，则认为子数组是一个**等值子数组**。

从 `nums` 中删除最多 `k` 个元素后，返回可能的最长等值子数组的长度。

## 核心思想

**滑动窗口 + 哈希表维护频率**。

问题等价于：找一个最长窗口，使得窗口内出现次数最多的元素（众数）的频数 ≥ 窗口长度 - k。换句话说，窗口内非众数的元素不超过 k 个，这些元素可以被删除。

维护窗口内每个元素的频率 `cnt`，以及窗口内的最大频率 `max_freq`。当 `窗口长度 - max_freq > k` 时收缩左端点。

## 算法步骤

1. 初始化 `cnt`（哈希表）、`left = 0`、`max_freq = 0`、`ans = 0`
2. 遍历 `right` 从 0 到 n-1：
   - `cnt[nums[right]] += 1`
   - `max_freq = max(max_freq, cnt[nums[right]])`
   - 当 `right - left + 1 - max_freq > k` 时：
     - `cnt[nums[left]] -= 1`
     - `left += 1`
   - `ans = max(ans, max_freq)`
3. 返回 `ans`

## 逐步举例

以 `nums = [1,3,2,3,1,3]`, `k = 1` 为例：

| right | nums[right] | cnt | max_freq | 窗口长 | 窗口长-max_freq | 收缩 | left | ans |
|-------|-------------|-----|----------|--------|-----------------|------|------|-----|
| 0     | 1           | {1:1} | 1 | 1 | 0≤1✓ | — | 0 | 1 |
| 1     | 3           | {1:1,3:1} | 1 | 2 | 1≤1✓ | — | 0 | 1 |
| 2     | 2           | {1:1,3:1,2:1} | 1 | 3 | 2>1 | l=1 | 1 | 1 |
| 3     | 3           | {3:2,2:1} | 2 | 3 | 1≤1✓ | — | 1 | 2 |
| 4     | 1           | {3:2,2:1,1:1} | 2 | 4 | 2>1 | l=2 | 2 | 2 |
| 5     | 3           | {3:2,2:1,1:1} | 2 | 4 | 2>1 | l=3 | 3 | 2 |

最终 `ans = 2`。

验证：子数组 `[3,3]`（索引 1,3）删除 1 个元素（索引 2 的 2）后得到等值子数组长度 2 ✓。

## 复杂度分析

- **时间复杂度**：`O(n)`。每个元素最多进出窗口各一次。
- **空间复杂度**：`O(n)`。哈希表存储元素频率。

## 参考

- [灵茶山艾府：找出最长等值子数组](https://leetcode.cn/problems/find-the-longest-equal-subarray/solutions/2831/)

## 代码实现

```python
from typing import List
from collections import defaultdict


class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        cnt = defaultdict(int)
        ans = left = max_freq = 0
        for right, x in enumerate(nums):
            cnt[x] += 1
            max_freq = max(max_freq, cnt[x])
            while right - left + 1 - max_freq > k:
                cnt[nums[left]] -= 1
                left += 1
            ans = max(ans, max_freq)
        return ans
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestLongestEqualSubarray(unittest.TestCase):
    def test_example1(self):
        nums = [1, 3, 2, 3, 1, 3]
        k = 3
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 3)

    def test_example2(self):
        nums = [1, 1, 2, 2, 1, 1]
        k = 2
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 4)

    def test_k_zero(self):
        nums = [1, 2, 3, 4]
        k = 0
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 1)

    def test_all_same(self):
        nums = [1, 1, 1, 1]
        k = 0
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 4)

    def test_single(self):
        nums = [1]
        k = 0
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 1)

    def test_large_k(self):
        nums = [1, 2, 3, 4, 5]
        k = 4
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 1)


if __name__ == "__main__":
    unittest.main()
```
