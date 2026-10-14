---
title: 1422. 分割字符串的最大得分
tags: [入门, 字符串]
description: "将字符串分割成左右两部分，左0右1的得分最大化"
leetcode: 1422
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个由若干 0 和 1 组成的字符串 `s`，请你计算并返回将该字符串分割成两个 **非空** 子字符串（即 **左** 子字符串和 **右** 子字符串）所能获得的最大得分。

「分割字符串的得分」为：**左** 子字符串中 **0** 的数量 + **右** 子字符串中 **1** 的数量。

<https://leetcode.cn/problems/maximum-score-after-splitting-a-string/description/>

**示例 1：**

> 输入：s = "011101"
> 输出：5
> 解释：所有可能的分割为：
> 左 = "0" 右 = "11101"，得分 = 1 + 4 = 5
> 左 = "01" 右 = "1101"，得分 = 1 + 3 = 4
> 左 = "011" 右 = "101"，得分 = 1 + 2 = 3
> 左 = "0111" 右 = "01"，得分 = 1 + 1 = 2
> 左 = "01110" 右 = "1"，得分 = 2 + 1 = 3

**示例 2：**

> 输入：s = "00111"
> 输出：5
> 解释：左 = "00" 右 = "111"，得分 = 2 + 3 = 5

**约束：**

- `2 <= s.length <= 500`
- `s` 仅由字符 `'0'` 和 `'1'` 组成

## 思路

先统计总 1 的数量，然后遍历分割点，左边 0 递增，右边 1 递减，取最大值。

```python
class Solution:
    def maxScore(self, s: str) -> int:
        total_ones = s.count('1')
        zeros = 0
        ones = total_ones
        max_score = 0
        for i in range(len(s) - 1):
            if s[i] == '0':
                zeros += 1
            else:
                ones -= 1
            max_score = max(max_score, zeros + ones)
        return max_score
```

```python
import unittest


class TestMaxScore(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxScore("011101"), 5)

    def test_example2(self):
        self.assertEqual(self.solution.maxScore("00111"), 5)

    def test_all_zeros(self):
        self.assertEqual(self.solution.maxScore("00"), 1)

    def test_all_ones(self):
        self.assertEqual(self.solution.maxScore("11"), 1)


if __name__ == '__main__':
    unittest.main()
```