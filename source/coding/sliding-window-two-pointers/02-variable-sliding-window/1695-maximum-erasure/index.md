---
title: 1695. 删除子数组的最大得分
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 数组
  - 哈希表
description: "求元素互不相同的子数组的最大和"
leetcode: 1695
studyplan: 滑动窗口与双指针
---

# 1695. 删除子数组的最大得分

## 题目描述

给你一个正整数数组 nums，请你从中删除一个含有若干不同元素（即元素互不相同）的子数组。删除子数组的得分就是子数组各元素之和。返回只删除一个子数组可获得的最大得分。

## 解法思路

求元素互不相同的子数组的最大和。不定长滑动窗口，用集合维护窗口内元素，当遇到重复元素时收缩左边界直到不再重复。

## 题解

```python
class Solution:
    def maximumUniqueSubarray(self, nums: list[int]) -> int:
        ans = left = cur = 0
        seen = set()
        for right, x in enumerate(nums):
            while x in seen:
                seen.remove(nums[left])
                cur -= nums[left]
                left += 1
            seen.add(x)
            cur += x
            ans = max(ans, cur)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)（集合存储窗口内元素）