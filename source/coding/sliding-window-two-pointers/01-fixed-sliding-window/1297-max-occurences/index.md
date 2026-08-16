---
title: 1297. 子串的最大出现次数
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "找到满足最多 maxLetters 个不同字母、长度在 [minSize, maxSize] 的子串的最大出现次数"
leetcode: 1297
studyplan: 滑动窗口与双指针
---

# 1297. 子串的最大出现次数

## 题目描述

给你一个字符串 `s`，以及整数 `maxLetters`、`minSize`、`maxSize`。

找出满足以下条件的任意子串的**最大出现次数**：
- 子串长度在 `[minSize, maxSize]` 之间
- 子串中不同字母的数目不超过 `maxLetters`

**示例 1：**

```
输入：s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
输出：2
```

**示例 2：**

```
输入：s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3
输出：2
```

## 解法思路

核心观察：若一个长度为 `L > minSize` 的子串出现 `k` 次，则它的长度为 `minSize` 的前缀也至少出现 `k` 次。因此只需考虑长度为 `minSize` 的子串。

定长滑窗扫描，维护窗口内不同字母数，满足条件时用哈希表计数。

## 题解

```python
class Solution:
    def maxFreq(self, s: str, maxLetters: int, minSize: int, maxSize: int) -> int:
        cnt = [0] * 26
        distinct = 0
        freq = {}

        for i, c in enumerate(s):
            idx = ord(c) - 97
            if cnt[idx] == 0:
                distinct += 1
            cnt[idx] += 1

            if i >= minSize:
                idx2 = ord(s[i - minSize]) - 97
                cnt[idx2] -= 1
                if cnt[idx2] == 0:
                    distinct -= 1

            if i >= minSize - 1 and distinct <= maxLetters:
                sub = s[i - minSize + 1:i + 1]
                freq[sub] = freq.get(sub, 0) + 1

        return max(freq.values()) if freq else 0
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)，哈希表存储子串
