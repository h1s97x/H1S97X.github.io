---
title: 3679. 使库存平衡的最少丢弃次数
tags:
  - 滑动窗口
  - 定长
description: "每个 w 天窗口中每种类型最多出现 m 次，求最少丢弃数"
leetcode: 3679
studyplan: 滑动窗口与双指针
published: 2026-08-17T09:20:26+08:00
updated: 2026-08-17T09:20:26+08:00
category: 题解
notebook: coding
---


# 3679. 使库存平衡的最少丢弃次数

## 题目描述

给你两个整数 `w` 和 `m`，以及一个整数数组 `arrivals`，其中 `arrivals[i]` 表示第 `i` 天到达的物品类型。

对每一天 `i`，考虑天数范围 `[max(0, i-w+1), i]`（最近的 `w` 天）：在该任意长度不超过 `w` 的时间窗口内，每种物品类型最多只能出现 `m` 次。返回最少需要丢弃的物品数量，使条件成立。

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

**核心**：每天按顺序处理一个到达的物品，用定长窗口（大小 `w`）维护"当前约束窗口内各类型的出现次数"。关键观察：**必须保证窗口内任意类型出现次数 ≤ m**，超出的物品直接丢弃，因为它无论如何都满足不了条件（它及其同类型的 m+1 个物品在一个窗口内必然超过 m）。

沿用 **入-更新-出** 三步（窗口大小 `w`）：

1. **出**：先把离开窗口（`i-w`）的物品类型计数减 1（`cnt[x]` 为各类型在窗口内的出现次数）。
2. **入/决策**：处理第 `i` 天的物品 `x`：
   - 若窗口内 `cnt[x]` 已等于 `m`，说明再加就超限，**必须丢弃** → `ans++`，且不计入 `cnt`（丢弃品不占用窗口计数）。
   - 否则保留 → `cnt[x] += 1`。

复杂度 O(n)，空间 O(U)（`U` 为类型最大值）。

**逐步举例**（`arrivals=[1,2,3,3,3,4]`, `w=3`, `m=2`）：

| i | 出窗类型 | 到达类型 x | 窗口内 cnt[x] | 决策 | cnt | ans |
|---|---|---|---|---|---|---|
| 0 | — | 1 | 0 | 保留 | 1:1 | 0 |
| 1 | — | 2 | 0 | 保留 | 2:1 | 0 |
| 2 | — | 3 | 0 | 保留 | 3:1 | 0 |
| 3 | 1(→0) | 3 | 1 | 保留 | 3:2 | 0 |
| 4 | 2(→0) | 3 | 2 | **丢弃** | 3:2 | 1 |
| 5 | 3(→1) | 4 | 0 | 保留 | 4:1 | 1 |

最终 `ans = 1`，与预期一致。

## 复杂度分析

- 时间复杂度：O(n)，一次遍历。
- 空间复杂度：O(U)，`U = max(arrivals)`。

## 代码实现

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

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMinArrivalsToDiscard(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        arrivals = [1, 2, 1, 3, 1]
        w = 4
        m = 2
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 0)

    def test_example2(self):
        arrivals = [1, 2, 3, 3, 3, 4]
        w = 3
        m = 2
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 1)

    def test_all_same_type(self):
        arrivals = [1, 1, 1, 1, 1]
        w = 3
        m = 2
        # i=0: keep 1, cnt[1]=1
        # i=1: keep 1, cnt[1]=2
        # i=2: keep 1, cnt[1]=3 → wait, remove i=0? no, i=2 < w=3
        # Actually i=0,1,2: no removal yet. cnt[1]=3 > m=2 at i=2? No, at i=0 cnt=1, i=1 cnt=2, i=2 cnt=3 - but i=2 < w=3 so no removal
        # At i=2: cnt[1]=2 before adding, so cnt[1] < m=2? No, cnt[1]=2 which is not < 2, so cnt[1] >= m, discard
        # Hmm, let me re-trace
        # i=0: cnt[1]=0 < 2, keep, cnt[1]=1
        # i=1: cnt[1]=1 < 2, keep, cnt[1]=2
        # i=2: cnt[1]=2 >= 2, discard, ans=1
        # i=3: remove i=0 (1), cnt[1]=1. cnt[1]=1 < 2, keep, cnt[1]=2
        # i=4: remove i=1 (1), cnt[1]=1. cnt[1]=1 < 2, keep, cnt[1]=2
        # ans=1
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 1)

    def test_w_equals_one(self):
        arrivals = [1, 2, 1, 2]
        w = 1
        m = 1
        # Each window is just the current day, so each type can appear at most once
        # i=0: keep 1, cnt[1]=1
        # i=1: remove i=-1? no. cnt[2]=0 < 1, keep, cnt[2]=1
        # i=2: remove i=1 (2), cnt[2]=0. cnt[1]=0 < 1, keep, cnt[1]=1
        # i=3: remove i=2 (1), cnt[1]=0. cnt[2]=0 < 1, keep, cnt[2]=1
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 0)

    def test_all_discard(self):
        arrivals = [1, 1, 1]
        w = 2
        m = 1
        # i=0: keep 1, cnt[1]=1
        # i=1: cnt[1]=1 >= 1, discard, ans=1
        # i=2: remove i=0 (1), cnt[1]=0. cnt[1]=0 < 1, keep, cnt[1]=1
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 1)

    def test_large_m(self):
        arrivals = [1, 2, 3, 4, 5]
        w = 5
        m = 10
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 0)


if __name__ == "__main__":
    unittest.main()
```