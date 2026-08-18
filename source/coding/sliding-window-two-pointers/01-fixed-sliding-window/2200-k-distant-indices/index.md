---
title: 2200. 找出数组中的所有 K 近邻下标
notebook: coding
tags:
  - 滑动窗口
  - 双指针
description: "找到所有满足存在 j 使得 |i-j| ≤ k 且 nums[j] == key 的下标"
leetcode: 2200
studyplan: 滑动窗口与双指针
---

# 2200. 找出数组中的所有 K 近邻下标

## 题目描述

给你一个下标从 0 开始的整数数组 `nums` 和两个整数 `key` 和 `k`。K 近邻下标是 `nums` 中的一个下标 `i`，满足至少存在一个下标 `j` 使得 `|i - j| <= k` 且 `nums[j] == key`。以递增顺序返回所有 K 近邻下标。

**示例 1：**

```
输入：nums = [3,4,9,1,3,9,5], key = 9, k = 1
输出：[1,2,3,4,5,6]
```

**示例 2：**

```
输入：nums = [2,2,2,2,2], key = 2, k = 2
输出：[0,1,2,3,4]
```

## 解法思路

一次遍历，找到每个等于 `key` 的下标 `j`，将区间 `[j-k, j+k]` 内的下标加入答案。用变量 `r` 记录已处理到的右边界，避免重复添加。

## 题解

```python
class Solution:
    def findKDistantIndices(self, nums: list[int], key: int, k: int) -> list[int]:
        n = len(nums)
        ans = []
        r = 0
        for j, x in enumerate(nums):
            if x == key:
                l = max(r, j - k)
                r = min(n - 1, j + k) + 1
                for i in range(l, r):
                    ans.append(i)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)，每个下标最多被加入一次
- 空间复杂度：O(1)