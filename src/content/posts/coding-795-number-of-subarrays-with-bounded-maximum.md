---
title: 795. 区间子数组个数
tags: [单调栈, 数组, 双指针]
leetcode: 795
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 795. 区间子数组个数

## 题目描述

给你一个整数数组 `nums` 和两个整数 `left` 和 `right`。返回**「好」子数组**的数量。

**好子数组：** 一个子数组，其中**最大元素**在范围 `[left, right]` 内（包含边界）。

即：子数组的最大值不小于 `left`，且不大于 `right`。

**示例 1：**
```
输入：nums = [2,1,4,3], left = 2, right = 3
输出：3
解释：共有 3 个满足条件的子数组：[2]、[2,1]、[3]。
```

**示例 2：**
```
输入：nums = [2,9,2,5,6], left = 2, right = 8
输出：7
```

**提示：**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= left <= right <= 10^9`

## 解题思路

### 核心思想

「最大元素在 `[left, right]` 内」等价于「子数组**不含**大于 `right` 的元素，且**至少含一个**大于等于 `left` 的元素」。

枚举每个**右端点** `i`，统计以 `i` 结尾的好子数组个数再求和。为此需要两个关键位置：

- `lastGt`：最近一个**大于 `right`** 的元素下标。以 `i` 结尾的合法子数组的**左端点必须大于** `lastGt`（否则会引入超界元素）；
- `lastGe`：最近一个**大于等于 `left`** 的元素下标。子数组左端点只要**不大于** `lastGe`，就一定含有一个达标元素（保证最大值 ≥ left）。

于是以 `i` 结尾的好子数组数为：左端点可取 `(lastGt, lastGe]` 之间的整数，即 `max(0, lastGe - lastGt)`。

**右端点扫描示意（nums=[2,9,2,5,6], left=2, right=8）：**

```
i=0 x=2:  2<8 不超界，且 2>=2 → lastGe=0, lastGt=-1 → 贡献 0-(-1)=1 → [2]
i=1 x=9:  9>8 → lastGt=1, lastGe=0 → 贡献 max(0,0-1)=0
i=2 x=2:  2>=2 → lastGe=2, lastGt=1 → 贡献 2-1=1 → [2]
i=3 x=5:  5>=2 → lastGe=3, lastGt=1 → 贡献 3-1=2 → [2,5],[5]
i=4 x=6:  6>=2 → lastGe=4, lastGt=1 → 贡献 4-1=3 → [2,5,6],[5,6],[6]
总计 = 1+0+1+2+3 = 7
```

### 算法步骤

1. 初始化 `ans = 0, lastGt = -1, lastGe = -1`。
2. 遍历每个元素 `x = nums[i]`：
   - 若 `x > right`：更新 `lastGt = i`；
   - 若 `x >= left`：更新 `lastGe = i`；
   - `ans += max(0, lastGe - lastGt)`。
3. 返回 `ans`。

### 逐步举例

以题中示例 2 完整的贡献过程见上图，累计得 `7`。

再验证示例 1 `nums=[2,1,4,3], left=2, right=3`：

| i | x | 是否 >3 | 是否 ≥2 | lastGt | lastGe | 贡献 |
| - | - | ------- | ------- | ------ | ------ | ---- |
| 0 | 2 | 否 | 是 | -1 | 0 | 1 |
| 1 | 1 | 否 | 否 | -1 | 0 | 1 |
| 2 | 4 | 是 | 是 | 2 | 2 | 0 |
| 3 | 3 | 否 | 是 | 2 | 3 | 1 |

总计 `1+1+0+1 = 3`。

### 复杂度分析

- **时间复杂度**：O(N)，单次线性扫描。
- **空间复杂度**：O(1)，只维护两个位置变量。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def numSubarrayBoundedMax(self, nums: List[int], left: int, right: int) -> int:
        ans = 0
        last_gt = -1   # 最近一个 > right 的元素下标
        last_ge = -1   # 最近一个 >= left 的元素下标
        for i, x in enumerate(nums):
            if x > right:
                last_gt = i
            if x >= left:
                last_ge = i
            ans += max(0, last_ge - last_gt)
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
        self.assertEqual(Solution().numSubarrayBoundedMax([2, 1, 4, 3], 2, 3), 3)

    def test_example2(self):
        self.assertEqual(Solution().numSubarrayBoundedMax([2, 9, 2, 5, 6], 2, 8), 7)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
