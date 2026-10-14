---
title: 2444. 统计定界子数组的数目
tags: [滑动窗口, 数组, 双指针]
leetcode: 2444
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 2444. 统计定界子数组的数目

## 题目描述

给你一个整数数组 `nums` 和两个整数 `minK` 以及 `maxK`。

`nums` 的**定界子数组**是满足下述条件之一的子数组：

- 子数组中的**最小值**等于 `minK`；
- 子数组中的**最大值**等于 `maxK`。

返回定界子数组的数目。

**示例 1：**
```
输入：nums = [1,3,5,2,7,5], minK = 1, maxK = 5
输出：2
解释：定界子数组是 [1,3,5] 和 [1,3,5,2]。
```

**示例 2：**
```
输入：nums = [1,1,1,1], minK = 1, maxK = 1
输出：10
解释：每个子数组都满足条件（最小值与最大值均为 1）。
```

**提示：**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i], minK, maxK <= 10^6`

## 解题思路

### 核心思想

枚举每个**右端点** `i`，统计「以 `i` 结尾且是定界子数组」的个数，再求和。

满足条件的子数组必须：
- **不含**越界元素（`< minK` 或 `> maxK`）——记 `bad` 为最近一个越界元素下标，左端点必须 `> bad`；
- **同时包含**最小值和最大值——记 `mn` 为最近一个等于 `minK` 的下标、`mx` 为最近一个等于 `maxK` 的下标。

若子数组左端点取 `[bad+1, min(mn, mx)]` 之间的任一值时，该区间的 `[最小值,最大值]` 都能恰好覆盖 `minK` 和 `maxK` 且不越界，因此都是定界子数组。个数为 `max(0, min(mn, mx) - bad)`。

**右端点扫描示意（nums=[1,3,5,2,7,5], minK=1, maxK=5）：**

```
i=0 x=1:  mn=0, mx=-1 → min=-1 → 贡献 max(0,-1-(-1))=0
i=1 x=3:  mn=0, mx=-1 → 贡献 0
i=2 x=5:  mn=0, mx=2  → min=0 → 贡献 max(0,0-(-1))=1 → [1,3,5]
i=3 x=2:  mn=0, mx=2  → min=0 → 贡献 max(0,0-(-1))=1 → [1,3,5,2]
i=4 x=7:  7>5 越界 → bad=4, mn=0, mx=2 → 贡献 max(0,0-4)=0
i=5 x=5:  mn=0, mx=5 → min=0 → 贡献 max(0,0-4)=0
总计 = 2
```

### 算法步骤

1. 初始化 `ans = 0, bad = -1, mn = -1, mx = -1`。
2. 遍历每个 `x = nums[i]`：
   - 若 `x < minK or x > maxK`：`bad = i`；
   - 若 `x == minK`：`mn = i`；
   - 若 `x == maxK`：`mx = i`；
   - `ans += max(0, min(mn, mx) - bad)`。
3. 返回 `ans`。

### 逐步举例

以 `nums=[1,1,1,1], minK=1, maxK=1` 为例：

| i | x | bad | mn | mx | min(mn,mx)-bad | 贡献 |
| - | - | --- | -- | -- | -------------- | ---- |
| 0 | 1 | -1 | 0 | 0 | 0-(-1)=1 | 1 |
| 1 | 1 | -1 | 1 | 1 | 1-(-1)=2 | 2 |
| 2 | 1 | -1 | 2 | 2 | 2-(-1)=3 | 3 |
| 3 | 1 | -1 | 3 | 3 | 3-(-1)=4 | 4 |

总计 `1+2+3+4 = 10`，即所有 10 个子数组（n(n+1)/2）都满足条件。

### 复杂度分析

- **时间复杂度**：O(N)，单次线性扫描。
- **空间复杂度**：O(1)，只维护几个位置变量。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def countSubarrays(self, nums: List[int], minK: int, maxK: int) -> int:
        ans = 0
        bad = -1  # 最近一个越界（<minK 或 >maxK）的下标
        mn = -1   # 最近一个等于 minK 的下标
        mx = -1   # 最近一个等于 maxK 的下标
        for i, x in enumerate(nums):
            if x < minK or x > maxK:
                bad = i
            if x == minK:
                mn = i
            if x == maxK:
                mx = i
            ans += max(0, min(mn, mx) - bad)
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
        self.assertEqual(Solution().countSubarrays([1, 3, 5, 2, 7, 5], 1, 5), 2)

    def test_example2(self):
        self.assertEqual(Solution().countSubarrays([1, 1, 1, 1], 1, 1), 10)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
