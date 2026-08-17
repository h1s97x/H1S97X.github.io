---
title: 1534. 统计好三元组
notebook: coding
tags: [入门, 循环]
description: "统计满足 |a-b| <= a, |b-c| <= b, |a-c| <= c 的三元组数目"
leetcode: 1534
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个整数数组 `arr`，以及三个整数 `a`、`b`、`c`。

请统计其中好三元组的数量。

如果三元组 `(arr[i], arr[j], arr[k])` 满足下列全部条件，则认为它是一个 **好三元组**：

- `0 <= i < j < k < arr.length`
- `|arr[i] - arr[j]| <= a`
- `|arr[j] - arr[k]| <= b`
- `|arr[i] - arr[k]| <= c`

<https://leetcode.cn/problems/count-good-triplets/description/>

**示例 1：**

> 输入：arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
> 输出：4
> 解释：一共有 4 个好三元组：(3,0,1), (3,0,1), (3,1,1), (0,1,1)

**示例 2：**

> 输入：arr = [1,1,2,2,3], a = 0, b = 0, c = 1
> 输出：0

**约束：**

- `3 <= arr.length <= 100`
- `0 <= arr[i] <= 1000`
- `0 <= a, b, c <= 1000`

## 思路

三重循环遍历所有 `i < j < k` 组合，逐一判断条件。

{% asset_code solution.py %}

{% asset_code solution_test.py %}