---
title: 1493. 删掉一个元素以后全为 1 的最长子数组
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 数组
description: "删除一个元素后，求最长全 1 子数组的长度"
leetcode: 1493
studyplan: 滑动窗口与双指针
---

# 1493. 删掉一个元素以后全为 1 的最长子数组

## 题目描述

给你一个二进制数组 `nums`，你需要从中删掉一个元素。请在删掉元素的结果数组中，返回最长的且只包含 1 的非空子数组的长度。如果不存在这样的子数组，请返回 0。

**示例 1：**

```
输入：nums = [1,1,0,1]
输出：3
```

**示例 2：**

```
输入：nums = [0,1,1,1,0,1,1,0,1]
输出：5
```

**示例 3：**

```
输入：nums = [1,1,1]
输出：2
```

## 解法思路

等价于求最长子数组长度（减一），满足子数组至多有一个 0。不定长滑动窗口，维护窗口内 0 的个数 ≤ 1，更新答案时窗口长度减 1（因为必须删除一个元素）。

## 题解

```python
class Solution:
    def longestSubarray(self, nums: list[int]) -> int:
        ans = left = cnt0 = 0
        for right, x in enumerate(nums):
            if x == 0:
                cnt0 += 1
            while cnt0 > 1:
                if nums[left] == 0:
                    cnt0 -= 1
                left += 1
            ans = max(ans, right - left)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)