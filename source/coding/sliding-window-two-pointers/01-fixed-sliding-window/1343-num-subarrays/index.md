---
title: 1343. 大小为 K 且平均值大于等于阈值的子数组数目
notebook: coding
tags: [滑动窗口, 定长]
description: "返回长度为 k 且平均值 >= threshold 的连续子数组个数"
leetcode: 1343
studyplan: 滑动窗口与双指针
---

# 1343. 大小为 K 且平均值大于等于阈值的子数组数目

## 题目描述

给你一个整数数组 `arr` 和两个整数 `k` 和 `threshold`。

请你返回长度为 `k` 且平均值大于等于 `threshold` 的子数组数目。

**示例 1：**

```
输入：arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
输出：3
解释：子数组 [2,5,5],[5,5,5] 和 [5,5,8] 的平均值分别为 4,5 和 6。
```

**示例 2：**

```
输入：arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
输出：6
```

**提示：**

- `1 <= arr.length <= 10^5`
- `1 <= k <= arr.length`
- `0 <= threshold <= 10^4`

## 解法思路

定长滑动窗口。平均值 >= threshold 等价于和 >= k * threshold。

## 题解

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        target = k * threshold
        cur = sum(arr[:k])
        ans = 1 if cur >= target else 0
        for i in range(k, len(arr)):
            cur += arr[i] - arr[i - k]
            if cur >= target:
                ans += 1
        return ans
```