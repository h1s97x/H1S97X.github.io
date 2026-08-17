---
title: 2235. 两整数相加
notebook: coding
tags: [入门, 基础语法]
description: "给定两个整数 num1 和 num2，返回这两个整数的和"
leetcode: 2235
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你两个整数 `num1` 和 `num2`，返回这两个整数的和。

<https://leetcode.cn/problems/add-two-integers/description/>

**示例 1：**

> 输入：num1 = 12, num2 = 5
> 输出：17

**示例 2：**

> 输入：num1 = -10, num2 = 4
> 输出：-6

**约束：**

- `-100 <= num1, num2 <= 100`

## 思路

最基础的加法运算，直接返回 `num1 + num2` 即可。

{% asset_code solution.py %}

{% asset_code solution_test.py %}