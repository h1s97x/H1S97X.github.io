---
title: 88. 合并两个有序数组
tags: [双指针, 数组, 排序]
leetcode: 88
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 88. 合并两个有序数组

## 题目描述

给定两个**非递减顺序**排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n`，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你**合并** `nums2` 到 `nums1`（直接原地修改），使合并后的数组同样按**非递减顺序**排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 0，应忽略。`nums2` 的长度为 `n`。

**示例 1：**
```
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6]。
```

**示例 2：**
```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
```

**提示：**
- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`

## 解题思路

### 核心思想

用**从后往前的双指针**完成原地合并。若从前往后归并，会覆盖 `nums1` 尚未处理的元素，破坏原值；而从后往前写（填到数组末尾的空位），不会覆盖任何待处理元素——因为后方全是空位（0）。

用三个指针：

- `p1 = m - 1`：指向 `nums1` 有效部分末尾；
- `p2 = n - 1`：指向 `nums2` 末尾；
- `tail = m + n - 1`：指向 `nums1` 末尾空位，待填位置。

每次把 `nums1[p1]` 和 `nums2[p2]` 中较大者放到 `nums1[tail]`，并让对应指针和 `tail` 前移。由于两个数组都是递增的，从尾部取最大者就是归并的正确顺序，即不断把较大元素"从后向前"填入。

**归并过程示意（nums1=[1,2,3,0,0,0], nums2=[2,5,6]）：**

```
nums1:  [1,2,3,0,0,0]     比较 3 和 6 → 放 6
        [1,2,3,0,0,6]     比较 3 和 5 → 放 5
        [1,2,3,0,5,6]     比较 3 和 2 → 放 3
        [1,2,0,3,5,6]     比较 2 和 2 → 放 2
        [1,2,2,3,5,6]     比较 1 和 2 → 放 2
        最终 [1,2,2,3,5,6]
```

### 算法步骤

1. 初始化 `p1 = m-1, p2 = n-1, tail = m+n-1`。
2. 当 `p2 >= 0` 时循环（`nums2` 全部放入即可，若 `nums1` 提前放完，剩下的 `nums2` 依次填入空位）：
   - 若 `p1 >= 0` 且 `nums1[p1] > nums2[p2]`：`nums1[tail] = nums1[p1]`，`p1--`；
   - 否则：`nums1[tail] = nums2[p2]`，`p2--`；
   - `tail--`。
3. 完成，`nums1` 即为合并后的有序数组。

### 逐步举例

以 `nums1=[1,2,3,0,0,0] (m=3), nums2=[2,5,6] (n=3)` 为例：

| 步骤 | p1 | p2 | tail | nums1[p1] vs nums2[p2] | 填入 | nums1 |
| ---- | -- | -- | ---- | ---------------------- | ---- | ----- |
| 1 | 2 | 2 | 5 | 3 vs 6，6 更大 | 6 | [1,2,3,0,0,6] |
| 2 | 2 | 1 | 4 | 3 vs 5，5 更大 | 5 | [1,2,3,0,5,6] |
| 3 | 2 | 0 | 3 | 3 vs 2，3 更大 | 3 | [1,2,0,3,5,6] |
| 4 | 1 | 0 | 2 | 2 vs 2，相等取 nums2 | 2 | [1,2,2,3,5,6] |
| 5 | 1 | -1 | 1 | p2<0，结束 | - | [1,2,2,3,5,6] |

### 复杂度分析

- **时间复杂度**：O(M + N)，每个元素只处理一次。
- **空间复杂度**：O(1)，原地修改，仅用常数额外空间。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        p1, p2 = m - 1, n - 1
        tail = m + n - 1
        while p2 >= 0:
            if p1 >= 0 and nums1[p1] > nums2[p2]:
                nums1[tail] = nums1[p1]
                p1 -= 1
            else:
                nums1[tail] = nums2[p2]
                p2 -= 1
            tail -= 1
```
```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_merge(self):
        nums1 = [1, 2, 3, 0, 0, 0]
        Solution().merge(nums1, 3, [2, 5, 6], 3)
        self.assertEqual(nums1, [1, 2, 2, 3, 5, 6])

    def test_n_is_zero(self):
        nums1 = [1]
        Solution().merge(nums1, 1, [], 0)
        self.assertEqual(nums1, [1])

    def test_m_is_zero(self):
        nums1 = [0]
        Solution().merge(nums1, 0, [1], 1)
        self.assertEqual(nums1, [1])


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
