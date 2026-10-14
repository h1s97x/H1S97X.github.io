---
title: 3652. 按策略买卖股票的最佳时机
tags:
  - 滑动窗口
  - 定长
description: "修改至多一次连续 k 个策略（前 k/2 成持有，后 k/2 成卖出），最大化和"
leetcode: 3652
studyplan: 滑动窗口与双指针
published: 2026-08-17T09:26:35+08:00
updated: 2026-08-17T09:26:35+08:00
category: 题解
notebook: coding
---


# 3652. 按策略买卖股票的最佳时机

## 题目描述

给定 `prices` 数组和 `strategy` 数组（`-1` 买入，`0` 持有，`1` 卖出）。可以**至多一次**将连续的 `k` 个策略改为：前 `k/2` 个变为 `0`（持有）、后 `k/2` 个变为 `1`（卖出）。求可得到的最大利润。

**示例 ：**

```
输入：prices = [4,2,8], strategy = [-1,0,1], k = 2
输出：10
```

## 解法思路

**核心思路：基础收益 + 增量。**

先算出**不修改策略**时的基础收益：`base = Σ strategy[i] * prices[i]`（`-1` 买入记 `-prices`，`1` 卖出记 `+prices`，`0` 记 0）。

若把下标 `i` 的策略改成目标值，收益会变化，定义两种增量：
- `gain0[i]`：把 `strategy[i]` 改成 `0`（持有）的**收益增量** = `0 − strategy[i]·prices[i] = -strategy[i]·prices[i]`
- `gain1[i]`：把 `strategy[i]` 改成 `1`（卖出）的**收益增量** = `prices[i] − strategy[i]·prices[i] = (1 - strategy[i])·prices[i]`

一次修改覆盖长度为 `k` 的连续窗口，其中**前 `half=k/2` 个改成 0（用 `gain0`）、后 `k/2` 个改成 1（用 `gain1`）**。于是问题转为：找长度为 `k` 的窗口，最大化「前半 `gain0` 之和 + 后半 `gain1` 之和」这个增量。

这正是**定长滑窗**：分别用两个窗长 `half` 的增量数组 `sum_first`（最左 `half` 个）和 `sum_second`（窗口右半 `half` 个）同步平移。最终答案 = `base + max(最大增量, 0)`（可以不修改，故增量下限为 0）。

**逐步举例**（`prices=[4,2,8], strategy=[-1,0,1], k=2`）：

- `base = -1·4 + 0·2 + 1·8 = 4`
- `gain0 = [4, 0, -8]`（改成 0 的增量）
- `gain1 = [8, 2, 0]`（改成 1 的增量）
- `half = 1`。初始窗口：`sum_first = gain0[0] = 4`，`sum_second = gain1[1] = 2`，增量 = 6。
- 解释：修改窗口 `[0,1]` → 策略变 `[0,1,1]`，收益 = `0·4 + 1·2 + 1·8 = 10`，增量 = `10 − 4 = 6` ✓
- 取 `max(6, 0)=6`，`ans = 4 + 6 = 10`。

## 复杂度分析

- 时间复杂度：O(n)，一次滑动。
- 空间复杂度：O(n)，`gain0` 与 `gain1` 数组。

## 代码实现

```python
class Solution:
    def maxProfit(self, prices: list[int], strategy: list[int], k: int) -> int:
        n = len(prices)
        half = k // 2

        base = 0
        gain0 = [0] * n
        gain1 = [0] * n
        for i in range(n):
            base += strategy[i] * prices[i]
            gain0[i] = -strategy[i] * prices[i]
            gain1[i] = (1 - strategy[i]) * prices[i]

        sum_first = sum(gain0[:half])
        sum_second = sum(gain1[half:k])
        max_gain = sum_first + sum_second

        for i in range(k, n):
            sum_first += gain0[i - half] - gain0[i - k]
            sum_second += gain1[i] - gain1[i - half]
            cur = sum_first + sum_second
            if cur > max_gain:
                max_gain = cur

        return base + max(max_gain, 0)
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMaxProfit(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxProfit([4, 2, 8], [-1, 0, 1], 2), 10)

    def test_example2(self):
        self.assertEqual(self.solution.maxProfit([5, 4, 3], [1, 1, 0], 2), 9)

    def test_no_modification_needed(self):
        self.assertEqual(self.solution.maxProfit([3, 5, 2], [1, 1, 1], 2), 10)

    def test_all_buy_then_sell(self):
        self.assertEqual(self.solution.maxProfit([1, 2, 3, 4], [-1, -1, 1, 1], 2), 9)

    def test_k_equals_n(self):
        self.assertEqual(self.solution.maxProfit([1, 2], [-1, 1], 2), 2)

    def test_no_modification(self):
        prices = [10, 5, 15]
        strategy = [1, 1, 1]
        k = 2
        self.assertEqual(self.solution.maxProfit(prices, strategy, k), 30)


if __name__ == "__main__":
    unittest.main()
```