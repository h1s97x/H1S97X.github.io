---
title: 867. 转置矩阵
notebook: coding
tags: [入门, 数组]
description: "返回二维矩阵的转置"
leetcode: 867
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个二维整数数组 `matrix`，返回 `matrix` 的 **转置矩阵**。

矩阵的 **转置** 是指将矩阵的行列互换，即 `result[j][i] = matrix[i][j]`。

<https://leetcode.cn/problems/transpose-matrix/description/>

**示例 1：**

> 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
> 输出：[[1,4,7],[2,5,8],[3,6,9]]

**示例 2：**

> 输入：matrix = [[1,2,3],[4,5,6]]
> 输出：[[1,4],[2,5],[3,6]]

**约束：**

- `1 <= matrix.length <= 1000`
- `1 <= matrix[0].length <= 1000`

## 思路

转置后行列互换，新矩阵的列数等于原矩阵的行数，新矩阵的行数等于原矩阵的列数。

{% asset_code solution.py %}

{% asset_code solution_test.py %}