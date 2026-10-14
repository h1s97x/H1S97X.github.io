---
title: 1052. 爱生气的书店老板
tags:
  - 滑动窗口
  - 定长
description: "老板生气时顾客会流失，一次秘密技巧可让自己连续 minutes 分钟不生气，求最大满意顾客数"
leetcode: 1052
studyplan: 滑动窗口与双指针
published: 2026-08-16T23:31:28+08:00
updated: 2026-08-16T23:31:28+08:00
category: 题解
notebook: coding
---


# 1052. 爱生气的书店老板

## 题目描述

书店老板的店开了 `n` 分钟。`customers[i]` 是第 `i` 分钟进店的顾客数，`grumpy[i]` 表示第 `i` 分钟老板是否生气（`1` 生气、`0` 不生气）。老板生气时那一分钟的顾客会不满意，否则满意。

老板知道一个秘密技巧，能让自己连续 `minutes` 分钟不生气，但只能使用一次。求一天中最多能有多少顾客满意。

**示例 1：**

```
输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
输出：16
解释：老板在最后 3 分钟保持冷静。满意顾客数 = 1 + 1 + 1 + 1 + 7 + 5 = 16。
```

**提示：**

- `n == customers.length == grumpy.length`
- `1 <= minutes <= n <= 2*10^4`
- `0 <= customers[i] <= 1000`
- `grumpy[i]` 为 0 或 1

## 解法思路

**核心拆解**：满意顾客由两部分组成，互不影响，最终答案 = **本来满意的人数 + 用技巧额外挽回的人数**。

1. **本来满意**：老板本就不生气的分钟（`grumpy[i] == 0`），这部分的顾客无论如何都满意，是固定的**基础值** `base`。
2. **额外挽回**：技巧覆盖的连续 `minutes` 分钟里，那些原本老板生气（`grumpy[i] == 1`）而流失的顾客，会被全部挽回。

因此问题转化为：**选哪一段长度为 `minutes` 的窗口，能让窗口内 `grumpy[i]==1` 的 `customers[i]` 之和最大**。这正是定长滑动窗口。

沿用定长滑窗 **入-更新-出** 三步，用 `cur` 维护窗口内「本会流失的顾客数」：

1. **入**：右端点 `i` 进窗口，若 `grumpy[i]==1` 则 `cur += customers[i]`；窗口不足 `minutes` 时继续。
2. **更新**：窗口满 `minutes` 时，用 `cur` 更新最大挽回值 `extra`。
3. **出**：左端点 `i-minutes` 出窗口，若 `grumpy[i-minutes]==1` 则从 `cur` 中扣除。

最终答案 `base + extra`。

**逐步举例**（`customers=[1,0,1,2,1,1,7,5]`, `grumpy=[0,1,0,1,0,1,0,1]`, `minutes=3`）：

- **基础值**：所有 `grumpy==0` 的分钟顾客数之和 = `customers[0]+[2]+[4]+[6] = 1+1+1+7 = 10`。
- **滑窗扫描 extra**（`cur` 只累计窗口内 `grumpy==1` 的顾客）：

| 窗口 [l..r] | 窗口内 grumpy==1 的顾客 | cur |
|---|---|---|
| [0..2] | c[1]=0 | 0 |
| [1..3] | c[1]+c[3]=0+2 | 2 |
| [2..4] | c[3]=2 | 2 |
| [3..5] | c[3]+c[5]=2+1 | 3 |
| [4..6] | c[5]=1 | 1 |
| [5..7] | c[5]+c[7]=1+5 | 6 |

最大 `extra = 6`（选最后 [5..7] 三分钟保持冷静），`ans = base + extra = 10 + 6 = 16`，与预期一致。

## 复杂度分析

- 时间复杂度：O(n)，一次遍历，每步 O(1)。
- 空间复杂度：O(1)，仅使用常数额外空间。

## 代码实现

```python
class Solution:
    def maxSatisfied(self, customers: list[int], grumpy: list[int], minutes: int) -> int:
        base = sum(c for c, g in zip(customers, grumpy) if g == 0)

        extra = 0
        cur = 0
        for i, (c, g) in enumerate(zip(customers, grumpy)):
            cur += c if g == 1 else 0
            if i >= minutes:
                cur -= customers[i - minutes] if grumpy[i - minutes] == 1 else 0
            if i >= minutes - 1:
                extra = max(extra, cur)

        return base + extra
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMaxSatisfied(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        customers = [1, 0, 1, 2, 1, 1, 7, 5]
        grumpy = [0, 1, 0, 1, 0, 1, 0, 1]
        minutes = 3
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 16)

    def test_example2(self):
        customers = [1]
        grumpy = [0]
        minutes = 1
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 1)

    def test_all_grumpy(self):
        customers = [3, 5, 2]
        grumpy = [1, 1, 1]
        minutes = 2
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 8)

    def test_all_happy(self):
        customers = [3, 5, 2]
        grumpy = [0, 0, 0]
        minutes = 2
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 10)

    def test_window_equals_array(self):
        customers = [4, 5]
        grumpy = [1, 0]
        minutes = 2
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 9)


if __name__ == "__main__":
    unittest.main()
```