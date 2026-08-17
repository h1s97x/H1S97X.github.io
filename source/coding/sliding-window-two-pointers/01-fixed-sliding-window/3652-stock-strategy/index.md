---
title: 3652. 按策略买卖股票的最佳时机
notebook: coding
tags:
  - 滑动窗口
  - 定长
description: "修改至多一次连续 k 个策略（前 k/2 成持有，后 k/2 成卖出），最大化和"
leetcode: 3652
studyplan: 滑动窗口与双指针
---

# 3652. 按策略买卖股票的最佳时机

## 题目描述

给定 `prices` 数组和 `strategy` 数组（-1 买入，0 持有，1 卖出），可以至多修改一次连续的 `k` 个策略，其中前 `k/2` 个改为 0（持有），后 `k/2` 个改为 1（卖出）。求最大利润。

**示例 1：**

```
输入：prices = [4,2,8], strategy = [-1,0,1], k = 2
输出：10
```

## 解法思路

将问题转化为求最大增量：用定长滑窗扫描所有长度为 `k` 的窗口，计算将该窗口策略修改后的收益增量，取最大值与 0 比较。

## 题解

```python
class Solution:
    def maxProfit(self, prices: list[int], strategy: list[int], k: int) -> int:
        n = len(prices)
        half = k // 2

        base = sum(s * p for s, p in zip(strategy, prices))

        # gain0: strategy[i] → 0 的收益变化
        # gain1: strategy[i] → 1 的收益变化
        gain0 = [-s * p for s, p in zip(strategy, prices)]
        gain1 = [(1 - s) * p for s, p in zip(strategy, prices)]

        sum_first = sum(gain0[:half])
        sum_second = sum(gain1[half:k])
        max_gain = sum_first + sum_second

        for i in range(k, n):
            sum_first += gain0[i - half] - gain0[i - k]
            sum_second += gain1[i] - gain1[i - half]
            max_gain = max(max_gain, sum_first + sum_second)

        return base + max(max_gain, 0)
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)，gain0 和 gain1 数组
