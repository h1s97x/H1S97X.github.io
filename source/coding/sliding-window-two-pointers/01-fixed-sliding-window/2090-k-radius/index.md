---
title: 2090. 半径为 k 的子数组平均值
notebook: coding
tags: [滑动窗口, 定长]
description: "计算每个长度为 2k+1 的子数组的平均值，不足则返回 -1"
leetcode: 2090
studyplan: 滑动窗口与双指针
---

# 2090. 半径为 k 的子数组平均值

## 题目描述

给你一个下标从 0 开始的数组 `nums` 和一个整数 `k`。

半径为 k 的子数组平均值是指：对每个下标 i，以下标 i 为中心，半径为 k 的子数组（共 2k+1 个元素）的平均值向下取整。

返回数组 `avgs`，其中 `avgs[i]` 是对应下标的平均值，如果无法找到半径为 k 的子数组则返回 -1。

**示例 1：**

```
输入：nums = [7,4,3,9,1,8,5,2,6], k = 3
输出：[-1,-1,-1,5,4,4,-1,-1,-1]
```

**示例 2：**

```
输入：nums = [100000], k = 0
输出：[100000]
```

**提示：**

- `n == nums.length`
- `1 <= n <= 10^5`
- `0 <= k <= n`
- `0 <= nums[i] <= 10^5`

## 解法思路

窗口大小 = 2k+1。先计算第一个窗口 `[0, 2k]` 的和，然后滑动窗口，对每个中心位置 `i` 更新平均值。

## 题解

```python
class Solution:
    def getAverages(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        ans = [-1] * n
        if k == 0:
            return nums
        if n < 2 * k + 1:
            return ans
        window = 2 * k + 1
        cur = sum(nums[:window])
        ans[k] = cur // window
        for i in range(k + 1, n - k):
            cur += nums[i + k] - nums[i - k - 1]
            ans[i] = cur // window
        return ans
```