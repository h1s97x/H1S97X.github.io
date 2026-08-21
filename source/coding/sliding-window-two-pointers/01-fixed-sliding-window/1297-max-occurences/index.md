---
title: 1297. 子串的最大出现次数
notebook: coding
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "找到满足最多 maxLetters 个不同字母、长度在 [minSize, maxSize] 的子串的最大出现次数"
leetcode: 1297
studyplan: 滑动窗口与双指针
---

# 1297. 子串的最大出现次数

## 题目描述

给你一个字符串 `s`，以及整数 `maxLetters`、`minSize`、`maxSize`。

找出满足以下条件的任意子串的**最大出现次数**：
- 子串长度在 `[minSize, maxSize]` 之间
- 子串中不同字母的数目不超过 `maxLetters`

**示例 1：**

```
输入：s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
输出：2
```

**示例 2：**

```
输入：s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3
输出：2
```

## 解法思路

**核心观察（关键）**：如果一个长度为 `L > minSize` 的子串在 `s` 中出现了 `k` 次，那么取它的长度为 `minSize` 的**前缀**，该前缀也至少出现 `k` 次（因为它作为子串的每个出现位置，前缀也随之下标对齐出现）。因此，**我们只需要考虑长度为 `minSize` 的子串**，`maxSize` 本质上不起作用。这就把问题从「不定长」收束成「定长滑窗」。

套用定长滑窗（窗长 `minSize`）：用长度 26 的计数数组维护窗口内各字母出现次数，用 `distinct` 维护窗口内不同字母的个数。右端点 `s[i]` 进窗时更新计数；窗口超过 `minSize` 时左端点出窗并更新 `distinct`；一旦窗口长度达到 `minSize` 且 `distinct <= maxLetters`，就用哈希表累加该子串的出现次数。

**逐步举例**（`s="aababcaab", maxLetters=2, minSize=3`）：

只统计长度为 3 的窗口（不同字母数 ≤ 2）：

| 窗口（下标） | 子串 | 不同字母数 | 是否计数 |
|---|---|---|---|
| 0..2 | aab | 2 | ✅ |
| 1..3 | aba | 2 | ✅ |
| 2..4 | bab | 2 | ✅ |
| 3..5 | abc | 3 | ❌ |
| 4..6 | bca | 3 | ❌ |
| 5..7 | caa | 2 | ✅ |
| 6..8 | aab | 2 | ✅ |

- `aab` 出现 2 次、`aba` 1 次、`bab` 1 次、`caa` 1 次 → 最大出现次数 = 2。✓

## 复杂度分析

- 时间复杂度：O(n)，一次遍历。
- 空间复杂度：O(n)，哈希表存储不同子串的计数。

## 代码实现

{% asset_code solution.py %}

{% asset_code solution_test.py %}