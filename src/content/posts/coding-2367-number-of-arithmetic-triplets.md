---
title: 2367. 等差三元组的数目
tags: [双指针, 哈希表]
leetcode: 2367
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 2367. 等差三元组的数目

## 题目描述

给你一个下标从 0 开始、**严格递增**的整数数组 `nums` 和一个正整数 `diff`。如果满足下述全部条件，则三元组 `(i, j, k)` 就是一个**等差三元组**：

- `i < j < k`，
- `nums[j] - nums[i] == diff`，
- `nums[k] - nums[j] == diff`。

返回数组 `nums` 中**等差三元组的数目**。

**示例 1：**
```
输入：nums = [0,1,4,6,7,10], diff = 3
输出：2
解释：(1, 2, 4) 是等差三元组：7 - 4 == 3 且 4 - 1 == 3。
     (2, 4, 5) 是等差三元组：10 - 7 == 3 且 7 - 4 == 3。
```

**示例 2：**
```
输入：nums = [4,5,6,7,8,9], diff = 2
输出：2
解释：(0, 2, 4) 是等差三元组：8 - 6 == 2 且 6 - 4 == 2。
     (1, 3, 5) 是等差三元组：9 - 7 == 2 且 7 - 5 == 2。
```

**提示：**
- `3 <= nums.length <= 200`
- `0 <= nums[i] <= 200`
- `1 <= diff <= 50`
- `nums` 严格递增

## 解题思路

### 核心思想

数组**严格递增**，因此三个指针 `i < j < k` 对应的值单调上升，且一旦 `nums[j] - nums[i] > diff`，随着 `i` 增大差值单调不增。这天然适合用**三指针**线性扫描。

枚举三元组最大的 `k`：用指针 `j` 找到「与 `nums[k]` 的差为 `diff`」的中间元素（即 `nums[k] - nums[j] == diff`），再用指针 `i` 找到「与 `nums[j]` 的差为 `diff`」的最小元素（`nums[j] - nums[i] == diff`）。由于三个值各自相差 `diff`，找到一次就构成一个等差三元组。

**三指针同步推进示意（nums=[0,1,4,6,7,10], diff=3）：**

```
k=4(nums[4]=7)时:
  让 j 前进，直到 nums[4]-nums[j] <= 3
    nums[4]-nums[2]=7-4=3 → j=2，差==diff
  再让 i 前进，直到 nums[2]-nums[i] <= 3
    nums[2]-nums[1]=4-1=3 → i=1，差==diff
  计数 +1  → 三元组 (1,2,4)
k=5(nums[5]=10)时:
  让 j 前进，直到 nums[5]-nums[j] <= 3 → j=4(nums[4]=7), 差=3
  让 i 前进，直到 nums[4]-nums[i] <= 3 → i=2(nums[2]=4), 差=3
  计数 +1  → 三元组 (2,4,5)
总数 = 2
```

### 算法步骤

1. 初始化指针 `i = 0, j = 0`，答案 `ans = 0`。
2. 遍历 `k` 从 0 到 `n-1`，记 `x = nums[k]`：
   - 内层一：`while j < k and x - nums[j] > diff` 时 `j++`；
   - 若 `j == k` 或 `x - nums[j] != diff`，说明没有「与 x 相差 diff」的 j，跳过；
   - 内层二：`while i < j and nums[j] - nums[i] > diff` 时 `i++`；
   - 若 `i < j` 且 `nums[j] - nums[i] == diff`，说明发现 `(i, j, k)` 等差三元组，`ans++`。
3. 返回 `ans`。

### 逐步举例

以 `nums=[0,1,4,6,7,10], diff=3` 为例，只展示需计数的两步：

| k | x=nums[k] | 找 j（x-nums[j]==3） | 找 i（nums[j]-nums[i]==3） | 计数 |
| - | --------- | --------------------- | --------------------------- | ---- |
| 4 | 7 | nums[2]=4 → 差3，j=2 | nums[1]=1 → 差3，i=1 | +1 |
| 5 | 10 | nums[4]=7 → 差3，j=4 | nums[2]=4 → 差3，i=2 | +1 |

中间值（4、7）未被重复计入，各被扫描常数次，源于严格递增数组保证的单调性。

### 复杂度分析

- **时间复杂度**：O(N)，`i`、`j`、`k` 三个指针各自单调右移，总体线性。
- **空间复杂度**：O(1)，仅使用常数额外空间。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def arithmeticTriplets(self, nums: List[int], diff: int) -> int:
        n = len(nums)
        i = j = 0
        ans = 0
        for k in range(n):
            x = nums[k]
            while j < k and x - nums[j] > diff:
                j += 1
            if j == k or x - nums[j] != diff:
                continue
            while i < j and nums[j] - nums[i] > diff:
                i += 1
            if i < j and nums[j] - nums[i] == diff:
                ans += 1
        return ans
```
```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().arithmeticTriplets([0, 1, 4, 6, 7, 10], 3), 2)

    def test_example2(self):
        self.assertEqual(Solution().arithmeticTriplets([4, 5, 6, 7, 8, 9], 2), 2)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
