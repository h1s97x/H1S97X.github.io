---
title: 1016. 子串能表示从 1 到 N 数字的二进制串
tags:
  - 滑动窗口
  - 位运算
  - 哈希表
  - 字符串
description: "检查二进制串 s 是否包含 [1, n] 所有整数的二进制表示"
leetcode: 1016
studyplan: 滑动窗口与双指针
published: 2026-08-18T13:32:28+08:00
updated: 2026-08-18T13:32:28+08:00
category: 题解
notebook: coding
---


# 1016. 子串能表示从 1 到 N 数字的二进制串

## 题目描述

给定一个二进制字符串 `s` 和一个正整数 `n`，如果对于 `[1, n]` 范围内的每个整数，其二进制表示都是 `s` 的子字符串，就返回 `true`，否则返回 `false`。

**示例 1：**

```
输入：s = "0110", n = 3
输出：true
```

**示例 2：**

```
输入：s = "0110", n = 4
输出：false
```

## 核心思想

题目问的是：**每一个 `[1, n]` 中的整数，其二进制表示是不是都作为 s 的某个连续子串出现过**。

把问题反过来看：s 的所有子串能表示成哪些整数？我们只需把 s 里能表示出的整数收集进一个集合，再检查 `[1, n]` 是否都被这个集合覆盖。

难点在 `n` 可以取到 `10^9`——直接枚举 `1..n` 的每个数再 `find`，在 `n` 很大时会超时。但借助两个关键观察可以大幅剪枝：

1. **位长上限**：`10^9 < 2^30`，所以 `[1, n]` 里任意整数的二进制表示长度都不超过 30 位。因此枚举 s 的子串时，只需要考虑长度 ≤ 30 的窗口即可。
2. **集合规模上限**：`s` 长度 `m ≤ 1000`，每个起点最多派生 30 个窗口，所以能表示出的不同整数最多约 `1000 × 30 = 30000` 个。一旦 `n > 30000`，集合根本不可能覆盖 `[1, n]` 这么多数，直接返回 `false`。

## 算法步骤

1. 记 `m = len(s)`；若 `n > m * 30`，直接返回 `false`（集合规模上限不够）。
2. 枚举每个起点 `i`，从 `i` 开始向右扩展长度最多 30 的子串：
   - 滚动维护 `val = (val << 1) | bit`，即子串对应的二进制整数值。
   - 若 `val > n`，说明后面只会更大，直接 `break` 这个起点。
   - 若 `val > 0`（跳过值为 0 的前导零子串），加入集合 `seen`。
3. 遍历 `1..n`，若有任何一个数不在 `seen` 中，返回 `false`；全部在则返回 `true`。

## 逐步举例

以 `s = "0110", n = 4` 为例：`m = 4`，`m*30 = 120 > 4`，进入枚举。

枚举所有子串并转为整数：

- 起点 0：`"0"`→0（跳过）、`"01"`→1、`"011"`→3、`"0110"`→6（>4 break）
- 起点 1：`"1"`→1、`"11"`→3、`"110"`→6（>4 break）
- 起点 2：`"1"`→1、`"10"`→2
- 起点 3：`"0"`→0（跳过）

收集得 `seen = {1, 2, 3}`。检查 `1..4`：1、2、3 都在，但 **4 不在**。返回 `false`。✅（整数 4 的二进制是 `"100"`，确实没出现在 s 中）

## 代码实现

```python
class Solution:
    def queryString(self, s: str, n: int) -> bool:
        m = len(s)
        # Maximum distinct values we can get from substrings ≤ 30 length
        max_possible = m * 30
        if n > max_possible:
            return False

        seen = set()
        for i in range(m):
            val = 0
            for j in range(i, min(i + 30, m)):
                val = (val << 1) | (ord(s[j]) - 48)
                if val > n:
                    break
                if val > 0:
                    seen.add(val)

        for i in range(1, n + 1):
            if i not in seen:
                return False
        return True
```

```python
import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/1016-binary-substrings")
from solution import Solution
import unittest

class TestQueryString(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertTrue(self.solution.queryString("0110", 3))

    def test_example2(self):
        self.assertFalse(self.solution.queryString("0110", 4))

    def test_small_n(self):
        self.assertTrue(self.solution.queryString("1", 1))

    def test_large_n_early_false(self):
        s = "0" * 1000
        self.assertFalse(self.solution.queryString(s, 100000))

    def test_contains_all(self):
        self.assertTrue(self.solution.queryString("11011101100", 5))

    def test_not_contain(self):
        self.assertFalse(self.solution.queryString("111", 4))

    def test_long_s(self):
        s = "01101110010111011110001001101010111100110111101111"
        self.assertTrue(self.solution.queryString(s, 5))

if __name__ == "__main__":
    unittest.main()
```

## 复杂度分析

- 时间复杂度：O(m × 30 + n)，枚举子串部分受 `m ≤ 1000` 且长度 ≤ 30 限制；当 `n` 很大时在第一步就被 `n > m*30` 快速剪枝返回。
- 空间复杂度：O(m × 30)，集合 `seen` 中最多约 30000 个元素。