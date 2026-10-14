---
title: 438. 找到字符串中所有字母异位词
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "在 s 中找到所有 p 的字母异位词子串的起始索引"
leetcode: 438
studyplan: 滑动窗口与双指针
published: 2026-08-16T23:32:15+08:00
updated: 2026-08-16T23:32:15+08:00
category: 题解
notebook: coding
---


# 438. 找到字符串中所有字母异位词

## 题目描述

给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的**异位词**的子串，返回这些子串的起始索引。所谓异位词，即字符构成相同、排列顺序不同的词。

**示例 ：**

```
输入：s = "cbaebabacd", p = "abc"
输出：[0, 6]
```

## 解法思路

**核心思想：与 567 完全相同的"定长滑窗 + 计数归零"套路，只是把"找到一次就返回"改成"每次匹配都记录起始下标"。**

窗口长度固定为 `n = len(p)`，维护差值数组 `cnt[26]` 与 `non_zero` 计数：

- 预处理 `p`：`cnt[c] -= 1`；
- 入窗口 `+1`、出窗口 `-1`。

当窗口长度达到 `n`（即 `i >= n-1`）且 `non_zero == 0` 时，说明窗口 `[i-n+1, i]` 内是 `p` 的一个异位词，把起始下标 `i-n+1` 加入答案。

**逐步举例**（`s="cbaebabacd", p="abc"`，`n=3`）：

- 初始化 `cnt['a']=cnt['b']=cnt['c']=-1`，`non_zero=3`。
- `i=2`，窗口形成 `[0,2]="cba"`：三个字符差值在此过程全部归零，`non_zero=0 → append(2-3+1=0)`。
- `i=8`，窗口 `[6,8]="bac"`：又一轮让非零清零，`non_zero=0 → append(8-3+1=6)`。
- 最终返回 `[0, 6]` ✓

## 复杂度分析

- 时间复杂度：O(n)，n = len(s)。
- 空间复杂度：O(1)，固定 26 长计数数组。

## 代码实现

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> list[int]:
        n, m = len(p), len(s)
        if n > m:
            return []

        cnt = [0] * 26
        for c in p:
            cnt[ord(c) - 97] -= 1

        non_zero = sum(1 for v in cnt if v != 0)
        ans = []

        for i, c in enumerate(s):
            idx = ord(c) - 97
            old = cnt[idx]
            cnt[idx] += 1
            if old == 0:
                non_zero += 1
            elif cnt[idx] == 0:
                non_zero -= 1

            if i >= n:
                idx2 = ord(s[i - n]) - 97
                old2 = cnt[idx2]
                cnt[idx2] -= 1
                if old2 == 0:
                    non_zero += 1
                elif cnt[idx2] == 0:
                    non_zero -= 1

            if i >= n - 1 and non_zero == 0:
                ans.append(i - n + 1)

        return ans
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestFindAnagrams(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.findAnagrams("cbaebabacd", "abc"), [0, 6])

    def test_example2(self):
        self.assertEqual(self.solution.findAnagrams("abab", "ab"), [0, 1, 2])

    def test_no_anagram(self):
        self.assertEqual(self.solution.findAnagrams("abcdef", "ghi"), [])

    def test_p_larger_than_s(self):
        self.assertEqual(self.solution.findAnagrams("a", "ab"), [])

    def test_same_string(self):
        self.assertEqual(self.solution.findAnagrams("abc", "abc"), [0])

    def test_duplicate_chars(self):
        self.assertEqual(self.solution.findAnagrams("aaa", "aa"), [0, 1])


if __name__ == "__main__":
    unittest.main()
```