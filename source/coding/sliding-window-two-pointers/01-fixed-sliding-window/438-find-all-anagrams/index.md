---
title: 438. 找到字符串中所有字母异位词
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "在 s 中找到所有 p 的字母异位词子串的起始索引"
leetcode: 438
studyplan: 滑动窗口与双指针
---

# 438. 找到字符串中所有字母异位词

## 题目描述

给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的**异位词**的子串，返回这些子串的起始索引。

**示例 1：**

```
输入：s = "cbaebabacd", p = "abc"
输出：[0, 6]
```

**示例 2：**

```
输入：s = "abab", p = "ab"
输出：[0, 1, 2]
```

## 解法思路

与 567 题完全相同的思路，定长滑窗 + 计数数组 + `non_zero` 追踪，匹配时记录起始索引。

## 题解

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> list[int]:
        n, m = len(p), len(s)
        if n > m:
            return []

        cnt = [0] * 26
        for c in p:
            cnt[ord(c) - 97] -= 1

        non_zero = sum(1 for v in cnt if v != 0)
        ans = []

        for i, c in enumerate(s):
            idx = ord(c) - 97
            old = cnt[idx]
            cnt[idx] += 1
            if old == 0:
                non_zero += 1
            elif cnt[idx] == 0:
                non_zero -= 1

            if i >= n:
                idx2 = ord(s[i - n]) - 97
                old2 = cnt[idx2]
                cnt[idx2] -= 1
                if old2 == 0:
                    non_zero += 1
                elif cnt[idx2] == 0:
                    non_zero -= 1

            if i >= n - 1 and non_zero == 0:
                ans.append(i - n + 1)

        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
