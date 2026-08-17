---
title: 584. 寻找用户推荐人
notebook: coding
tags: [入门, 数据库]
description: "查询没有推荐人 ID 为 2 的客户"
leetcode: 584
studyplan: 编程入门
date: 2024-11-09 20:49:16
updated: 2024-11-09 20:49:16
---

## Problem

表：`Customer`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
```

`id` 是该表的主键。该表包含客户信息，`referee_id` 表示该客户的推荐人。

找出那些 **没有被** `referee_id = 2` 的客户推荐的客户。

<https://leetcode.cn/problems/find-customer-referee/description/>

**示例：**

输入：

```
| id | name | referee_id |
|----|------|------------|
| 1  | Will | null       |
| 2  | Jane | null       |
| 3  | Alex | 2          |
| 4  | Bill | null       |
| 5  | Zack | 1          |
| 6  | Mark | 2          |
```

输出：

```
| name |
|------|
| Will |
| Jane |
| Bill |
| Zack |
```

## 思路

注意 `referee_id` 可能为 `NULL`，需要用 `IS NULL` 或 `<=>` 来处理。

```sql
{% asset_code solution.sql %}
```

{% asset_code solution_test.sql %}