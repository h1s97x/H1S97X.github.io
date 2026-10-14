---
title: 567. 字符串的排列
tags:
  - 滑动窗口
  - 定长
  - 哈希表
description: "判断 s2 是否包含 s1 的排列（定长滑动窗口 + 计数数组）"
leetcode: 567
studyplan: 滑动窗口与双指针
published: 2026-08-16T23:31:34+08:00
updated: 2026-08-16T23:31:34+08:00
category: 题解
notebook: coding
---


# 567. 字符串的排列

## 题目描述

给你两个字符串 `s1` 和 `s2`，判断 `s2` 是否包含 `s1` 的排列。若是返回 `true`，否则返回 `false`。即是否存在一个长度为 `len(s1)` 的子串，其字符出现次数与 `s1` 完全一致（顺序可不同）。

**示例 ：**

```
输入：s1 = "ab", s2 = "eidbaooo"
输出：true（子串 "ba" 是 "ab" 的排列）
```

## 解法思路

**核心思想：定长滑窗 + 计数归零判定。**

`s1` 的排列与原串只是顺序不同、字符频次相同。于是开一个**长 `n=len(s1)`** 的定长窗口，维护窗口内各字符频次与 `s1` 频次的**差值数组** `cnt[26]`：

- 预处理 `s1`：`cnt[c] -= 1`（表示 s1 需要这么多字符）；
- 滑窗时，左出窗口的字符 `-1`，右进窗口的字符 `+1`。

当某个字符的差值回到 0，说明窗口内该字符的个数已与 `s1` 对齐。若**所有 26 个字符差值都为 0**，则窗口内就是 `s1` 的一个排列。

为了避免每次遍历 26 个字符，用一个 `non_zero` 变量记录 `cnt` 中**非零项的个数**：
- 某字符从 0 变非 0，`non_zero+1`；
- 从非 0 变 0，`non_zero-1`。

当 `non_zero == 0`，直接返回 `true`，O(1) 完成匹配判断。

**逐步举例**（`s1="ab", s2="eidbaooo"`，窗口长 `n=2`）：

- 初始化 `cnt['a']=-1, cnt['b']=-1`，`non_zero=2`。
- `i=3` 入 `'b'`：`cnt['b']:-1→0`，`non_zero=2→1`；出 `s2[1]='i'`：`cnt['i']:→0`，`non_zero=1`。
- `i=4` 入 `'a'`：`cnt['a']:-1→0`，`non_zero=1→0`。此时窗口覆盖 `[3,4]="ba"`，正是 `"ab"` 的排列 → `return true` ✓

## 复杂度分析

- 时间复杂度：O(m)，m = len(s2)。
- 空间复杂度：O(1)，固定 26 长计数数组。

## 代码实现

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        n, m = len(s1), len(s2)
        if n > m:
            return False

        cnt = [0] * 26
        for c in s1:
            cnt[ord(c) - 97] -= 1

        non_zero = sum(1 for v in cnt if v != 0)

        for i, c in enumerate(s2):
            idx = ord(c) - 97
            old = cnt[idx]
            cnt[idx] += 1
            if old == 0:
                non_zero += 1
            elif cnt[idx] == 0:
                non_zero -= 1

            if i >= n:
                idx2 = ord(s2[i - n]) - 97
                old2 = cnt[idx2]
                cnt[idx2] -= 1
                if old2 == 0:
                    non_zero += 1
                elif cnt[idx2] == 0:
                    non_zero -= 1

            if i >= n - 1 and non_zero == 0:
                return True
        return False
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestCheckInclusion(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertTrue(self.solution.checkInclusion("ab", "eidbaooo"))

    def test_example2(self):
        self.assertFalse(self.solution.checkInclusion("ab", "eidboaoo"))

    def test_same_string(self):
        self.assertTrue(self.solution.checkInclusion("abc", "abc"))

    def test_s1_larger_than_s2(self):
        self.assertFalse(self.solution.checkInclusion("abc", "ab"))

    def test_duplicate_chars(self):
        self.assertTrue(self.solution.checkInclusion("aab", "baa"))

    def test_single_char(self):
        self.assertTrue(self.solution.checkInclusion("a", "a"))
        self.assertFalse(self.solution.checkInclusion("a", "b"))


if __name__ == "__main__":
    unittest.main()
```