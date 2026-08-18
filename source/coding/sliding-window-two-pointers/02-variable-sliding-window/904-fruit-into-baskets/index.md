---
title: 904. 水果成篮
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 数组
  - 哈希表
description: "求最多包含两种不同元素的最长连续子数组的长度"
leetcode: 904
studyplan: 滑动窗口与双指针
---

# 904. 水果成篮

## 题目描述

你正在探访一家农场，农场从左到右种植了一排果树。你有两个篮子，每个篮子只能装单一类型的水果。求可以收集的水果的最大数目。

等价于求最长连续子数组，满足子数组中至多有两种不同的数字。

## 解法思路

不定长滑动窗口，维护窗口内不同水果种类数 ≤ 2。用哈希表记录窗口内每种水果的个数，当种类超过 2 时收缩左边界。

## 题解

```python
class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        ans = left = 0
        cnt = {}
        for right, x in enumerate(fruits):
            cnt[x] = cnt.get(x, 0) + 1
            while len(cnt) > 2:
                left_fruit = fruits[left]
                cnt[left_fruit] -= 1
                if cnt[left_fruit] == 0:
                    del cnt[left_fruit]
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)（哈希表最多存储 3 种水果）