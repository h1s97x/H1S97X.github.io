---
title: 3679. 使库存平衡的最少丢弃次数
notebook: coding
tags:
  - 滑动窗口
  - 定长
description: "每个 w 天窗口中每种类型最多出现 m 次，求最少丢弃数"
leetcode: 3679
studyplan: 滑动窗口与双指针
---

# 3679. 使库存平衡的最少丢弃次数

## 题目描述

给你两个整数 `w` 和 `m`，以及一个整数数组 `arrivals`，其中 `arrivals[i]` 表示第 `i` 天到达的物品类型。

对于每一天 `i`，考虑天数范围为 `[max(1, i - w + 1), i]`（最近的 w 天）。在任何这样的时间窗口中，每种类型最多只能出现 `m` 次。

返回最少需要丢弃的物品数量。

**示例 1：**

```
输入：arrivals = [1,2,1,3,1], w = 4, m = 2
输出：0
```

**示例 2：**

```
输入：arrivals = [1,2,3,3,3,4], w = 3, m = 2
输出：1
```

## 解法思路

定长滑窗。维护窗口内各类型的计数，对于每个新到达的物品：

1. 如果 `i >= w`，将窗口左端移出（`cnt[arrivals[i-w]]--`）
2. 如果当前类型的计数 `>= m`，则必须丢弃（`ans++`）
3. 否则保留（`cnt[x]++`）

## 题解

```python
class Solution:
    def minArrivalsToDiscard(self, arrivals: list[int], w: int, m: int) -> int:
        max_val = max(arrivals)
        cnt = [0] * (max_val + 1)

        ans = 0
        for i, x in enumerate(arrivals):
            if i >= w:
                cnt[arrivals[i - w]] -= 1

            if cnt[x] >= m:
                ans += 1
            else:
                cnt[x] += 1

        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(U)，U 为物品类型最大值