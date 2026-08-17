---
title: 1052. 爱生气的书店老板
notebook: coding
tags:
  - 滑动窗口
  - 定长
description: "老板生气时顾客会流失，一次秘密技巧可让自己连续 minutes 分钟不生气，求最大满意顾客数"
leetcode: 1052
studyplan: 滑动窗口与双指针
---

# 1052. 爱生气的书店老板

## 题目描述

书店老板有一家店，他知道每分钟进店的顾客数 `customers[i]`，以及每分钟他是否生气 `grumpy[i]`（1 生气，0 不生气）。

老板有一项秘密技巧，能让自己连续 `minutes` 分钟保持不生气，但只能使用一次。

求一天中最多有多少顾客能感到满意。

**示例 1：**

```
输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
输出：16
```

## 解法思路

拆成两部分：

1. **基础满意数**：老板本就不生气时的顾客，固定不变
2. **额外收益**：在长度为 `minutes` 的窗口内，老板原本生气时流失的顾客，通过技巧挽留

用定长滑窗扫描 `minutes` 窗口，求窗口内 `grumpy[i]==1` 的 `customers[i]` 之和的最大值。

## 题解

```python
class Solution:
    def maxSatisfied(self, customers: list[int], grumpy: list[int], minutes: int) -> int:
        base = sum(c for c, g in zip(customers, grumpy) if g == 0)

        extra = 0
        cur = 0
        for i, (c, g) in enumerate(zip(customers, grumpy)):
            cur += c if g == 1 else 0
            if i >= minutes:
                cur -= customers[i - minutes] if grumpy[i - minutes] == 1 else 0
            if i >= minutes - 1:
                extra = max(extra, cur)

        return base + extra
```

## 复杂度分析

- 时间复杂度：O(n)，一次遍历
- 空间复杂度：O(1)
