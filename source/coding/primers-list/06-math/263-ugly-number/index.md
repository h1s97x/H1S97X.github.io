---
title: 263. 丑数
notebook: coding
tags: [入门, 数学]
description: "判断一个整数是否为只包含质因数 2、3 和 5 的丑数"
leetcode: 263
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

**丑数** 就是只包含质因数 `2`、`3` 和 `5` 的正整数。

给你一个整数 `n`，请你判断 `n` 是否为 **丑数**。如果是，返回 `true`；否则，返回 `false`。

<https://leetcode.cn/problems/ugly-number/description/>

**示例 1：**

> 输入：n = 6
> 输出：true
> 解释：6 = 2 × 3

**示例 2：**

> 输入：n = 1
> 输出：true
> 解释：1 通常被视为丑数。

**示例 3：**

> 输入：n = 14
> 输出：false
> 解释：14 不是丑数，因为它包含了质因数 7。

**约束：**

- `-2³¹ <= n <= 2³¹ - 1`

## 思路

反复除以 2、3、5，直到不能整除为止。最后判断剩余是否为 1。注意 `n <= 0` 不是丑数。

{% asset_code solution.py %}

{% asset_code solution_test.py %}