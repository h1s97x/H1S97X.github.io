---
title: 852. 山脉数组的峰顶索引
notebook: coding
tags: [入门, 数组, 二分查找]
description: "在山脉数组中找出峰顶元素的索引"
leetcode: 852
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

符合下列属性的数组 `arr` 称为 **山脉数组**：

- `arr.length >= 3`
- 存在下标 `i`（`0 < i < arr.length - 1`），使得：
  - `arr[0] < arr[1] < ... < arr[i]`
  - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

给你由整数组成的山脉数组 `arr`，返回任何满足 `arr[0] < arr[1] < ... < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]` 的下标 `i`。

<https://leetcode.cn/problems/peak-index-in-a-mountain-array/description/>

**示例 1：**

> 输入：arr = [0,1,0]
> 输出：1

**示例 2：**

> 输入：arr = [0,2,1,0]
> 输出：1

**示例 3：**

> 输入：arr = [24,69,100,99,79,78,67,36,26,19]
> 输出：2

**约束：**

- `3 <= arr.length <= 10⁵`
- `0 <= arr[i] <= 10⁶`
- 题目数据保证 `arr` 是一个山脉数组

## 思路

### 解法 1：线性扫描

遍历直到找到 `arr[i] > arr[i + 1]` 的位置。

### 解法 2：二分查找

山脉数组的峰顶就是「第一个下降点」，可以用二分查找在 `O(log n)` 时间内找到。

{% asset_code solution.py %}

{% asset_code solution_test.py %}