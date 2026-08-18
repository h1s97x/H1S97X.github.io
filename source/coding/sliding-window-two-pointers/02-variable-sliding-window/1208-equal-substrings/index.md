---
title: 1208. 尽可能使字符串相等
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 字符串
description: "将 s 的子串转化为 t 中对应子串，预算为 maxCost，求最大可转化长度"
leetcode: 1208
studyplan: 滑动窗口与双指针
---

# 1208. 尽可能使字符串相等

## 题目描述

给你两个长度相同的字符串 `s` 和 `t`。将 `s` 中的第 `i` 个字符变到 `t` 中的第 `i` 个字符需要 `|s[i] - t[i]|` 的开销。总开销应当小于等于 `maxCost`。求可以转化的最大子串长度。

## 解法思路

先计算每个位置的开销数组 `costs[i] = |ord(s[i]) - ord(t[i])|`，问题转化为求最长的子数组使得子数组和 ≤ maxCost。不定长滑动窗口，维护窗口内开销和，超预算时收缩左边界。

## 题解

```python
class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        n = len(s)
        ans = left = cost = 0
        for right in range(n):
            cost += abs(ord(s[right]) - ord(t[right]))
            while cost > maxCost:
                cost -= abs(ord(s[left]) - ord(t[left]))
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)