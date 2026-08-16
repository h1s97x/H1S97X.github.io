---
title: 643. 子数组最大平均数 I
notebook: coding
tags: [滑动窗口, 定长]
description: "给定 n 个整数数组，找出长度为 k 的连续子数组的最大平均数"
leetcode: 643
studyplan: 滑动窗口与双指针
---

# 643. 子数组最大平均数 I

## 题目描述

给你一个由 `n` 个整数组成的数组 `nums` 和一个整数 `k`。

请你找出长度为 `k` 的连续子数组的最大平均数，并返回该最大值。

**示例 1：**

```
输入：nums = [1,12,-5,-6,50,3], k = 4
输出：12.75
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
```

**示例 2：**

```
输入：nums = [5], k = 1
输出：5.0
```

**提示：**

- `n == nums.length`
- `1 <= k <= n <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## 解法思路

定长滑动窗口，维护窗口内元素和，每次滑动后更新最大和。

## 题解

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        cur = sum(nums[:k])
        ans = cur
        for i in range(k, len(nums)):
            cur += nums[i] - nums[i - k]
            if cur > ans:
                ans = cur
        return ans / k
```