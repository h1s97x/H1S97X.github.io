---
title: 15. 三数之和
tags: [双指针, 排序]
leetcode: 15
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 15. 三数之和

> 题目链接: [LeetCode 15](https://leetcode.cn/problems/3sum/)

## 题目描述

给你一个整数数组 `nums`，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k`，同时还满足 `nums[i] + nums[j] + nums[k] == 0`。请你返回所有和为 0 且不重复的三元组。

答案中不可以包含重复的三元组。

**示例 1：**
```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```
**示例 2：**
```
输入：nums = [0,1,1]
输出：[]
```
**示例 3：**
```
输入：nums = [0,0,0]
输出：[[0,0,0]]
```

## 解题思路

### 核心思想

先**排序**，固定第一个数 `nums[i]`，再用**双指针**在 `[i+1, n-1]` 内找两数之和等于 `-nums[i]`。排序让双指针可以有序移动，也让去重变得简单：跳过重复的元素避免产生重复三元组。

### 算法步骤

1. 排序 `nums`。
2. 遍历 `i`（`0` 到 `n-3`）：
   - 若 `i > 0` 且 `nums[i] == nums[i-1]`，跳过（去重）。
   - `left=i+1, right=n-1, target=-nums[i]`。
   - 双指针寻找两数之和等于 `target`：
     - 相等：加入答案，并移动 `left/right` 跳过重复值。
     - 小于 `target`：`left += 1`。
     - 大于 `target`：`right -= 1`。
3. 返回答案。

### 逐步举例

`nums = [-1,0,1,2,-1,-4]`，排序后 `[-4,-1,-1,0,1,2]`：

- `i=0`，`nums[0]=-4`，`target=4`。双指针 `[-1,2]→1, [0,2]→2, [1,2]→3` 都 < 4，找不到。
- `i=1`，`nums[1]=-1`，`target=1`。`left=2,right=5`：`[-1,2]→1 == target` ✅ 得 `[-1,-1,2]`；`[0,2]→2` > 1 → `right=3`；`[0,1]→1 == target` ✅ 得 `[-1,0,1]`。
- `i=2`，`nums[2]=-1 == nums[1]` 跳过。

答案 `[[-1,-1,2],[-1,0,1]]`。

### 复杂度分析

- **时间复杂度**：O(n²)，排序 O(n log n)，双指针双层循环。
- **空间复杂度**：O(1)（不计排序栈空间，排序通常 O(log n)）。

## 代码实现

```python
from typing import List


class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        ans = []
        for i in range(n - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, n - 1
            target = -nums[i]
            while left < right:
                s = nums[left] + nums[right]
                if s == target:
                    ans.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif s < target:
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
        res = Solution().threeSum([-1, 0, 1, 2, -1, -4])
        expected = [[-1, -1, 2], [-1, 0, 1]]
        self.assertEqual(sorted(res), sorted(expected))

    def test_no_solution(self):
        self.assertEqual(Solution().threeSum([0, 1, 1]), [])

    def test_zeros(self):
        self.assertEqual(Solution().threeSum([0, 0, 0, 0]), [[0, 0, 0]])


if __name__ == '__main__':
    unittest.main()
```
