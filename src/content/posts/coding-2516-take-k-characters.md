---
title: "2516. 每种字符至少取 K 个"
tags:
  - 滑动窗口
  - 不定长
  - 字符串
description: "反向思考：从两端取字符等价于中间保留窗口，求最长合法窗口"
leetcode: 2516
studyplan: 滑动窗口与双指针
published: 2026-08-18T13:44:48+08:00
updated: 2026-08-18T13:44:48+08:00
category: 题解
notebook: coding
---


# 2516. 每种字符至少取 K 个

## 题目描述

给你一个由字符 `'a'`、`'b'`、`'c'` 组成的字符串 `s` 和一个非负整数 `k`。每分钟，你可以选择取走 `s` 最左侧还是最右侧的那个字符。

你必须取走每种字符**至少 `k`** 个，返回需要的**最少**分钟数；如果无法取到，则返回 `-1`。

## 核心思想

**正难则反：反向滑动窗口**。

从左右两端取字符，等价于**中间保留一个窗口**。求最小取走字符数，等价于求**最大可保留窗口长度**。

统计每种字符总数，窗口内每种字符最多允许保留 `total[char] - k` 个。用滑动窗口找满足条件的最长窗口，答案即为 `n - 最长窗口长度`。

## 算法步骤

1. 统计 `s` 中 `'a'`、`'b'`、`'c'` 的总数
2. 若任一字符总数 `< k`，返回 `-1`
3. 计算每种字符在窗口内最多允许保留的数量：`need[c] = total[c] - k`
4. 滑动窗口找最长合法窗口（窗口内每种字符 ≤ `need`）：
   - 右端点扩展，加入字符
   - 当某字符超过 `need` 时，收缩左端点
   - 更新最大窗口长度
5. 返回 `n - 最长窗口长度`

## 逐步举例

以 `s = "aabbbcc"`, `k = 1` 为例：

**统计**：`a=2, b=3, c=2`

**need**（窗口内最多允许）：`a=1, b=2, c=1`

| right | s[right] | window | 超 need? | 收缩 | left | max_len |
|-------|----------|--------|----------|------|------|---------|
| 0     | a        | a=1    | 否       | —    | 0    | 1       |
| 1     | a        | a=2    | a>1      | l=1  | 1    | 1       |
| 2     | b        | a=1,b=1| 否       | —    | 1    | 2       |
| 3     | b        | a=1,b=2| 否       | —    | 1    | 3       |
| 4     | b        | a=1,b=3| b>2      | l=3  | 3    | 3       |
| 5     | c        | b=2,c=1| 否       | —    | 3    | 3       |
| 6     | c        | b=2,c=2| c>1      | l=6  | 6    | 3       |

最终 `max_len = 3`，答案 `= 7 - 3 = 4`。

验证：取走 `s[0:3]="aab"` 和 `s[6:]="c"`，共 4 个字符，含 `a=2≥1, b=1≥1, c=1≥1` ✓。

## 复杂度分析

- **时间复杂度**：`O(n)`。统计 `O(n)`，滑动窗口 `O(n)`。
- **空间复杂度**：`O(1)`。只维护 3 个字符的计数。

## 参考

- [灵茶山艾府：每种字符至少取 K 个](https://leetcode.cn/problems/take-k-of-each-character-from-left-and-right/solutions/2516/)

## 代码实现

```python
from collections import Counter


class Solution:
    def takeCharacters(self, s: str, k: int) -> int:
        cnt = Counter(s)
        if any(cnt[c] < k for c in "abc"):
            return -1

        n = len(s)
        need = {c: cnt[c] - k for c in "abc"}
        window = {"a": 0, "b": 0, "c": 0}
        left = max_len = 0

        for right in range(n):
            window[s[right]] += 1
            while window[s[right]] > need[s[right]]:
                window[s[left]] -= 1
                left += 1
            max_len = max(max_len, right - left + 1)

        return n - max_len
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestTakeCharacters(unittest.TestCase):
    def test_example1(self):
        s = "aabaaaacaabc"
        k = 2
        self.assertEqual(Solution().takeCharacters(s, k), 8)

    def test_example2(self):
        s = "a"
        k = 1
        self.assertEqual(Solution().takeCharacters(s, k), -1)

    def test_k_zero(self):
        s = "abc"
        k = 0
        self.assertEqual(Solution().takeCharacters(s, k), 0)

    def test_all_take(self):
        s = "aabbcc"
        k = 2
        self.assertEqual(Solution().takeCharacters(s, k), 6)

    def test_partial(self):
        s = "abc"
        k = 1
        self.assertEqual(Solution().takeCharacters(s, k), 3)

    def test_single_char(self):
        s = "aaaa"
        k = 2
        self.assertEqual(Solution().takeCharacters(s, k), -1)


if __name__ == "__main__":
    unittest.main()
```
