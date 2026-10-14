---
title: 2024. 考试的最大困扰度
tags:
  - 滑动窗口
  - 不定长
  - 字符串
description: "最多修改 k 次，求最长连续相同字符子串的长度"
leetcode: 2024
studyplan: 滑动窗口与双指针
published: 2026-08-18T13:40:50+08:00
updated: 2026-08-18T13:40:50+08:00
category: 题解
notebook: coding
---


# 2024. 考试的最大困扰度

## 题目描述

一位老师正在出一场由 n 道判断题构成的考试，每道题的答案为 'T' 或 'F'。你可以进行最多 k 次操作，每次操作将一道题的答案改为 'T' 或 'F'。求在不超过 k 次操作的情况下，最大连续相同结果的题数。

## 解法思路

### 核心思想

目标是使一个子串内**全部答案相同**。若子串中 `T` 有 `cntT` 个、`F` 有 `cntF` 个：
- 想把它变成全 `T`，只需把 `cntF` 个 `F` 改成 `T`；
- 想把它变成全 `F`，只需把 `cntT` 个 `T` 改成 `F`。

所以该子串在 `k` 次操作内可统一，当且仅当 **`min(cntT, cntF) ≤ k`**，也即 **`cntT` 和 `cntF` 不能同时大于 `k`**。

于是问题转为：求最长子串，使其中 `T` 与 `F` 的个数**不同时超过 k**。子串越长越容易"岔"，属于**越短越合法**型不定长滑窗。

### 算法步骤

1. 维护 `cntT`、`cntF` 记录窗口内两类答案个数。
2. 枚举右端点，更新对应计数。
3. `while cntT > k and cntF > k`：把左端字符移出窗口并减对应计数，`left += 1`。
4. `ans = max(ans, right - left + 1)`。

### 逐步举例

以 `answerKey = "TTF"`、`k = 1` 为例（改 1 个 F 为 T 得 `TTT`，最长 3）：

| right | c | cntT | cntF | `cntT>1 and cntF>1`? | ans |
|-------|---|------|------|------|-----|
| 0 | T | 1 | 0 | 否 | 1 |
| 1 | T | 2 | 0 | 否（cntF=0） | 2 |
| 2 | F | 2 | 1 | 否（cntF=1） | 3 |

第 2 步即使 `cntT=2 > k`，但因 `cntF=1 ≤ k`，只要把那个 `F` 改成 `T` 即可，整串 `TTF` 可统一，故无需收缩。✅

## 题解

```python
class Solution:
    def maxConsecutiveAnswers(self, answerKey: str, k: int) -> int:
        ans = left = cntT = cntF = 0
        for right, c in enumerate(answerKey):
            if c == 'T':
                cntT += 1
            else:
                cntF += 1
            while cntT > k and cntF > k:
                if answerKey[left] == 'T':
                    cntT -= 1
                else:
                    cntF -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

```python
import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/2024-max-consecutive-answers")
from solution import Solution
import unittest

class TestMaxConsecutiveAnswers(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TTFF", 2), 4)

    def test_example2(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TFFT", 1), 3)

    def test_example3(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TTFTTFTT", 1), 5)

    def test_all_same(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TTTT", 2), 4)

    def test_k_zero(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TFTF", 0), 1)

if __name__ == "__main__":
    unittest.main()
```

## 复杂度分析

- 时间复杂度：O(n)，双指针各遍历一次
- 空间复杂度：O(1)