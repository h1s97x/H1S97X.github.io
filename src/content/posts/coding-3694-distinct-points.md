---
title: 3694. 删除子字符串后不同的终点
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "删除长度为 k 的连续子串后，从原点出发执行剩余移动，求不同终点坐标的个数"
leetcode: 3694
studyplan: 滑动窗口与双指针
published: 2026-08-17T09:24:41+08:00
updated: 2026-08-17T09:24:41+08:00
category: 题解
notebook: coding
---


# 3694. 删除子字符串后不同的终点

## 题目描述

给定一个由 `'U'`、`'D'`、`'L'`、`'R'` 组成的字符串 `s`，表示在二维平面上的移动（上/下/左/右一步）。必须删除恰好一个长度为 `k` 的连续子串，然后从 `(0,0)` 出发执行剩余的移动。求所有可能终点坐标中，不同坐标的个数。

**示例 1：**

```
输入：s = "LUL", k = 1
输出：2
```

**示例 2：**

```
输入：s = "UDLR", k = 4
输出：1
```

## 解法思路

**核心恒等式**：删除子串后的终点 = **总位移 − 被删除子串的位移**（向量减法）。

- 先一趟遍历求出整条路径的总位移 `(total_x, total_y)`。
- 再枚举所有长度为 `k` 的**连续子串**，用定长滑窗算出每个子串的位移 `(win_x, win_y)`。
- 每次用删除该子串后的终点 `(total_x - win_x, total_y - win_y)` 加入集合。
- 最终集合大小即不同终点个数。

沿用 **入-更新-出**：右端点 `i` 的位移入窗、够 `k` 个时用集合记录、左端点 `i-k` 的位移出窗。

**逐步举例**（`s="LUL"`, `k=1`）：

设 `L=(-1,0)`, `U=(0,1)`, `R=(1,0)`, `D=(0,-1)`。

- 总位移 `total = L+U+L = (-1,0)+(0,1)+(-1,0) = (-2,1)`。
- 枚举每个 `k=1` 子串（即单个字符被删除）：

| 删除字符 | 窗口位移 (win) | 终点 = total − win |
|---|---|---|
| s[0]=L | (-1,0) | (-2,1)−(-1,0) = (-1,1) |
| s[1]=U | (0,1) | (-2,1)−(0,1) = (-2,0) |
| s[2]=L | (-1,0) | (-2,1)−(-1,0) = (-1,1) |

- 不同终点 = `{(-1,1), (-2,0)}`，共 **2** 个，与预期一致。

## 复杂度分析

- 时间复杂度：O(n)，一次遍历计算总位移，一次滑窗。
- 空间复杂度：O(n)，集合存储不同终点。

## 代码实现

```python
class Solution:
    def distinctPoints(self, s: str, k: int) -> int:
        DIR = {'U': (0, 1), 'D': (0, -1), 'L': (-1, 0), 'R': (1, 0)}

        total_x = total_y = 0
        for ch in s:
            dx, dy = DIR[ch]
            total_x += dx
            total_y += dy

        win_x = win_y = 0
        points = set()
        n = len(s)

        for i, ch in enumerate(s):
            dx, dy = DIR[ch]
            win_x += dx
            win_y += dy

            if i >= k:
                pdx, pdy = DIR[s[i - k]]
                win_x -= pdx
                win_y -= pdy

            if i >= k - 1:
                points.add((total_x - win_x, total_y - win_y))

        return len(points)
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestDistinctPoints(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.distinctPoints("LUL", 1), 2)

    def test_example2(self):
        self.assertEqual(self.solution.distinctPoints("UDLR", 4), 1)

    def test_example3(self):
        self.assertEqual(self.solution.distinctPoints("UU", 1), 1)

    def test_all_same(self):
        self.assertEqual(self.solution.distinctPoints("RRRR", 2), 1)

    def test_k_equals_n(self):
        self.assertEqual(self.solution.distinctPoints("RL", 2), 1)

    def test_cyclic(self):
        self.assertEqual(self.solution.distinctPoints("RLRU", 2), 2)

    def test_no_overlap(self):
        self.assertEqual(self.solution.distinctPoints("URDL", 2), 3)


if __name__ == "__main__":
    unittest.main()
```