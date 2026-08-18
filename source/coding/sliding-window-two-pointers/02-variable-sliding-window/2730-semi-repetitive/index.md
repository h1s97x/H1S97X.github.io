---
title: 2730. 找到最长的半重复子字符串
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 字符串
description: "求最长子串，其中相邻相同字符对至多一对"
leetcode: 2730
studyplan: 滑动窗口与双指针
---

# 2730. 找到最长的半重复子字符串

## 题目描述

给你一个下标从 0 开始的字符串 s，只包含数字字符。如果一个字符串 t 中至多有一对相邻字符是相等的，则称 t 是半重复的。返回 s 中最长半重复子字符串的长度。

## 解法思路

不定长滑动窗口，维护窗口内相邻相同字符的对数 cnt。当 s[right] == s[right-1] 时 cnt 加 1；当 cnt > 1 时收缩左边界，若 s[left] == s[left+1] 则 cnt 减 1。

## 题解

```python
class Solution:
    def longestSemiRepetitiveSubstring(self, s: str) -> int:
        ans = left = cnt = 0
        for right in range(len(s)):
            if right > 0 and s[right] == s[right - 1]:
                cnt += 1
            while cnt > 1:
                if s[left] == s[left + 1]:
                    cnt -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)