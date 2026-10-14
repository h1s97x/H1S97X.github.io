---
title: 2062. 统计范围内的元音字符串数
tags: [入门, 字符串]
description: "统计字符串数组中首尾都是元音字母的字符串个数"
leetcode: 2062
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个由 `n` 个字符串组成的字符串数组 `words`，以及一个左闭右开区间 `[left, right)`。

请你统计并返回在该区间内，下标 `i` 满足 `left <= i < right` 的字符串中，那些 **首尾字符都是元音字母** 的字符串的数目。

元音字母：`a`, `e`, `i`, `o`, `u`（不区分大小写）。

<https://leetcode.cn/problems/count-vowel-substrings-of-a-string/description/>

**示例 1：**

> 输入：words = ["are","amy","u"], left = 0, right = 2
> 输出：2
> 解释：在 [0, 2) 范围内：
> - "are" 首尾都是元音
> - "amy" 首不是元音，尾是元音
> - "u" 首尾都是元音
> 因此返回 2。

**示例 2：**

> 输入：words = ["hey","aeo","mu","ooo","artro"], left = 1, right = 4
> 输出：3
> 解释：在 [1, 4) 范围内：
> - "aeo" 首尾都是元音
> - "mu" 首尾都不是元音
> - "ooo" 首尾都是元音
> 因此返回 3。

**约束：**

- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 10`
- `0 <= left < right <= words.length`

## 思路

遍历区间内的每个字符串，检查首尾字符是否在元音集合中。

```python
class Solution:
    def vowelStrings(self, words: list[str], left: int, right: int) -> int:
        vowels = set('aeiou')
        count = 0
        for i in range(left, right):
            w = words[i]
            if w[0] in vowels and w[-1] in vowels:
                count += 1
        return count
```

```python
import unittest


class TestVowelStrings(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.vowelStrings(["are", "amy", "u"], 0, 2), 2)

    def test_example2(self):
        self.assertEqual(self.solution.vowelStrings(["hey", "aeo", "mu", "ooo", "artro"], 1, 4), 2)

    def test_none(self):
        self.assertEqual(self.solution.vowelStrings(["bc", "df"], 0, 2), 0)


if __name__ == '__main__':
    unittest.main()
```