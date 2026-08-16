---
title: 1512. 好数对的数目
notebook: coding
tags: [入门, 循环]
description: "统计数组中满足 i < j 且 nums[i] == nums[j] 的数对数目"
leetcode: 1512
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个整数数组 `nums`。

如果一组数字 `(i, j)` 满足 `nums[i] == nums[j]` 且 `i < j`，就认为这是一组 **好数对**。

返回好数对的数目。

<https://leetcode.cn/problems/number-of-good-pairs/description/>

**示例 1：**

> 输入：nums = [1,2,3,1,1,3]
> 输出：4
> 解释：有 4 组好数对：(0,3), (0,4), (3,4), (2,5)

**示例 2：**

> 输入：nums = [1,1,1,1]
> 输出：6
> 解释：数组中的每组数字都是好数对

**约束：**

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## 思路

双重循环统计即可。也可以先用哈希表统计每个数字出现次数，每个数字贡献 `c * (c-1) / 2` 对。

{% asset_code solution.py %}

{% asset_code solution_test.py %}