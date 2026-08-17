---
title: 1470. 重新排列数组
notebook: coding
tags: [入门, 数组]
description: "按 [x1,y1,x2,y2,...,xn,yn] 顺序重排数组"
leetcode: 1470
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个数组 `nums`，数组中有 `2n` 个元素，按 `[x1,x2,...,xn,y1,y2,...,yn]` 的格式排列。

请你将数组按 `[x1,y1,x2,y2,...,xn,yn]` 格式重新排列，返回重排后的数组。

<https://leetcode.cn/problems/shuffle-the-array/description/>

**示例 1：**

> 输入：nums = [2,5,1,3,4,7], n = 3
> 输出：[2,3,5,4,1,7]
> 解释：由于 x1=2, x2=5, x3=1, y1=3, y2=4, y3=7，所以答案为 [2,3,5,4,1,7]

**示例 2：**

> 输入：nums = [1,2,3,4,4,3,2,1], n = 4
> 输出：[1,4,2,3,3,2,4,1]

**约束：**

- `1 <= n <= 500`
- `nums.length == 2n`
- `1 <= nums[i] <= 10³`

## 思路

遍历 `i` 从 0 到 n-1，依次取 `nums[i]` 和 `nums[i + n]`。

{% asset_code solution.py %}

{% asset_code solution_test.py %}