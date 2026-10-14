---
title: 2156. 查找给定哈希值的子串
tags:
  - 滑动窗口
  - 滚动哈希
description: "返回 s 中第一个长度为 k 且哈希值等于 hashValue 的子串（反向滑动窗口）"
leetcode: 2156
studyplan: 滑动窗口与双指针
published: 2026-08-17T09:33:34+08:00
updated: 2026-08-17T09:33:34+08:00
category: 题解
notebook: coding
---


# 2156. 查找给定哈希值的子串

## 题目描述

字符串长度为 `k` 的子串哈希定义（`val(c) = c 的字母序，a=1, ..., z=26`）：

```
hash(sub) = ( val(s[0])·p^0 + val(s[1])·p^1 + ... + val(s[k-1])·p^(k-1) ) mod m
```

给定 `power=p`、`modulo=m`，返回 `s` 中**第一个**长度为 `k` 且哈希值等于 `hashValue` 的子串（下标最小者）。

**示例 ：**

```
输入：s="leetcode", power=7, modulo=20, k=2, hashValue=0
输出："ee"
```

## 解法思路

**核心：不要从前往后滑，要从后往前滑。**

正向滚动哈希在窗口左移一格时，需要把最高位 `p^(k-1)` 的贡献除掉，即做除法、求 `p` 的逆元。但 `modulo` 不保证是质数，逆元未必存在，除法不可行。

**反向滑动窗口**完美避开除法：从右往左维护窗口哈希，出窗口的是"低位"，入窗口的是"高位"。

设窗口哈希 `h` 从右端 `i+1..i+k` 滑到 `i..i+k-1`：

```
h' = ( (h - val(i+k)·p^(k-1)) · p + val(i) ) mod m
```

- 先减掉离开窗口的字符 `val(i+k)` 乘它的系数 `p^(k-1)`（最高位）→ 等价于按位对齐减；
- 整体乘 `p` → 所有低位升一位；
- 加上新进窗口的 `val(i+k-1...)`（此处为 `val(i)`）作为新的最低位，再取模。

全程只有加减乘与取模，**O(1) 更新**。

**逐步举例**（`s="leetcode"`，`k=2, p=7, m=20`）：

- 最右侧窗口 `s[6:8]="ee"`：从右往左累积——`val(e)=5` 得 `curr=5`；再入 `val(e)=5` 得 `curr=(5·7+5)%20=0`。
- 首个窗口 `curr=0==hashValue`，记录 `ans=6`。
- 反向滑动时后续窗口哈希都不等于 0，故返回 `s[6:8]="ee"` ✓。

## 复杂度分析

- 时间复杂度：O(n)，一次线性滑动。
- 空间复杂度：O(1)。

## 代码实现

```python
class Solution:
    def subStrHash(self, s: str, power: int, modulo: int, k: int, hashValue: int) -> str:
        n = len(s)
        val = lambda i: ord(s[i]) - 96  # 'a' -> 1

        # Compute hash of the rightmost window s[n-k:n]
        curr = 0
        for i in range(n - 1, n - k - 1, -1):
            curr = (curr * power + val(i)) % modulo

        ans = n - k
        if curr == hashValue:
            ans = n - k

        msb = pow(power, k - 1, modulo)

        # Slide from right to left
        for i in range(n - 1, k - 1, -1):
            curr = ((curr - val(i) * msb) * power + val(i - k)) % modulo
            if curr == hashValue:
                ans = i - k

        return s[ans:ans + k]
```

```python
import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/2156-substring-hash")
from solution import Solution
import unittest

class TestSubStrHash(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.subStrHash("leetcode", 7, 20, 2, 0), "ee")

    def test_example2(self):
        self.assertEqual(self.solution.subStrHash("fbxzaad", 31, 100, 3, 32), "fbx")

    def test_single_char(self):
        self.assertEqual(self.solution.subStrHash("a", 1, 10, 1, 1), "a")

    def test_large_k(self):
        s = "abcde"
        # hash = 1*1 + 2*2 + 3*4 + 4*8 + 5*16 = 1+4+12+32+80 = 129 ≡ 29 (mod 100)
        self.assertEqual(self.solution.subStrHash(s, 2, 100, 5, 29), "abcde")

    def test_multiple_matches(self):
        # s="aaa", power=1, modulo=10, k=2, hashValue=2
        # "aa": 1+1 = 2 ≡ 2 (mod 10)
        self.assertEqual(self.solution.subStrHash("aaa", 1, 10, 2, 2), "aa")

if __name__ == "__main__":
    unittest.main()
```