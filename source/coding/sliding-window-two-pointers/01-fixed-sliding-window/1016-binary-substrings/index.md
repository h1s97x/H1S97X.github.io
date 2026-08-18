---
title: 1016. 子串能表示从 1 到 N 数字的二进制串
notebook: coding
tags:
  - 滑动窗口
  - 位运算
  - 哈希表
  - 字符串
description: "检查二进制串 s 是否包含 [1, n] 所有整数的二进制表示"
leetcode: 1016
studyplan: 滑动窗口与双指针
---

# 1016. 子串能表示从 1 到 N 数字的二进制串

## 题目描述

给定一个二进制字符串 `s` 和一个正整数 `n`，如果对于 `[1, n]` 范围内的每个整数，其二进制表示都是 `s` 的子字符串，就返回 `true`，否则返回 `false`。

**示例 1：**

```
输入：s = "0110", n = 3
输出：true
```

**示例 2：**

```
输入：s = "0110", n = 4
输出：false
```

## 解法思路

枚举 s 的所有子串（长度不超过 30，因为 10^9 < 2^30），转为整数存入哈希集合。由于 s 长度 ≤ 1000，最多有 30000 个不同子串，若 n > 30000 可直接返回 false。否则遍历 [1, n] 检查每个数是否在集合中。

## 题解

```python
class Solution:
    def queryString(self, s: str, n: int) -> bool:
        m = len(s)
        max_possible = m * 30
        if n > max_possible:
            return False

        seen = set()
        for i in range(m):
            val = 0
            for j in range(i, min(i + 30, m)):
                val = (val << 1) | (ord(s[j]) - 48)
                if val > n:
                    break
                if val > 0:
                    seen.add(val)

        for i in range(1, n + 1):
            if i not in seen:
                return False
        return True
```

## 复杂度分析

- 时间复杂度：O(m * 30 + n)，m ≤ 1000，n 较大时因剪枝快速返回 false
- 空间复杂度：O(m * 30)