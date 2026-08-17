---
title: 258. 各位相加
notebook: coding
tags: [入门, 数学]
description: "反复将数字的各位相加，直到结果为一位数"
leetcode: 258
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给定一个非负整数 `num`，反复将各个位上的数字相加，直到结果为一位数。返回这个结果。

<https://leetcode.cn/problems/add-digits/description/>

**示例 1：**

> 输入：num = 38
> 输出：2
> 解释：3 + 8 = 11, 1 + 1 = 2。

**示例 2：**

> 输入：num = 0
> 输出：0

**约束：**

- `0 <= num <= 2³¹ - 1`

## 思路

### 解法 1：模拟

循环取各位数字之和，直到结果为一位数。

### 解法 2：数学公式（数根）

数根（digital root）公式：`1 + (num - 1) % 9`，当 num 为 0 时结果为 0。

{% asset_code solution.py %}

{% asset_code solution_test.py %}