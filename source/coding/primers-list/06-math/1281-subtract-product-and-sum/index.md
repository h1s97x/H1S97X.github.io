---
title: 1281. 整数的各位积和之差
notebook: coding
tags: [入门, 数学]
description: "计算整数各位数字的乘积与和的差"
leetcode: 1281
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个整数 `n`，请你帮忙计算并返回该整数「各位数字之积」与「各位数字之和」的差。

<https://leetcode.cn/problems/subtract-the-product-and-sum-of-digits-of-an-integer/description/>

**示例 1：**

> 输入：n = 234
> 输出：15
> 解释：各位数之积 = 2 * 3 * 4 = 24，各位数之和 = 2 + 3 + 4 = 9，24 - 9 = 15

**示例 2：**

> 输入：n = 4421
> 输出：21
> 解释：各位数之积 = 4 * 4 * 2 * 1 = 32，各位数之和 = 4 + 4 + 2 + 1 = 11，32 - 11 = 21

**约束：**

- `1 <= n <= 10⁵`

## 思路

循环取模 `n % 10` 得到最后一位，累加/累乘后 `n //= 10` 去掉最后一位。

{% asset_code solution.py %}

{% asset_code solution_test.py %}