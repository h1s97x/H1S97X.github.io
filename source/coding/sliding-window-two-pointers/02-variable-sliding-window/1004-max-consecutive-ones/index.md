---
title: 1004. 最大连续 1 的个数 III
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 数组
description: "最多翻转 k 个 0，求最长连续 1 的子数组长度"
leetcode: 1004
studyplan: 滑动窗口与双指针
---

# 1004. 最大连续 1 的个数 III

## 题目描述

给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0，请返回数组中连续 1 的最大个数。

## 解法思路

等价于求最长子数组，使得子数组中 0 的个数 ≤ k。不定长滑动窗口，维护窗口内 0 的个数，超过 k 时收缩左边界。

## 题解

```python
class Solution:
    def longestOnes(self, nums: list[int], k: int) -> int:
        ans = left = cnt0 = 0
        for right, x in enumerate(nums):
            if x == 0:
                cnt0 += 1
            while cnt0 > k:
                if nums[left] == 0:
                    cnt0 -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)