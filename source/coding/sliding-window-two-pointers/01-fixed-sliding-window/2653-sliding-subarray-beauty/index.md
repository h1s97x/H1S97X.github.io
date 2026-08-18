---
title: 2653. 滑动子数组的美丽值
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 计数排序
description: "求每个长度为 k 的子数组中第 x 小的数（负数才有效）"
leetcode: 2653
studyplan: 滑动窗口与双指针
---

# 2653. 滑动子数组的美丽值

## 题目描述

给你一个长度为 n 的整数数组 `nums`，求出每个长度为 `k` 的子数组的**美丽值**。如果子数组中第 `x` 小整数是负数，那么美丽值为第 `x` 小的数，否则美丽值为 0。

**示例 1：**

```
输入：nums = [1,-1,-3,-2,3], k = 3, x = 2
输出：[-1,-2,-2]
```

**示例 2：**

```
输入：nums = [-1,-2,-3,-4,-5], k = 2, x = 2
输出：[-1,-2,-3,-4]
```

## 解法思路

值域很小（-50 ≤ nums[i] ≤ 50），使用计数排序。定长滑动窗口维护频率数组，每次滑动后遍历值域找到第 x 小的数。

## 题解

```python
class Solution:
    def getSubarrayBeauty(self, nums: list[int], k: int, x: int) -> list[int]:
        OFFSET = 50
        cnt = [0] * 101
        for i in range(k):
            cnt[nums[i] + OFFSET] += 1

        def get_xth() -> int:
            acc = 0
            for v in range(-50, 51):
                acc += cnt[v + OFFSET]
                if acc >= x:
                    return v if v < 0 else 0
            return 0

        n = len(nums)
        ans = [0] * (n - k + 1)
        ans[0] = get_xth()
        for i in range(k, n):
            cnt[nums[i - k] + OFFSET] -= 1
            cnt[nums[i] + OFFSET] += 1
            ans[i - k + 1] = get_xth()
        return ans
```

## 复杂度分析

- 时间复杂度：O(n * 101)，每次滑动后遍历值域找第 x 小
- 空间复杂度：O(101)