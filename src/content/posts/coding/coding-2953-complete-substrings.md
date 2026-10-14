---
title: 2953. 统计完全子字符串
tags:
  - 滑动窗口
  - 哈希表
  - 计数
description: "统计完全子字符串个数：每个字符恰好出现 k 次，且相邻字符字母序相差 ≤ 2"
leetcode: 2953
studyplan: 滑动窗口与双指针
published: 2026-08-17T09:37:34+08:00
updated: 2026-08-17T09:37:34+08:00
category: 题解
notebook: coding
---


# 2953. 统计完全子字符串

## 题目描述

`word` 的一个子字符串 `s` 若同时满足：
1. `s` 中**每个字符恰好出现** `k` 次；
2. `s` 中**相邻字符**在字母表中位置相差**至多** `2`（如 `a` 与 `c` 差 2 允许，`a` 与 `d` 差 3 不允许）；

则称 `s` 为**完全字符串**。返回 `word` 中完全子字符串的数目。

**示例 ：**

```
输入：word="igigee", k=2  → 输出：3
输入：word="aaabbbccc", k=3 → 输出：6
```

## 解法思路

**第一步：按相邻差切段。** 完全子串中任意相邻两字符的字母序差必须 ≤2，因此一个完全子串绝不会跨过"相邻差 >2"的边界。按差 >2 的位置把 `word` 切成若干段，在每个段内独立统计并累加即可。

**第二步：枚举可能的窗口大小。** 若完全子串含 `m` 种不同字符、每种出现 `k` 次，则其长度为 `m·k`。`m ∈ [1, 26]`，且 `m·k ≤ 段长`。对每个候选 `m`，做一次定长滑窗。

**第三步：O(1) 维护窗口是否"恰好"。** 窗口长度固定为 `target = m·k`。用计数数组 `cnt`，并维护两个量：
- `distinct`：出现过的字符种类数（`cnt[c] > 0` 的个数）；
- `valid`：**恰出现 `k` 次**的字符个数。

当 `valid == distinct` 时，说明窗口内所有出现过的字符都恰好各出现 `k` 次（即没有出现不足 `k` 次的字符），满足条件，答案 +1。入窗/出窗时只在计数跨过 `0/1`、`k/k+1`、`k-1/k` 这些临界点更新 `distinct` 与 `valid`，从而 O(1) 完成。

**逐步举例**（`word="aaabbbccc", k=3`）：

- 相邻差都 ≤2，整串为一段。
- `m=3`：`target=9`，唯一窗口 `[0,9)`，`cnt[a]=cnt[b]=cnt[c]=3`，`distinct=3, valid=3`，`valid==distinct` → 答案 1。
- `m=1`：`target=3`，连续三字符窗口如 `[0,3]="aaa"` → `distinct=1, valid=1`，+1；`[3,6]="bbb"`、`[6,9]="ccc"` 同理 → 再加 2。
- `m=2`：`target=6`，窗口如 `[0,6]="aaabbb"` → `distinct=2` 但 `valid=0`（无字符恰出现 3 次的，分别是 a 出现 3? 实际 a 出现 3、b 出现 3，则 valid=2）→ `valid==distinct`，+1；`[3,9]="bbbccc"` 同理 +1。
- 总计 `1+3+2 = 6` ✓。

## 复杂度分析

- 时间复杂度：O(26·n)，每段最多枚举 26 种窗口大小，各滑动一次。
- 空间复杂度：O(1)，定长 26 的计数数组。

## 代码实现

```python
class Solution:
    def countCompleteSubstrings(self, word: str, k: int) -> int:
        n = len(word)
        if n < k:
            return 0

        # Split into segments by adjacency condition
        segments = []
        start = 0
        for i in range(1, n):
            if abs(ord(word[i]) - ord(word[i - 1])) > 2:
                segments.append(word[start:i])
                start = i
        segments.append(word[start:])

        ans = 0
        for seg in segments:
            m = len(seg)
            max_j = min(26, m // k)
            for j in range(1, max_j + 1):
                target = j * k
                cnt = [0] * 26
                valid = 0
                distinct = 0

                for i, ch in enumerate(seg):
                    idx = ord(ch) - 97
                    cnt[idx] += 1
                    if cnt[idx] == 1:
                        distinct += 1
                    if cnt[idx] == k:
                        valid += 1
                    elif cnt[idx] == k + 1:
                        valid -= 1

                    if i >= target:
                        idx2 = ord(seg[i - target]) - 97
                        cnt[idx2] -= 1
                        if cnt[idx2] == 0:
                            distinct -= 1
                        if cnt[idx2] == k:
                            valid += 1
                        elif cnt[idx2] == k - 1:
                            valid -= 1

                    if i >= target - 1 and valid == distinct:
                        ans += 1
        return ans
```

```python
import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/2953-complete-substrings")
from solution import Solution
import unittest

class TestCountCompleteSubstrings(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.countCompleteSubstrings("igigee", 2), 3)

    def test_example2(self):
        self.assertEqual(self.solution.countCompleteSubstrings("aaabbbccc", 3), 6)

    def test_single_char(self):
        self.assertEqual(self.solution.countCompleteSubstrings("a", 1), 1)

    def test_no_valid(self):
        self.assertEqual(self.solution.countCompleteSubstrings("abc", 2), 0)

    def test_same_char(self):
        self.assertEqual(self.solution.countCompleteSubstrings("aaaa", 2), 3)

if __name__ == "__main__":
    unittest.main()
```