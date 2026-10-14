---
title: 11. 盛最多水的容器
tags: [双指针, 贪心]
leetcode: 11
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 11. 盛最多水的容器

> 题目链接: [LeetCode 11](https://leetcode.cn/problems/container-with-most-water/)

## 题目描述

给定一个长度为 `n` 的整数数组 `height`，每对 `(i, height[i])` 表示坐标轴上一个点、一条垂直线从 `x=i` 向上延伸到 `height[i]`。找出两条线，与 `x` 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。

不能倾斜容器。

**示例 1：**
```
输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组。两条线分别为 index 1 和 index 6，容器宽 5、高 8，水量 = 5*8 = 40（实际最优为 index1 与 index8，宽 7 高 7，即 49）。
```
**示例 2：**
```
输入：height = [1,1]
输出：1
```

## 解题思路

### 核心思想

容器的水量 = `min(height[left], height[right]) × (right - left)`。**瓶颈是较矮的那根线**。我们用两个指针 `left`、`right` 从两端向中间移动，每次只移动**较矮的一侧**——因为移动较矮一侧，才有机会遇到更高的线、让瓶颈升高；若移动较高一侧，宽度变小且瓶颈仍是原矮线，水量必然不增。

### 算法步骤

1. `left = 0, right = n-1`，记录当前最大水量 `ans = 0`。
2. 计算当前水量 `min(height[left], height[right]) × (right-left)`，更新 `ans`。
3. 若 `height[left] < height[right]`，则 `left += 1`（移动矮边）；否则 `right -= 1`。
4. 重复 2~3 直到 `left >= right`，返回 `ans`。

### 逐步举例

`height = [1,8,6,2,5,4,8,3,7]`：

| left | right | 矮边 | 宽 | 高 | 水量 | ans |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 8 | 1 | 8 | 1 | 8 | 8 |
| 1 | 8 | 8 | 7 | 7 | 49 | **49** |
| 1 | 7 | 3 | 6 | 3 | 18 | 49 |
| 1 | 6 | 6 | 5 | 6 | 30 | 49 |
| 1 | 5 | 4 | 4 | 4 | 16 | 49 |
| 2 | 5 | 6 | 3 | 4 | 12 | 49 |
| 3 | 5 | 5 | 2 | 4 | 8 | 49 |
| 4 | 5 | 5 | 1 | 4 | 4 | 49 |

最终 `ans = 49`。

### 复杂度分析

- **时间复杂度**：O(n)，`left/right` 各扫描一次。
- **空间复杂度**：O(1)。

## 代码实现

```python
from typing import List


class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        ans = 0
        while left < right:
            area = min(height[left], height[right]) * (right - left)
            ans = max(ans, area)
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return ans
```

```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(Solution().maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49)

    def test_two(self):
        self.assertEqual(Solution().maxArea([1, 1]), 1)

    def test_ascending(self):
        self.assertEqual(Solution().maxArea([1, 2, 4, 3]), 4)


if __name__ == '__main__':
    unittest.main()
```
