---
title: 3439. 重新安排会议得到最多空余时间 I
tags:
  - 滑动窗口
  - 定长
  - 贪心
description: "给定活动总时长和 n 个非重叠会议，可重新安排至多 k 个会议，最大化相邻会议之间的最长连续空余时间"
leetcode: 3439
studyplan: 滑动窗口与双指针
published: 2026-08-17T09:22:52+08:00
updated: 2026-08-17T09:22:52+08:00
category: 题解
notebook: coding
---


# 3439. 重新安排会议得到最多空余时间 I

## 题目描述

给定一个活动总时长 `eventTime`，以及 `n` 个非重叠会议 `[startTime[i], endTime[i]]`。

你可以重新安排 **至多** `k` 个会议（可在时间轴上平移，保持时长、相对顺序且不重叠），目的是最大化相邻两个会议（以及首尾边界）之间的最长连续空余时间。

**示例 1：**

```
输入：eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]
输出：2
解释：把会议 [1,2] 平移到 [2,3]，得到空余时间 [0,2]，长度为 2。
```

## 解法思路

**核心转化**：把空余时间抽出来做成**间隙数组**，问题就变成定长滑窗求最大子数组和。

**第一步，构建间隙数组 `gaps`**。时间轴被会议切分成 `n+1` 段空余：
- `gaps[0] = startTime[0]`（第 1 个会议前的空余）
- `gaps[i] = startTime[i] - endTime[i-1]`（第 i 个会议与第 i-1 个之间的空余，`1 ≤ i ≤ n-1`）
- `gaps[n] = eventTime - endTime[n-1]`（最后 1 个会议后的空余）

**第二步，关键观察**：既然会议可平移，那么**把连续 k 个会议全部挪走**，就可以把这 k 个会议两侧（含首尾）的 **k+1 个间隙合并成一个大空余**。

**第三步，定长滑窗**：问题等价于在 `gaps` 中找长度为 `k+1` 的连续子数组的最大和。用 **入-更新-出** 三步 O(1) 滑动更新窗口和 `cur`。

**逐步举例**（`eventTime=5`, `k=1`, `start=[1,3]`, `end=[2,5]`）：

- 构建间隙：`gaps[0]=1`, `gaps[1]=3-2=1`, `gaps[2]=5-5=0`，即 `gaps=[1,1,0]`。
- 窗口大小 `k+1 = 2`：
  - 窗口 `[0,1]`（gap 下标 0..1）和 = 1+1 = **2**
  - 窗口 `[1,2]` 和 = 1+0 = 1
- 最大和 = **2**，对应把会议 [1,2] 挪走合并 gap[0]+gap[1]，与预期一致。

## 复杂度分析

- 时间复杂度：O(n)，一次遍历。
- 空间复杂度：O(n)，用于存储间隙数组。

## 代码实现

```python
class Solution:
    def maxFreeTime(self, eventTime: int, k: int, startTime: list[int], endTime: list[int]) -> int:
        n = len(startTime)
        gaps = [0] * (n + 1)
        gaps[0] = startTime[0]
        for i in range(1, n):
            gaps[i] = startTime[i] - endTime[i - 1]
        gaps[n] = eventTime - endTime[-1]

        cur = sum(gaps[:k + 1])
        ans = cur
        for i in range(k + 1, n + 1):
            cur += gaps[i] - gaps[i - (k + 1)]
            if cur > ans:
                ans = cur

        return ans
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMaxFreeTime(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxFreeTime(5, 1, [1, 3], [2, 5]), 2)

    def test_example2(self):
        self.assertEqual(self.solution.maxFreeTime(10, 1, [0, 2, 9], [1, 4, 10]), 6)

    def test_example3(self):
        self.assertEqual(self.solution.maxFreeTime(5, 2, [0, 1, 2, 3, 4], [1, 2, 3, 4, 5]), 0)

    def test_k_equals_n(self):
        self.assertEqual(self.solution.maxFreeTime(10, 3, [1, 3, 5], [2, 4, 6]), 7)

    def test_move_middle_meetings(self):
        self.assertEqual(self.solution.maxFreeTime(10, 2, [1, 3, 5], [2, 4, 6]), 6)

    def test_single_meeting(self):
        self.assertEqual(self.solution.maxFreeTime(10, 1, [2], [5]), 7)

    def test_no_gap(self):
        self.assertEqual(self.solution.maxFreeTime(5, 1, [0, 2], [2, 5]), 0)


if __name__ == "__main__":
    unittest.main()
```