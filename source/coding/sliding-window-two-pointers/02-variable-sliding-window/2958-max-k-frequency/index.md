---
title: 2958. 最多 K 个重复元素的最长子数组
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 数组
  - 哈希表
description: "求最长子数组，其中每个元素的出现次数不超过 k"
leetcode: 2958
studyplan: 滑动窗口与双指针
---

# 2958. 最多 K 个重复元素的最长子数组

## 题目描述

给你一个整数数组 nums 和一个整数 k。如果一个数组中所有元素的频率都小于等于 k，则称这个数组是"好"数组。返回 nums 中最长好子数组的长度。

## 解法思路

不定长滑动窗口，用哈希表维护窗口内元素频率。当新加入元素 x 的频率超过 k 时，右移左指针直到 x 的频率 ≤ k。

## 题解

```python
class Solution:
    def maxSubarrayLength(self, nums: list[int], k: int) -> int:
        ans = left = 0
        cnt = {}
        for right, x in enumerate(nums):
            cnt[x] = cnt.get(x, 0) + 1
            while cnt[x] > k:
                cnt[nums[left]] -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)