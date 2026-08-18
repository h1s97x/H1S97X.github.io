---
title: 1461. 检查一个字符串是否包含所有长度为 K 的二进制子串
notebook: coding
tags:
  - 滑动窗口
  - 位运算
  - 哈希表
description: "检查二进制串 s 是否包含所有长度为 k 的二进制子串"
leetcode: 1461
studyplan: 滑动窗口与双指针
---

# 1461. 检查一个字符串是否包含所有长度为 K 的二进制子串

## 题目描述

给你一个二进制字符串 `s` 和一个整数 `k`。如果所有长度为 `k` 的二进制字符串都是 `s` 的子串，请返回 `true`，否则返回 `false`。

**示例 1：**

```
输入：s = "00110110", k = 2
输出：true
```

**示例 2：**

```
输入：s = "0110", k = 1
输出：true
```

**示例 3：**

```
输入：s = "0110", k = 2
输出：false
```

## 解法思路

长度为 k 的二进制串共有 2^k 个。用定长滑动窗口遍历 s，将每个窗口内的二进制串转为整数，存入布尔数组。最后检查是否所有 2^k 个值都已出现。

位运算优化：维护窗口值 `val`，每次左移 1 位并或上新字符，用 `mask = 2^k - 1` 截断。

## 题解

```python
class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        need = 1 << k
        seen = [False] * need
        mask = need - 1
        val = 0
        for i, ch in enumerate(s):
            val = ((val << 1) | (ord(ch) - 48)) & mask
            if i >= k - 1:
                seen[val] = True
        return all(seen)
```

## 复杂度分析

- 时间复杂度：O(n)，其中 n 是 s 的长度
- 空间复杂度：O(2^k)，k ≤ 20 时最多 2^20 ≈ 10^6 个布尔值