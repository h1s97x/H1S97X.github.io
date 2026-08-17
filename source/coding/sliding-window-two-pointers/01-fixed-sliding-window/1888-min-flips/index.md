---
title: 1888. 使二进制字符串字符交替的最少反转次数
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 双倍数组
description: "通过旋转和翻转使二进制字符串交替，求最少翻转次数（定长滑窗 + 双倍数组）"
leetcode: 1888
studyplan: 滑动窗口与双指针
---

# 1888. 使二进制字符串字符交替的最少反转次数

## 题目描述

给你一个二进制字符串 `s`。你可以进行两种操作：
1. 将第一个字符移动到末尾（旋转）
2. 翻转一个字符（0→1 或 1→0）

你可以进行任意次操作 1，然后进行任意次操作 2。求最少操作 2 的次数，使字符串变成交替的（相邻字符不同）。

**示例：**

```
输入：s = "111000"
输出：2

输入：s = "010"
输出：0

输入：s = "1110"
输出：1
```

## 解法思路

构造双倍数组 `s + s`，用定长滑窗扫描长度为 `n` 的所有子串。对于每个窗口，计算两种交替模式所需的翻转次数，取最小值。

## 题解

```python
class Solution:
    def minFlips(self, s: str) -> int:
        n = len(s)
        s2 = s + s
        diff = [0] * (2 * n)
        for i, ch in enumerate(s2):
            target = '0' if i % 2 == 0 else '1'
            diff[i] = 1 if ch != target else 0

        cur = sum(diff[:n])
        ans = n
        for l in range(n):
            flips = cur if l % 2 == 0 else n - cur
            ans = min(ans, flips, n - flips)
            cur += diff[l + n] - diff[l]
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)
