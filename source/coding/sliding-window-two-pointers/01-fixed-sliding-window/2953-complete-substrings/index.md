---
title: 2953. 统计完全子字符串
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 哈希表
  - 计数
description: "统计完全子字符串个数：每个字符恰好出现 k 次，且相邻字符字母序相差 ≤ 2"
leetcode: 2953
studyplan: 滑动窗口与双指针
---

# 2953. 统计完全子字符串

## 题目描述

如果 `word` 的一个子字符串 `s` 满足：
1. `s` 中每个字符恰好出现 `k` 次
2. `s` 中相邻字符在字母表中的位置相差至多为 2

则称 `s` 为**完全字符串**。返回 `word` 中完全子字符串的数目。

**示例 1：**

```
输入：word = "igigee", k = 2
输出：3
```

**示例 2：**

```
输入：word = "aaabbbccc", k = 3
输出：6
```

## 解法思路

1. 按相邻字符差 ≤ 2 将字符串分割成若干段（完全子字符串不能跨段）
2. 每段内枚举可能的字符种类数 `m`（1 到 26），窗口大小 = `m * k`
3. 定长滑窗维护字符计数，用 `distinct` 和 `valid` 两个变量 O(1) 判断窗口是否满足条件

## 题解

```python
class Solution:
    def countCompleteSubstrings(self, word: str, k: int) -> int:
        n = len(word)
        if n < k:
            return 0

        segments = []
        start = 0
        for i in range(1, n):
            if abs(ord(word[i]) - ord(word[i - 1])) > 2:
                segments.append(word[start:i])
                start = i
        segments.append(word[start:])

        ans = 0
        for seg in segments:
            m = len(seg)
            max_j = min(26, m // k)
            for j in range(1, max_j + 1):
                target = j * k
                cnt = [0] * 26
                valid = 0
                distinct = 0

                for i, ch in enumerate(seg):
                    idx = ord(ch) - 97
                    cnt[idx] += 1
                    if cnt[idx] == 1:
                        distinct += 1
                    if cnt[idx] == k:
                        valid += 1
                    elif cnt[idx] == k + 1:
                        valid -= 1

                    if i >= target:
                        idx2 = ord(seg[i - target]) - 97
                        cnt[idx2] -= 1
                        if cnt[idx2] == 0:
                            distinct -= 1
                        if cnt[idx2] == k:
                            valid += 1
                        elif cnt[idx2] == k - 1:
                            valid -= 1

                    if i >= target - 1 and valid == distinct:
                        ans += 1
        return ans
```

## 复杂度分析

- 时间复杂度：O(26 * n)，每个段最多枚举 26 种窗口大小
- 空间复杂度：O(1)
