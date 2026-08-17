---
title: 3439. 重新安排会议得到最多空余时间 I
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 贪心
description: "给定活动总时长和 n 个非重叠会议，可重新安排至多 k 个会议，最大化相邻会议之间的最长连续空余时间"
leetcode: 3439
studyplan: 滑动窗口与双指针
---

# 3439. 重新安排会议得到最多空余时间 I

## 题目描述

给定一个活动总时长 `eventTime`，以及 `n` 个非重叠会议 `[startTime[i], endTime[i]]`。

你可以重新安排 **至多** `k` 个会议（平移，保持时长、顺序、不重叠），最大化相邻两个会议之间的 **最长连续空余时间**。

**示例 1：**

```
输入：eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]
输出：2
解释：将 [1,2] 移到 [2,3]，得到空余时间 [0,2]
```

## 解法思路

将问题转化为间隙数组的定长滑窗：

1. 计算 `n+1` 个间隙：`gap[0] = startTime[0]`，`gap[i] = startTime[i] - endTime[i-1]`，`gap[n] = eventTime - endTime[n-1]`
2. 重新安排 `k` 个连续会议可以合并 `k+1` 个连续间隙
3. 用定长滑窗求长度为 `k+1` 的最大子数组和

## 题解

```python
class Solution:
    def maxFreeTime(self, eventTime: int, k: int, startTime: list[int], endTime: list[int]) -> int:
        n = len(startTime)
        gaps = [0] * (n + 1)
        gaps[0] = startTime[0]
        for i in range(1, n):
            gaps[i] = startTime[i] - endTime[i - 1]
        gaps[n] = eventTime - endTime[n - 1]

        ws = k + 1
        cur = sum(gaps[:ws])
        ans = cur
        for i in range(ws, n + 1):
            cur += gaps[i] - gaps[i - ws]
            if cur > ans:
                ans = cur

        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)，间隙数组