---
title: 904. 水果成篮
tags:
  - 滑动窗口
  - 不定长
  - 数组
  - 哈希表
description: "求最多包含两种不同元素的最长连续子数组的长度"
leetcode: 904
studyplan: 滑动窗口与双指针
published: 2026-08-18T13:39:14+08:00
updated: 2026-08-18T13:39:14+08:00
category: 题解
notebook: coding
---


# 904. 水果成篮

## 题目描述

你正在探访一家农场，农场从左到右种植了一排果树。你有两个篮子，每个篮子只能装单一类型的水果。求可以收集的水果的最大数目。

等价于求最长连续子数组，满足子数组中至多有两种不同的数字。

## 解法思路

### 核心思想

题目要求收集尽量多的水果，但只有两个篮子、每个篮子限定一种水果。等价于：**找一个最长的连续子数组，使它里面至多出现两种不同的数字**。

本题求的是"最大窗口"，而"最多两种水果"是窗口需要始终满足的**合法性约束**——窗口越短越合法、越长越容易超种类。这类"求最长 + 越短越合法"的问题，用**不定长滑动窗口**：右指针每次加入一个水果，若种类数超过 2，就不断右移左指针，直到窗口重新合法。

由于水果只进不出、种类只增不减（在达到上限后），用哈希表 `cnt` 记录窗口内每种水果的出现次数，窗口种类数即 `len(cnt)`。

### 算法步骤

1. `ans = left = 0`，`cnt` 记录窗口内各水果计数。
2. 枚举右端点 `right`：`cnt[fruits[right]] += 1`。
3. `while len(cnt) > 2`：移除最左水果 `fruits[left]`，计数减一；减到 0 就 `del`，然后 `left += 1`（收缩直至只含 ≤2 种）。
4. `ans = max(ans, right - left + 1)`。
5. 返回 `ans`。

### 逐步举例

以 `fruits = [1, 2, 3, 2, 2]` 为例（期望答案 4，窗口 [1,4] 为 [2,3,2,2]）：

| right | 加入 | cnt | 种类数 | 是否收缩 | 窗口 | ans |
|-------|------|-----|-------|---------|------|-----|
| 0 | 1 | {1:1} | 1 | 否 | [0,0] | 1 |
| 1 | 2 | {1:1,2:1} | 2 | 否 | [0,1] | 2 |
| 2 | 3 | {1:1,2:1,3:1} | 3 | **是** | — | — |
| 收缩 | 去 left=0(1) | {2:1,3:1} | 2 | left=1 | [1,2] | 2 |
| 3 | 2 | {2:2,3:1} | 2 | 否 | [1,3] | 3 |
| 4 | 2 | {2:3,3:1} | 2 | 否 | [1,4] | **4** |

第 2 步加入 3 后瞬间有 3 种水果，必须收缩：删掉最左的 1（下标0）后只剩 {2,3}，重新合法。之后窗口 [1,4] 一直合法且最长，ans=4。✅

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

```python
import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/904-fruit-into-baskets")
from solution import Solution
import unittest

class TestTotalFruit(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.totalFruit([1,2,1]), 3)

    def test_example2(self):
        self.assertEqual(self.solution.totalFruit([0,1,2,2]), 3)

    def test_example3(self):
        self.assertEqual(self.solution.totalFruit([1,2,3,2,2]), 4)

    def test_example4(self):
        self.assertEqual(self.solution.totalFruit([3,3,3,1,2,1,1,2,3,3,4]), 5)

    def test_single_type(self):
        self.assertEqual(self.solution.totalFruit([1,1,1,1]), 4)

    def test_two_types(self):
        self.assertEqual(self.solution.totalFruit([1,2,1,2,1]), 5)

if __name__ == "__main__":
    unittest.main()
```

## 复杂度分析

- 时间复杂度：O(n)，左右指针各前进一次
- 空间复杂度：O(1)，cnt 中同时存在的种类数不超过 3