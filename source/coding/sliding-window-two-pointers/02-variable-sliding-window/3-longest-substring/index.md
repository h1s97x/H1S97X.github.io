---
title: 3. 无重复字符的最长子串
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 哈希表
description: "找到不含重复字符的最长子串长度"
leetcode: 3
studyplan: 滑动窗口与双指针
---

# 3. 无重复字符的最长子串

## 题目描述

给定一个字符串 `s`，请你找出其中不含有重复字符的**最长子串**的长度。

**示例 1：**

```
输入：s = "abcabcbb"
输出：3
解释：最长无重复子串是 "abc"，长度为 3。
```

**示例 2：**

```
输入：s = "bbbbb"
输出：1
```

**示例 3：**

```
输入：s = "pwwkew"
输出：3
```

## 解法思路

不定长滑动窗口（越短越合法）。用哈希表记录每个字符最近出现的位置，当遇到重复字符时，将左指针跳到该字符上次出现位置的下一个位置，确保窗口内始终无重复字符。每次迭代更新最大长度。

## 题解

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        ans = left = 0
        idx = {}
        for right, ch in enumerate(s):
            if ch in idx and idx[ch] >= left:
                left = idx[ch] + 1
            idx[ch] = right
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)，每个字符最多被访问两次
- 空间复杂度：O(|Σ|)，Σ 为字符集