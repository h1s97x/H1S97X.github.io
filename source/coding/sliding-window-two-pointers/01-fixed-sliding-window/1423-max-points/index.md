---
title: 1423. 可获得的最大点数
notebook: coding
tags: [滑动窗口, 定长]
description: "从数组两端取 k 张牌，求最大点数"
leetcode: 1423
studyplan: 滑动窗口与双指针
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

从两端取 k 张 = 从中间留 n-k 张。用定长滑动窗口找长度为 n-k 的最小和子数组，总点数减去它即为答案。

## 题解

```python
class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
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