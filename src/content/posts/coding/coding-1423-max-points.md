---
title: 1423. 可获得的最大点数
tags: [滑动窗口, 定长]
description: "从数组两端取 k 张牌，求最大点数"
leetcode: 1423
studyplan: 滑动窗口与双指针
published: 2026-08-16T22:48:35+08:00
updated: 2026-08-16T22:48:35+08:00
category: 题解
notebook: coding
---


# 1423. 可获得的最大点数

## 题目描述

几张卡牌排成一行，每张卡牌都有一个对应的点数。点数由整数数组 `cardPoints` 给出。

每次行动，你可以从行的开头或末尾拿一张卡牌，最终你必须正好拿 `k` 张卡牌。

返回你可以获得的最大点数。

**示例 1：**

```
输入：cardPoints = [1,2,3,4,5,6,1], k = 3
输出：12
解释：第一次行动拿末尾的 1，之后拿开头前 2 张，总点数为 1+6+5 = 12。
```

**示例 2：**

```
输入：cardPoints = [2,2,2], k = 2
输出：4
```

**提示：**

- `1 <= cardPoints.length <= 10^5`
- `1 <= cardPoints[i] <= 10^4`
- `1 <= k <= cardPoints.length`

## 解法思路

**核心转化**：直接从两端取 k 张牌不好维护；换个角度，**从两端取走 k 张，剩下的 n - k 张必然是数组中间一段连续的子数组**。

要拿到的点数最大，等价于：让**留在中间那 n - k 张牌的点数总和最小**。于是问题变成「找到长度为 n - k 的连续子数组中，和最小的那个」。

设 `total = sum(cardPoints)`，只需求出最小窗口和 `min_sum`：
$$
\text{ans} = total - \min\_{\text{window}}(n-k \text{ 长度子数组和})
$$

用**定长滑动窗口**求长度 `m = n - k` 的子数组最小和：

1. 先求前 m 个元素的和作为窗口初值；
2. 向右滑动，每步 `cur += cardPoints[i] - cardPoints[i - m]`，即加入右端点、移除左端点；
3. 用 `cur` 更新 `min_sum`。

**边界**：当 `k == n` 时 `m == 0`，直接返回 `total`。

**逐步举例**（`cardPoints = [1,2,3,4,5,6,1]`, `k = 3`）。`n = 7`，取走 3 张后中间留 `m = 4` 张。求长 4 子数组的最小和：

| 留中的窗口 | 和 |
|---|---|
| [1,2,3,4] | 10 |
| [2,3,4,5] | 14 |
| [3,4,5,6] | 18 |
| [4,5,6,1] | 16 |

留中最小和 `min_sum = 10`（即留下 `[1,2,3,4]`，从末尾拿走 `5,6,1`），故 `ans = total - min_sum = 22 - 10 = 12`。而题目示例最优正是拿末尾的 `1`、`6`、`5` 得 `1+6+5=12`，与"留中最小 ⟺ 两端最大"完全吻合。

> 这套「正难则反」的转化是灵茶山艾府 1423 题解的核心思路：取两端 ⟺ 留中间。

## 复杂度分析

- 时间复杂度：O(n)，一次遍历。
- 空间复杂度：O(1)。

## 代码实现

```python
class Solution:
    def maxScore(self, cardPoints: list[int], k: int) -> int:
        n = len(cardPoints)
        total = sum(cardPoints)
        if k == n:
            return total
        m = n - k
        cur = sum(cardPoints[:m])
        min_sum = cur
        for i in range(m, n):
            cur += cardPoints[i] - cardPoints[i - m]
            if cur < min_sum:
                min_sum = cur
        return total - min_sum
```

```python
import unittest


class TestMaxScore(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxScore([1, 2, 3, 4, 5, 6, 1], 3), 12)

    def test_example2(self):
        self.assertEqual(self.solution.maxScore([2, 2, 2], 2), 4)

    def test_take_all(self):
        self.assertEqual(self.solution.maxScore([1, 2, 3], 3), 6)


if __name__ == "__main__":
    unittest.main()
```