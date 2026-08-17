---
title: 2134. 最少交换次数来组合所有的 1 II
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 环形数组
description: "环形二进制数组中，交换相邻元素使所有 1 聚集在一起的最小交换次数"
leetcode: 2134
studyplan: 滑动窗口与双指针
---

# 2134. 最少交换次数来组合所有的 1 II

## 题目描述

**交换** 定义为选中一个数组中的两个 **互不相同** 的位置并交换二者的值。

环形数组是一个数组，可以认为 **第一个** 元素和 **最后一个** 元素 **相邻**。

给你一个 **二进制环形** 数组 `nums`，返回在 **任意位置** 将数组中的所有 `1` 聚集在一起需要的最少交换次数。

**示例 1：**

```
输入：nums = [0,1,0,1,1,0,0]
输出：1
```

**示例 2：**

```
输入：nums = [0,1,1,1,0,0,1,1,0]
输出：2
```

## 解法思路

设总共有 `k` 个 1，则最终聚集的区域长度为 `k`。在环形数组中找一个长度为 `k` 的窗口，使其包含最多 1，最少交换次数 = `k - max(窗口内 1 的个数)`。

用取模运算处理环形，保持 O(n) 时间。

## 题解

```python
class Solution:
    def minSwaps(self, nums: list[int]) -> int:
        k = sum(nums)
        if k <= 1:
            return 0

        n = len(nums)
        cur = sum(nums[:k])
        max_ones = cur
        for i in range(k, n + k - 1):
            cur += nums[i % n] - nums[(i - k) % n]
            if cur > max_ones:
                max_ones = cur

        return k - max_ones
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
