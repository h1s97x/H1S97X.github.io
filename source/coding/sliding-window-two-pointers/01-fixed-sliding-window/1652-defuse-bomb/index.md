---
title: 1652. 拆炸弹
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 环形数组
description: "环形数组中，每个元素替换为后/前 k 个元素之和（O(n) 定长滑窗）"
leetcode: 1652
studyplan: 滑动窗口与双指针
---

# 1652. 拆炸弹

## 题目描述

你有一个炸弹需要拆除，时间紧迫！给你一个下标从 0 开始的整数数组 `code` 和一个密钥 `k`。

解密规则：
- 如果 `k > 0`，将第 `i` 个数字替换为它后面 `k` 个数字之和
- 如果 `k < 0`，将第 `i` 个数字替换为它前面 `k` 个数字之和
- 如果 `k == 0`，将第 `i` 个数字替换为 0

**示例 1：**

```
输入：code = [5,7,1,4], k = 3
输出：[12,10,16,13]
```

**示例 2：**

```
输入：code = [1,2,3,4], k = 0
输出：[0,0,0,0]
```

## 解法思路

定长滑窗，窗口大小 = `abs(k)`。k > 0 时窗口从 `code[1]` 开始，k < 0 时从 `code[n-|k|]` 开始。用取模处理环形。

## 题解

```python
class Solution:
    def decrypt(self, code: list[int], k: int) -> list[int]:
        n = len(code)
        if k == 0:
            return [0] * n

        m = abs(k)
        start = 1 if k > 0 else n - m
        cur = sum(code[start:start + m])
        ans = [0] * n
        ans[0] = cur

        for i in range(1, n):
            cur -= code[(start + i - 1) % n]
            cur += code[(start + i + m - 1) % n]
            ans[i] = cur

        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)，结果数组
