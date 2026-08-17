---
title: 2379. 得到 K 个黑块的最少涂色次数
notebook: coding
tags: [滑动窗口, 定长]
description: "将包含 W/B 的字符串中连续 k 个字符全变为 B 的最小涂色次数"
leetcode: 2379
studyplan: 滑动窗口与双指针
---

# 2379. 得到 K 个黑块的最少涂色次数

## 题目描述

给你一个长度为 `n` 的字符串 `blocks`，其中 `blocks[i]` 是 `'W'` 或 `'B'`，表示第 i 块的颜色。字符 `'W'` 表示白色，`'B'` 表示黑色。

给你一个整数 `k`，表示想要**连续** `k` 个黑块。每次操作可以将一个白块涂成黑块。

返回最少操作次数。

**示例 1：**

```
输入：blocks = "WBBWWBBWBW", k = 7
输出：3
```

**示例 2：**

```
输入：blocks = "WBWBBBW", k = 2
输出：0
```

**提示：**

- `n == blocks.length`
- `1 <= k <= n <= 100`

## 解法思路

定长滑动窗口。窗口大小 k，统计窗口内白色块的数量，取最小值。

## 题解

```python
class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        cur = blocks[:k].count('W')
        ans = cur
        for i in range(k, len(blocks)):
            cur += (blocks[i] == 'W') - (blocks[i - k] == 'W')
            if cur < ans:
                ans = cur
        return ans
```