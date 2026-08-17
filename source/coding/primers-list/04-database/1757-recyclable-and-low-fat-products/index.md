---
title: 1757. 可回收且低脂的产品
notebook: coding
tags: [入门, 数据库]
description: "查询既是低脂又可回收的产品"
leetcode: 1757
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

表：`Products`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | varchar |
| recyclable  | varchar |
+-------------+---------+
```

`product_id` 是该表的主键。`low_fats` 和 `recyclable` 的取值为 `'Y'` 或 `'N'`。

找出既是低脂又是可回收的产品 ID。

<https://leetcode.cn/problems/recyclable-and-low-fat-products/description/>

**示例：**

输入：

```
| product_id | low_fats | recyclable |
|------------|----------|------------|
| 0          | Y        | N          |
| 1          | Y        | Y          |
| 2          | N        | Y          |
| 3          | Y        | Y          |
| 4          | N        | N          |
```

输出：

```
| product_id |
|------------|
| 1          |
| 3          |
```

## 思路

简单的 `WHERE` 条件筛选。

```sql
{% asset_code solution.sql %}
```

{% asset_code solution_test.sql %}