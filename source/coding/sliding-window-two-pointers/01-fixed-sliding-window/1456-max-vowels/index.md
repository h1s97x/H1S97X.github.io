---
title: 1456. 定长子串中元音的最大数目
notebook: coding
tags: [滑动窗口, 定长]
description: "给你字符串 s 和整数 k，找到长度为 k 的子串中元音字母的最大数目"
leetcode: 1456
studyplan: 滑动窗口与双指针
---

# 1456. 定长子串中元音的最大数目

## 题目描述

给你字符串 `s` 和整数 `k`。

请你在字符串 `s` 中找到长度为 `k` 的**子串**，使得子串中元音字母（`a, e, i, o, u`）的数目最大，并返回该最大值。

**示例 1：**

```
输入：s = "abciiidef", k = 3
输出：3
解释：子串 "iii" 包含 3 个元音字母。
```

**示例 2：**

```
输入：s = "aeiou", k = 2
输出：2
解释：任意长度为 2 的子串都包含 2 个元音字母。
```

**示例 3：**

```
输入：s = "leetcode", k = 3
输出：2
解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
```

**提示：**

- `1 <= s.length <= 10^5`
- `s` 由小写英文字母组成
- `1 <= k <= s.length`

## 解法思路

定长滑动窗口模板：

1. 先统计第一个窗口 `[0, k)` 的元音数
2. 向右滑动窗口，每次加入 `s[i]`，移除 `s[i-k]`
3. 更新最大值

## 题解

```python
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowels = set("aeiou")
        # 统计第一个窗口
        cur = sum(1 for c in s[:k] if c in vowels)
        ans = cur
        # 滑动窗口
        for i in range(k, len(s)):
            cur += (s[i] in vowels) - (s[i - k] in vowels)
            if cur > ans:
                ans = cur
        return ans
```