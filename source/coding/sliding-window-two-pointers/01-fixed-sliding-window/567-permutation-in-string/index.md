---
title: 567. 字符串的排列
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "判断 s2 是否包含 s1 的排列（定长滑动窗口 + 计数数组）"
leetcode: 567
studyplan: 滑动窗口与双指针
---

# 567. 字符串的排列

## 题目描述

给你两个字符串 `s1` 和 `s2`，判断 `s2` 是否包含 `s1` 的排列。

**示例 1：**

```
输入：s1 = "ab", s2 = "eidbaooo"
输出：true
```

**示例 2：**

```
输入：s1 = "ab", s2 = "eidboaoo"
输出：false
```

## 解法思路

定长滑窗，窗口大小固定为 `len(s1)`。用计数数组维护窗口内字符频次与 s1 的差值，通过 `non_zero` 变量追踪有多少个字符的计数未归零，O(1) 时间判断是否匹配。

## 题解

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        n, m = len(s1), len(s2)
        if n > m:
            return False

        cnt = [0] * 26
        for c in s1:
            cnt[ord(c) - 97] -= 1

        non_zero = sum(1 for v in cnt if v != 0)

        for i, c in enumerate(s2):
            idx = ord(c) - 97
            old = cnt[idx]
            cnt[idx] += 1
            if old == 0:
                non_zero += 1
            elif cnt[idx] == 0:
                non_zero -= 1

            if i >= n:
                idx2 = ord(s2[i - n]) - 97
                old2 = cnt[idx2]
                cnt[idx2] -= 1
                if old2 == 0:
                    non_zero += 1
                elif cnt[idx2] == 0:
                    non_zero -= 1

            if i >= n - 1 and non_zero == 0:
                return True
        return False
```

## 复杂度分析

- 时间复杂度：O(n)，n = len(s2)
- 空间复杂度：O(1)，固定 26 长度计数数组
