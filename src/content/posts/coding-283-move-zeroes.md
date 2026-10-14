---
title: 283. 移动零
badges:
  - 简单
  - 双指针
published: 2024-01-01T00:00:00+08:00
updated: 2024-01-01T00:00:00+08:00
category: 单序列双指针
notebook: coding
---


# 283. 移动零

## 题目描述

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

注意：必须在不复制数组的情况下原地对数组进行操作。

**示例 1：**

```
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**示例 2：**

```
输入: nums = [0]
输出: [0]
```

**提示：**

- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## 解题思路

### 核心思想

双指针将所有非零元素"左倾"到数组头部，剩下的位置自然就是零。

### 算法步骤

1. 用 `left` 指针指向**下一个应存放非零元素的位置**（初始为 0）。
2. 用 `right` 指针从左到右扫描整个数组。
3. 当 `nums[right] != 0` 时，把 `nums[right]` 与 `nums[left]` 交换，然后 `left` 右移。

经过一轮扫描后，所有非零元素都被换到了 `[0, left)` 区间，且相对顺序不变；它们各自原来的位置留下的是 0（或左移前被换过来的 0），因此所有 0 都到了末尾。

### 逐步举例

以 `nums = [0,1,0,3,12]` 为例：

| right | nums[right] | 操作 | nums 序列 | left |
|-------|-------------|------|-----------|------|
| 0 | 0 | 跳过 | [0,1,0,3,12] | 0 |
| 1 | 1 | 交换 nums[0]<->nums[1] | [1,0,0,3,12] | 1 |
| 2 | 0 | 跳过 | [1,0,0,3,12] | 1 |
| 3 | 3 | 交换 nums[1]<->nums[3] | [1,3,0,0,12] | 2 |
| 4 | 12 | 交换 nums[2]<->nums[4] | [1,3,12,0,0] | 3 |

最终得到 `[1,3,12,0,0]`，与预期一致。

### 复杂度分析

- 时间复杂度：O(n)，只需一次遍历。
- 空间复杂度：O(1)，原地交换。

## 代码实现

```python
from typing import List


class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        left = 0
        for right in range(len(nums)):
            if nums[right] != 0:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        nums = [0, 1, 0, 3, 12]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [1, 3, 12, 0, 0])

    def test_all_zero(self):
        nums = [0, 0, 0]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [0, 0, 0])

    def test_leading_zeros(self):
        nums = [0, 0, 1]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [1, 0, 0])

    def test_single(self):
        nums = [0]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [0])


if __name__ == "__main__":
    unittest.main()
```