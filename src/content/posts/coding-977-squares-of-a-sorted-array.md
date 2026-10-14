---
title: 977. 有序数组的平方
tags: [双指针]
leetcode: 977
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 977. 有序数组的平方

## 题目描述

> 题目链接: [LeetCode 977](https://leetcode.cn/problems/有序数组的平方/)

给你一个按 **非递减顺序** 排序的整数数组 `nums`，返回每个数字的平方组成的新数组，要求也按 **非递减顺序** 排序。

**示例：**
```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后为 [16,1,0,9,100]，排序后为 [0,1,9,16,100]。
```

## 解题思路

### 核心思想
虽然原数组有序，但负数平方后会"翻转"大小：负数越靠左、平方越大，正数越靠右、平方越大。**平方的最大值一定出在两端**（最左或最右），因此用**相向双指针**，每次取出两端平方中较大者，从答案数组**末尾向前**填充，即可天然保证非递减。

### 算法步骤
1. `left = 0, right = n - 1, pos = n - 1`
2. 当 `left <= right`：
   - 比较 `nums[left]**2` 与 `nums[right]**2`
   - 把较大的填入 `ans[pos]`，并移动对应指针
   - `pos -= 1`
3. 返回 `ans`

### 逐步举例
`nums = [-4,-1,0,3,10]`
| left | right | 平方比较 | 填入 | pos |
|------|-------|---------|------|-----|
| 0 | 4 | 16 vs 100 | 100 | 4 |
| 0 | 3 | 16 vs 9 | 16 | 3 |
| 1 | 3 | 1 vs 9 | 9 | 2 |
| 1 | 2 | 1 vs 0 | 1 | 1 |
| 2 | 2 | 0 vs 0 | 0 | 0 |

结果为 `[0,1,9,16,100]`

### 复杂度分析
- 时间复杂度：O(n)，一趟遍历
- 空间复杂度：O(1)，除答案数组外无额外空间

## 代码实现

```python
from typing import List


class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [0] * n
        left, right = 0, n - 1
        pos = n - 1
        while left <= right:
            l2 = nums[left] * nums[left]
            r2 = nums[right] * nums[right]
            if l2 > r2:
                ans[pos] = l2
                left += 1
            else:
                ans[pos] = r2
                right -= 1
            pos -= 1
        return ans
```

```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import unittest

from solution import Solution


class Test977(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(
            Solution().sortedSquares([-4, -1, 0, 3, 10]),
            [0, 1, 9, 16, 100],
        )

    def test_example2(self):
        self.assertEqual(
            Solution().sortedSquares([-7, -3, 2, 3, 11]),
            [4, 9, 9, 49, 121],
        )

    def test_single(self):
        self.assertEqual(Solution().sortedSquares([-2]), [4])


if __name__ == '__main__':
    unittest.main()
```