---
title: 30. 串联所有单词的子串
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "在 s 中找到所有由 words 中每个单词恰好一次串联而成的子串的起始索引"
leetcode: 30
studyplan: 滑动窗口与双指针
---

# 30. 串联所有单词的子串

## 题目描述

给定一个字符串 `s` 和一个字符串数组 `words`，`words` 中所有字符串长度相同。在 `s` 中找出所有子串的起始索引，这些子串是 `words` 中每个单词恰好一次串联而成（无间隔）。

**示例 1：**

```
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
```

**示例 2：**

```
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]
```

## 解法思路

固定单词长度 `word_len`，按偏移量 `0..word_len-1` 分组滑窗。每组内维护计数哈希表和 `valid` 变量，遇到不在 words 中的单词时重置窗口。

## 题解

```python
class Solution:
    def findSubstring(self, s: str, words: list[str]) -> list[int]:
        word_len = len(words[0])
        word_count = len(words)
        total_len = word_len * word_count
        n = len(s)
        if n < total_len:
            return []

        target = {}
        for w in words:
            target[w] = target.get(w, 0) + 1

        ans = []
        for offset in range(word_len):
            left = offset
            cur = {}
            valid = 0
            for right in range(offset, n - word_len + 1, word_len):
                w = s[right:right + word_len]
                if w in target:
                    cur[w] = cur.get(w, 0) + 1
                    if cur[w] == target[w]:
                        valid += 1
                else:
                    cur.clear()
                    valid = 0
                    left = right + word_len
                    continue

                while right - left + word_len > total_len:
                    w_left = s[left:left + word_len]
                    if cur[w_left] == target[w_left]:
                        valid -= 1
                    cur[w_left] -= 1
                    left += word_len

                if valid == len(target):
                    ans.append(left)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n * word_len)，每个偏移量组遍历一次
- 空间复杂度：O(n)，哈希表存储单词计数
