---
title: 2469. 温度转换
notebook: coding
tags: [入门, 基础语法]
description: "将摄氏度转换为开氏度和华氏度，以数组形式返回"
leetcode: 2469
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个四舍五入到两位小数的非负浮点数 `celsius` 来表示温度，以 **摄氏度**（Celsius）为单位。

你需要将摄氏度转换为 **开氏度**（Kelvin）和 **华氏度**（Fahrenheit），并以数组 `ans = [kelvin, fahrenheit]` 的形式返回结果。

<https://leetcode.cn/problems/convert-the-temperature/description/>

**公式：**

- 开氏度 = 摄氏度 + 273.15
- 华氏度 = 摄氏度 * 1.80 + 32.00

**示例 1：**

> 输入：celsius = 36.50
> 输出：[309.65000, 97.70000]

**示例 2：**

> 输入：celsius = 122.11
> 输出：[395.26000, 251.79800]

**约束：**

- `0 <= celsius <= 1000`

## 思路

直接套公式计算，注意返回浮点数数组即可。

{% asset_code solution.py %}

{% asset_code solution_test.py %}