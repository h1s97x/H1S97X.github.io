---
title: 2156. 查找给定哈希值的子串
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 滚动哈希
description: "返回 s 中第一个长度为 k 且哈希值等于 hashValue 的子串（反向滑动窗口）"
leetcode: 2156
studyplan: 滑动窗口与双指针
---

# 2156. 查找给定哈希值的子串

## 题目描述

给定整数 `power` 和 `modulo`，字符串哈希定义为：
`hash = (val(s[0]) * p^0 + val(s[1]) * p^1 + ... + val(s[k-1]) * p^(k-1)) mod m`

返回 `s` 中第一个长度为 `k` 且哈希值等于 `hashValue` 的子串。

**示例：**

```
输入：s = "leetcode", power = 7, modulo = 20, k = 2, hashValue = 0
输出："ee"
```

## 解法思路

正向滑动窗口需要除法（求逆元），在模数非质数时不可行。改用**反向滑动窗口**：从右向左计算窗口哈希，每次移除右侧字符、添加左侧字符，只需乘法和加减法。

## 题解

```python
class Solution:
    def subStrHash(self, s: str, power: int, modulo: int, k: int, hashValue: int) -> str:
        n = len(s)
        val = lambda i: ord(s[i]) - 96

        curr = 0
        for i in range(n - 1, n - k - 1, -1):
            curr = (curr * power + val(i)) % modulo

        ans = n - k
        if curr == hashValue:
            ans = n - k

        msb = pow(power, k - 1, modulo)

        for i in range(n - 1, k - 1, -1):
            curr = ((curr - val(i) * msb) * power + val(i - k)) % modulo
            if curr == hashValue:
                ans = i - k

        return s[ans:ans + k]
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
