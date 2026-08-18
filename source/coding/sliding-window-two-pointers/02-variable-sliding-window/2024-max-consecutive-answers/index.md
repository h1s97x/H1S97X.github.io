---
title: 2024. 考试的最大困扰度
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 字符串
description: "最多修改 k 次，求最长连续相同字符子串的长度"
leetcode: 2024
studyplan: 滑动窗口与双指针
---

# 2024. 考试的最大困扰度

## 题目描述

一位老师正在出一场由 n 道判断题构成的考试，每道题的答案为 'T' 或 'F'。你可以进行最多 k 次操作，每次操作将一道题的答案改为 'T' 或 'F'。求在不超过 k 次操作的情况下，最大连续相同结果的题数。

## 解法思路

等价于求最长子串，使得子串中 'T' 和 'F' 的个数不能同时超过 k。因为如果其中一种字符的个数 ≤ k，我们就可以通过修改使其全部变成另一种字符。

不定长滑动窗口，维护窗口内 T 和 F 的计数，当两者都 > k 时收缩左边界。

## 题解

```python
class Solution:
    def maxConsecutiveAnswers(self, answerKey: str, k: int) -> int:
        ans = left = cntT = cntF = 0
        for right, c in enumerate(answerKey):
            if c == 'T':
                cntT += 1
            else:
                cntF += 1
            while cntT > k and cntF > k:
                if answerKey[left] == 'T':
                    cntT -= 1
                else:
                    cntF -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)