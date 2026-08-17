---
title: 2413. 最小偶倍数
notebook: coding
tags: [入门, 条件判断]
description: "给你一个正整数 n，返回 2 和 n 的最小公倍数"
leetcode: 2413
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个正整数 `n` ，返回 `2` 和 `n` 的最小公倍数（正整数）。

<https://leetcode.cn/problems/smallest-even-multiple/description/>

**示例 1：**

> 输入：n = 5
> 输出：10
> 解释：5 和 2 的最小公倍数是 10。

**示例 2：**

> 输入：n = 6
> 输出：6
> 解释：6 和 2 的最小公倍数是 6。注意数字会是它自身的倍数。

**约束：**

- `1 <= n <= 150`

## 思路

2 和 n 的最小公倍数：如果 n 是偶数，最小公倍数就是 n 本身；否则是 2 * n。

{% asset_code solution.py %}

{% asset_code solution_test.py %}