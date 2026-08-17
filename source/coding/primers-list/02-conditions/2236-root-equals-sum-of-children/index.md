---
title: 2236. 判断根结点是否等于子结点之和
notebook: coding
tags: [入门, 条件判断]
description: "判断二叉树根结点值是否等于左右子结点值之和"
leetcode: 2236
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

给你一个二叉树根结点，判断该根结点是否等于它的左右子结点之和。

树只包含根结点、左子结点和右子结点。

<https://leetcode.cn/problems/root-equals-sum-of-children/description/>

**示例 1：**

> 输入：root = [10, 4, 6]
> 输出：true
> 解释：10 == 4 + 6，返回 true。

**示例 2：**

> 输入：root = [5, 3, 1]
> 输出：false
> 解释：5 != 3 + 1，返回 false。

**约束：**

- 树只包含 1 到 3 个结点
- 每个结点值在 `[0, 100]` 范围内

## 思路

直接判断 `root.val == root.left.val + root.right.val`。注意题目保证左右子结点都存在。

{% asset_code solution.py %}

{% asset_code solution_test.py %}