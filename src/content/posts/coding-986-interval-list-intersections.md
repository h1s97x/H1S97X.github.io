---
title: 986. 区间列表的交集
tags: [双指针, 数组]
leetcode: 986
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 986. 区间列表的交集

## 题目描述

给定两个由一些**闭区间**组成的列表，`firstList` 和 `secondList`，其中 `firstList[i] = [start_i, end_i]` 而 `secondList[j] = [start_j, end_j]`。每个区间列表都是成对**不相交**的，并且**已经排序**。

返回这**两个区间列表的交集**。

（形式上，闭区间 `[a, b]`（其中 `a <= b`）表示实数 `x` 的集合，而 `a <= x <= b`。两个闭区间的交集是一组实数，要么为空集，要么为闭区间。例如，`[1, 3]` 和 `[2, 4]` 的交集为 `[2, 3]`。）

**示例 1：**
```
输入：firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
输出：[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
```

**提示：**
- `0 <= firstList.length, secondList.length <= 1000`
- `firstList.length + secondList.length >= 1`
- `0 <= start_i < end_i <= 10^9`
- `end_i < start_{i+1}`
- `0 <= start_j < end_j <= 10^9`
- `end_j < start_{j+1}`

## 解题思路

### 核心思想

两个区间列表都已排序且各自内部不相交，因此可以用**双指针**顺序比较每个区间对。

对当前指向的区间 `A = firstList[i]`、`B = secondList[j]`：

- **交集的下界**是两者起点较大者：`lo = max(A[0], B[0])`；
- **交集的上界**是两者终点较小者：`hi = min(A[1], B[1])`；
- 若 `lo <= hi`，则存在交集，`[lo, hi]` 即为一个结果区间。

得到当前交集后，**谁先结束谁就前进**：如果 `A` 的终点更小，说明 `A` 不可能再与 `secondList` 中更靠后的区间相交，`i++`；否则 `j++`。这是灵茶山艾府题单里"两个序列交替扫描"的典型推进法。

**区间相交的三种可能示意：**

```
① A 完全覆盖 B 的起点:   A:  [0, 5]
                        B:     [2, 8]  交点 [2,5]，B 先结束 → j++
② A 在 B 内部:          A:     [2, 4]
                        B:  [0, 8]      交点 [2,4]，A 先结束 → i++
③ 完全不相交:            A:  [0, 3]
                        B:        [5, 8]  lo>hi 无交集，A 先结束 → i++
```

### 算法步骤

1. 初始化 `i = j = 0`，结果列表 `res = []`。
2. 当 `i < len(firstList)` 且 `j < len(secondList)` 时循环：
   - 计算 `lo = max(A[0], B[0])`，`hi = min(A[1], B[1])`；
   - 若 `lo <= hi`，把 `[lo, hi]` 加入 `res`；
   - 若 `A[1] < B[1]`，`i++`；否则 `j++`。
3. 返回 `res`。

### 逐步举例

以 `firstList=[[0,2],[5,10],[13,23],[24,25]]`，`secondList=[[1,5],[8,12],[15,24],[25,26]]` 为例：

| 步骤 | i | j | A | B | lo,hi | 是否相交 | 推进 |
| ---- | - | - | - | - | ----- | -------- | ---- |
| 1 | 0 | 0 | [0,2] | [1,5] | 1,2 | ✅ → [1,2] | B终点5>2，A先完后 i=1 |
| 2 | 1 | 0 | [5,10] | [1,5] | 5,5 | ✅ → [5,5] | B终点5<10，j=1 |
| 3 | 1 | 1 | [5,10] | [8,12] | 8,10 | ✅ → [8,10] | A终点10<12，i=2 |
| 4 | 2 | 1 | [13,23] | [8,12] | 13,12 | ❌ lo>hi | A终点23>12，j=2 |
| 5 | 2 | 2 | [13,23] | [15,24] | 15,23 | ✅ → [15,23] | B终点24>23，i=3 |
| 6 | 3 | 2 | [24,25] | [15,24] | 24,24 | ✅ → [24,24] | A终点25>24，j=3 |
| 7 | 3 | 3 | [24,25] | [25,26] | 25,25 | ✅ → [25,25] | j=4 结束 |

最终结果为 `[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]`。

### 复杂度分析

- **时间复杂度**：O(M + N)，其中 M、N 为两个列表的长度。每个区间最多被访问一次（指针单调右移）。
- **空间复杂度**：O(1)（不计返回结果所占空间），仅用双指针。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        i = j = 0
        res = []
        while i < len(firstList) and j < len(secondList):
            lo = max(firstList[i][0], secondList[j][0])
            hi = min(firstList[i][1], secondList[j][1])
            if lo <= hi:
                res.append([lo, hi])
            if firstList[i][1] < secondList[j][1]:
                i += 1
            else:
                j += 1
        return res
```
```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        first = [[0, 2], [5, 10], [13, 23], [24, 25]]
        second = [[1, 5], [8, 12], [15, 24], [25, 26]]
        expected = [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]]
        self.assertEqual(Solution().intervalIntersection(first, second), expected)

    def test_no_intersection(self):
        self.assertEqual(Solution().intervalIntersection([[1, 3]], [[5, 7]]), [])


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
