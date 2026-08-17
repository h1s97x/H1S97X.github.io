---
title: 3694. 删除子字符串后不同的终点
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "删除长度为 k 的连续子串后，从原点出发执行剩余移动，求不同终点坐标的个数"
leetcode: 3694
studyplan: 滑动窗口与双指针
---

# 3694. 删除子字符串后不同的终点

## 题目描述

给定一个字符串 `s`，由 `'U'`、`'D'`、`'L'`、`'R'` 组成，表示在二维平面上的移动。必须删除恰好一个长度为 `k` 的连续子串，然后从 `(0, 0)` 出发执行剩余移动。求所有可能的终点坐标中，不同坐标的个数。

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

关键观察：删除子串后的终点坐标 = 全部移动的总位移 - 被删除子串的位移。

因此只需用定长滑窗计算所有长度为 `k` 的子串的位移，用集合记录 `总位移 - 窗口位移` 即可。

## 题解

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

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)，集合存储不同终点
