---
title: 3090. 每个字符最多出现两次的最长子字符串
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 哈希表
description: "找出每个字符最多出现两次的最长子串长度"
leetcode: 3090
studyplan: 滑动窗口与双指针
---

# 3090. 每个字符最多出现两次的最长子字符串

## 题目描述

给你一个字符串 `s`，请找出满足每个字符最多出现两次的最长子字符串，并返回该子字符串的最大长度。

**示例 1：**

```
输入：s = "bcbbbcba"
输出：4
```

**示例 2：**

```
输入：s = "aaaa"
输出：2
```

## 解法思路

不定长滑动窗口（越短越合法）。右指针不断右移，当某个字符出现次数超过 2 时，移动左指针直到该字符次数恢复为 ≤2。每次迭代更新最大长度。

## 题解

```python
class Solution:
    def maximumLengthSubstring(self, s: str) -> int:
        ans = left = 0
        cnt = {}
        for right, ch in enumerate(s):
            cnt[ch] = cnt.get(ch, 0) + 1
            while cnt[ch] > 2:
                cnt[s[left]] -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)，仅 26 个小写字母