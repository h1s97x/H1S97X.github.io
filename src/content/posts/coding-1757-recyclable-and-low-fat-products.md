---
title: 1757. 可回收且低脂的产品
tags: [入门, 数据库]
description: "查询既是低脂又可回收的产品"
leetcode: 1757
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
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
```sql
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';
```
```

```sql
-- 测试数据
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    low_fats VARCHAR(1),
    recyclable VARCHAR(1)
);

INSERT INTO Products VALUES
(0, 'Y', 'N'),
(1, 'Y', 'Y'),
(2, 'N', 'Y'),
(3, 'Y', 'Y'),
(4, 'N', 'N');

-- 预期结果: 1, 3
SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';
```