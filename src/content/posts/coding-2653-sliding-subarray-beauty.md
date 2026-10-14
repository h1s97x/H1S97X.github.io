---
title: 2653. 滑动子数组的美丽值
tags:
  - 滑动窗口
  - 定长
  - 计数排序
description: "求每个长度为 k 的子数组中第 x 小的数（负数才有效）"
leetcode: 2653
studyplan: 滑动窗口与双指针
published: 2026-08-18T13:33:15+08:00
updated: 2026-08-18T13:33:15+08:00
category: 题解
notebook: coding
---


# 2653. 滑动子数组的美丽值

## 题目描述

给你一个长度为 n 的整数数组 `nums`，求出每个长度为 `k` 的子数组的**美丽值**。如果子数组中第 `x` 小整数是负数，那么美丽值为第 `x` 小的数，否则美丽值为 0。

**示例 1：**

```
输入：nums = [1,-1,-3,-2,3], k = 3, x = 2
输出：[-1,-2,-2]
```

**示例 2：**

```
输入：nums = [-1,-2,-3,-4,-5], k = 2, x = 2
输出：[-1,-2,-3,-4]
```

## 核心思想

对每个长度为 `k` 的窗口，要求第 `x` 小。朴素做法是每次把窗口内 k 个数排序取第 x 小，复杂度 O(k log k)，总复杂度 O(nk log k) 偏慢。

关键约束是 **值域极小**：`-50 ≤ nums[i] ≤ 50`，一共只有 `101` 种取值。这给了我们一条更快的路——**计数排序**：用频率数组 `cnt` 统计窗口内每个值的出现次数，再从小到大累加频次，累加到 `≥ x` 时停下的那个值就是第 x 小。每次找第 x 小只需遍历这固定的 101 个取值，与 k 无关。

于是这是一个「定长滑动窗口 + 计数排序」的组合：

- 窗口右端点每右移一格，就多一个元素入窗、少一个元素出窗；
- 更新 `cnt` 后，遍历值域 `-50..50` 找出第 x 小；
- 若第 x 小是负数则返回它，否则返回 0。

## 算法步骤

1. 用 `OFFSET = 50` 把 `[-50, 50]` 映射到数组下标 `[0, 100]`。
2. 先把前 k 个元素入窗，建立初始 `cnt`。
3. 写一个 `get_xth()`：从 `-50` 开始累加 `cnt`，累加值 `≥ x` 时停下；记录当前值 `v`，若 `v < 0` 返回 `v`，否则返回 0。
4. 记录第一个窗口的答案，然后窗口右移：出 `nums[i-k]`、入 `nums[i]`，每轮用 `get_xth()` 填答案。

## 逐步举例

以 `nums = [1,-1,-3,-2,3], k = 3, x = 2` 为例（值域偏移 50 后映射下表）。

**窗口 1 = [1, -1, -3]**：

- 频率（从小到大）：-3:1、-1:1、1:1
- 累加到 ≥ 2：-3 (acc=1) → -1 (acc=2) ✅
- 第 2 小是 -1，为负数 → 美丽值 **-1**

**窗口 2 = [-1, -3, -2]**：

- 频率：-3:1、-2:1、-1:1
- 累加：-3 (acc=1) → -2 (acc=2) ✅
- 第 2 小是 -2 → 美丽值 **-2**

**窗口 3 = [-3, -2, 3]**：

- 频率：-3:1、-2:1、3:1
- 累加：-3 (acc=1) → -2 (acc=2) ✅
- 第 2 小是 -2 → 美丽值 **-2**

结果 `[-1, -2, -2]` ✅

## 代码实现

```python
class Solution:
    def getSubarrayBeauty(self, nums: list[int], k: int, x: int) -> list[int]:
        OFFSET = 50
        cnt = [0] * 101
        for i in range(k):
            cnt[nums[i] + OFFSET] += 1

        def get_xth() -> int:
            acc = 0
            for v in range(-50, 51):
                acc += cnt[v + OFFSET]
                if acc >= x:
                    return v if v < 0 else 0
            return 0

        n = len(nums)
        ans = [0] * (n - k + 1)
        ans[0] = get_xth()
        for i in range(k, n):
            cnt[nums[i - k] + OFFSET] -= 1
            cnt[nums[i] + OFFSET] += 1
            ans[i - k + 1] = get_xth()
        return ans
```

```python
import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/2653-sliding-subarray-beauty")
from solution import Solution
import unittest

class TestGetSubarrayBeauty(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.getSubarrayBeauty([1,-1,-3,-2,3], 3, 2), [-1,-2,-2])

    def test_example2(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-1,-2,-3,-4,-5], 2, 2), [-1,-2,-3,-4])

    def test_example3(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-3,1,2,-3,0,-3], 2, 1), [-3,0,-3,-3,-3])

    def test_all_positive(self):
        self.assertEqual(self.solution.getSubarrayBeauty([1,2,3,4,5], 3, 2), [0,0,0])

    def test_single_element(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-5], 1, 1), [-5])

    def test_x_larger(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-1,-2,-3], 3, 3), [-1])

if __name__ == "__main__":
    unittest.main()
```

## 复杂度分析

- 时间复杂度：O(n × 101)，n 个窗口，每个窗口遍历固定 101 个取值找第 x 小。
- 空间复杂度：O(101)，频率数组大小固定。