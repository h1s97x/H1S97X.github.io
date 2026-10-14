---
title: 27. 移除元素
badges:
  - 简单
  - 双指针
published: 2024-01-01T00:00:00+08:00
updated: 2024-01-01T00:00:00+08:00
category: 单序列双指针
notebook: coding
---


# 27. 移除元素

## 题目描述

给你一个数组 `nums` 和一个值 `val`，你需要**原地**移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，必须仅使用 O(1) 额外空间并**原地**修改输入数组。元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**示例 1：**

```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2,_,_]
```

**示例 2：**

```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3,_,_,_]
```

## 解题思路

### 核心思想

快慢双指针：`left` 指向"下一个非 `val` 元素应写入的位置"，`right` 扫描数组，凡是 `!= val` 的元素就往前搬运。

### 算法步骤

1. `left` 初始为 0，表示有效前缀的长度 / 下一个可写位置。
2. `right` 从 0 遍历到 `n-1`：
   - 若 `nums[right] != val`，则 `nums[left] = nums[right]`，`left += 1`。
   - 否则跳过（该位置就是要被移除的元素）。
3. 返回 `left`，即移除后数组的长度。

由于直接覆盖写回，前面被 `val` 占据的位置会被后面的有效元素填满，无需真的删除。

### 逐步举例

以 `nums = [3,2,2,3], val = 3` 为例：

| right | nums[right] | 操作 | nums 序列 | left |
|-------|-------------|------|-----------|------|
| 0 | 3 | 跳过（==val） | [3,2,2,3] | 0 |
| 1 | 2 | 写 nums[0]=2 | [2,2,2,3] | 1 |
| 2 | 2 | 写 nums[1]=2 | [2,2,2,3] | 2 |
| 3 | 3 | 跳过 | [2,2,2,3] | 2 |

返回 2，前两位为 `[2,2]`，符合预期。

### 复杂度分析

- 时间复杂度：O(n)。
- 空间复杂度：O(1)。

## 代码实现

```python
from typing import List


class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        left = 0
        for right in range(len(nums)):
            if nums[right] != val:
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
        nums = [3, 2, 2, 3]
        k = Solution().removeElement(nums, 3)
        self.assertEqual(k, 2)
        self.assertEqual(nums[:k], [2, 2])

    def test_more_occurrences(self):
        nums = [0, 1, 2, 2, 3, 0, 4, 2]
        k = Solution().removeElement(nums, 2)
        self.assertEqual(k, 5)
        self.assertEqual(nums[:k], [0, 1, 3, 0, 4])

    def test_no_val(self):
        nums = [1, 2, 3]
        k = Solution().removeElement(nums, 0)
        self.assertEqual(k, 3)

    def test_all_val(self):
        nums = [2, 2, 2]
        k = Solution().removeElement(nums, 2)
        self.assertEqual(k, 0)


if __name__ == "__main__":
    unittest.main()
```