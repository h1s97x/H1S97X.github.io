---
title: 2841. 几乎唯一子数组的最大和
notebook: coding
tags: [滑动窗口, 定长]
description: "长度为 k 且至少包含 m 个不同元素的子数组的最大和"
leetcode: 2841
studyplan: 滑动窗口与双指针
---

# 2841. 几乎唯一子数组的最大和

## 题目描述

给你一个整数数组 `nums` 和两个正整数 `m` 和 `k`。

返回 `nums` 中长度为 `k` 且包含至少 `m` 个不同元素的子数组的最大和。如果不存在这样的子数组，返回 0。

**示例 1：**

```
输入：nums = [2,6,7,3,1,7], m = 3, k = 4
输出：18
解释：有 3 个长度为 4 的子数组：[2,6,7,3] 和 18，[6,7,3,1] 和 17，[7,3,1,7] 和 18。
其中 [2,6,7,3] 和 [7,3,1,7] 都包含 3 个不同元素，最大和为 18。
```

**示例 2：**

```
输入：nums = [5,9,9,2,4,5,4], m = 1, k = 3
输出：23
```

**提示：**

- `1 <= m <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## 解法思路

定长滑动窗口 + 哈希表统计窗口内元素频率，判断不同元素个数是否 >= m。

## 题解

```python
class Solution:
    def maxSum(self, nums: List[int], m: int, k: int) -> int:
        from collections import Counter
        window = Counter(nums[:k])
        cur = sum(nums[:k])
        ans = cur if len(window) >= m else 0
        for i in range(k, len(nums)):
            out = nums[i - k]
            window[out] -= 1
            if window[out] == 0:
                del window[out]
            window[nums[i]] += 1
            cur += nums[i] - out
            if len(window) >= m and cur > ans:
                ans = cur
        return ans
```