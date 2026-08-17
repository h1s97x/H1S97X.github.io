---
title: 2461. 长度为 K 子数组中的最大和
notebook: coding
tags: [滑动窗口, 定长]
description: "长度为 k 且所有元素互不相同的子数组的最大和"
leetcode: 2461
studyplan: 滑动窗口与双指针
---

# 2461. 长度为 K 子数组中的最大和

## 题目描述

给你一个整数数组 `nums` 和一个整数 `k`。请你找出长度为 `k` 且所有元素互不相同的子数组的最大和。如果不存在这样的子数组，返回 0。

**示例 1：**

```
输入：nums = [1,5,4,2,9,9,9], k = 3
输出：15
解释：长度为 3 的子数组：[1,5,4] 和 10，[5,4,2] 和 11，[4,2,9] 和 15，[2,9,9] 重复元素，[9,9,9] 重复元素。
```

**示例 2：**

```
输入：nums = [4,4,4], k = 3
输出：0
```

**提示：**

- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## 解法思路

定长滑动窗口 + 哈希表。窗口内元素全不同时更新答案。

## 题解

```python
class Solution:
    def maximumSubarraySum(self, nums: List[int], k: int) -> int:
        from collections import Counter
        window = Counter(nums[:k])
        cur = sum(nums[:k])
        ans = cur if len(window) == k else 0
        for i in range(k, len(nums)):
            out = nums[i - k]
            window[out] -= 1
            if window[out] == 0:
                del window[out]
            window[nums[i]] += 1
            cur += nums[i] - out
            if len(window) == k and cur > ans:
                ans = cur
        return ans
```