---
title: 26. 删除有序数组中的重复项
badges:
  - 简单
  - 双指针
published: 2024-01-01T00:00:00+08:00
updated: 2024-01-01T00:00:00+08:00
category: 单序列双指针
notebook: coding
---


# 26. 删除有序数组中的重复项

## 题目描述

给你一个**非严格递增排列**的数组 `nums`，请你**原地**删除重复出现的元素，使每个元素只出现一次，返回删除后数组的新长度。元素的相对顺序应该保持**一致**。

不要使用额外的数组空间，必须仅使用 O(1) 额外空间并**原地**修改输入数组。

**示例 1：**

```
输入：nums = [1,1,2]
输出：2, nums = [1,2,_]
```

**示例 2：**

```
输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4]
```

## 解题思路

### 核心思想

快慢双指针：`left` 指向"下一个不重复元素应写入的位置"，`right` 扫描数组。因为数组有序，只要 `nums[right]` 不等于前一个已经固定好的元素 `nums[left-1]`，就说明遇到了新的不重复值。

### 算法步骤

1. `left` 从 1 开始（`nums[0]` 一定保留），`right` 从 1 遍历到 `n-1`。
2. 若 `nums[right] != nums[left-1]`，则说明发现新元素，`nums[left] = nums[right]` 并 `left += 1`。
3. 最后返回 `left`。

关键点：比较对象是 `nums[left-1]`（已固定区间的最后一个元素），而不是 `nums[right-1]`，这样即便中间有多个重复也能正确跳过。

### 逐步举例

以 `nums = [0,0,1,1,1,2,2,3,3,4]` 为例：

| right | nums[right] | 与 nums[left-1] 比较 | 操作 | nums 序列 | left |
|-------|-------------|----------------------|------|-----------|------|
| 1 | 0 | ==0 | 跳过 | [0,0,1,...] | 1 |
| 2 | 1 | !=0 | 写 nums[1]=1 | [0,1,1,...] | 2 |
| 3 | 1 | ==1 | 跳过 | ... | 2 |
| 4 | 1 | ==1 | 跳过 | ... | 2 |
| 5 | 2 | !=1 | 写 nums[2]=2 | [0,1,2,...] | 3 |
| 6 | 2 | ==2 | 跳过 | ... | 3 |
| 7 | 3 | !=2 | 写 nums[3]=3 | [0,1,2,3,...] | 4 |
| 8 | 3 | ==3 | 跳过 | ... | 4 |
| 9 | 4 | !=3 | 写 nums[4]=4 | [0,1,2,3,4] | 5 |

返回 5，前五位 `[0,1,2,3,4]`，符合预期。

### 复杂度分析

- 时间复杂度：O(n)。
- 空间复杂度：O(1)。

## 代码实现

```python
from typing import List


class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        left = 1
        for right in range(1, len(nums)):
            if nums[right] != nums[left - 1]:
                nums[left] = nums[right]
                left += 1
        return left
```

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        nums = [1, 1, 2]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 2)
        self.assertEqual(nums[:k], [1, 2])

    def test_multi_dup(self):
        nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 5)
        self.assertEqual(nums[:k], [0, 1, 2, 3, 4])

    def test_no_dup(self):
        nums = [1, 2, 3, 4]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 4)

    def test_single(self):
        nums = [5]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 1)


if __name__ == "__main__":
    unittest.main()
```