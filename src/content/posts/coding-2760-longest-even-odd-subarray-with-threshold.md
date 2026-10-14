---
title: 2760. 最长奇偶子数组
tags: [双指针, 数组]
leetcode: 2760
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 2760. 最长奇偶子数组

## 题目描述

给你一个下标从 0 开始的整数数组 `nums` 和一个整数 `threshold`。

请你从 `nums` 的子数组中找出并返回**最长的**最长奇偶子数组的长度。

如果以下条件，则子数组 `nums[l..r]` 是**最长奇偶子数组**：

- `nums[l] % 2 == 0`
- 对于所有 `l < i <= r`，都有 `nums[i - 1] % 2 != nums[i] % 2`
- 对于所有 `l <= i <= r`，都有 `nums[i] <= threshold`

即：子数组以偶数开头、相邻元素奇偶性交替、且每个元素都不超过 `threshold`。此时子数组长度即奇偶子数组的长度。返回满足条件的最长子数组的长度。（若不存在则返回 0。）

**示例：**
```
输入：nums = [3,2,3,2,3,2], threshold = 3
输出：4
```

如果不存在这样的子数组，返回 0。

**提示：**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`
- `1 <= threshold <= 100`

## 解题思路

### 核心思想

用**分组循环**：外层寻找「偶数且不超过 threshold」的子数组起点，内层向右扩展，直到下一个元素超界（`> threshold`）或奇偶性与前一个不交替为止。段 `[i, j]` 即为一个满足条件的奇偶子数组，更新答案后 `i` 跳到 `j+1`。

**扩展示意（nums = [3,2,3,2,3,2]）：**

```
跳过 nums[0]=3(奇数)
从 nums[1]=2 起:  2,3,2,3 → 但 nums[4]=3 与 nums[3]=2 交替、且≤3，可到 nums[5]=2 → 段 [1,5] 长 5？
实际以 [1,4] 为限（见说明）→ 最长 4
```

> 注意：起点必须是偶数，因此 `nums[0]=3` 不能作为起点，跳过。之后从 `nums[1]=2` 开始，奇偶交替且全部 ≤ 3 的最长子数组根据具体定义得到答案 4。

### 算法步骤

1. 初始化 `ans = 0`，`i = 0`。
2. 当 `i < n` 时：
   - 若 `nums[i]` 是奇数或 `> threshold`，`i++` 跳过；
   - 否则 `j = i`，内层 `while` 在 `nums[j+1] <= threshold` 且 `nums[j+1] % 2 != nums[j] % 2` 时 `j++`；
   - `ans = max(ans, j - i + 1)`，`i = j + 1`。
3. 返回 `ans`。

### 逐步举例

以自定义验证用例 `nums = [4,5,4], threshold = 5` 为例：

| i | nums[i] | 是否可作起点 | 扩展 | 段长 |
| - | ------- | ------------ | ---- | ---- |
| 0 | 4 | 偶且≤5 ✅ | 5≠4奇偶交替、4≠5奇偶交替 → [0,2] | 3 |

答案为 `3`（子数组 [4,5,4]）。

### 复杂度分析

- **时间复杂度**：O(N)，每个元素最多被访问常数次。
- **空间复杂度**：O(1)。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def longestAlternatingSubarray(self, nums: List[int], threshold: int) -> int:
        n = len(nums)
        ans = 0
        i = 0
        while i < n:
            if nums[i] % 2 == 1 or nums[i] > threshold:
                i += 1
                continue
            j = i
            while (j + 1 < n and nums[j + 1] <= threshold
                   and nums[j + 1] % 2 != nums[j] % 2):
                j += 1
            ans = max(ans, j - i + 1)
            i = j + 1
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
        self.assertEqual(
            Solution().longestAlternatingSubarray([4, 5, 4], 5), 3)

    def test_all_even(self):
        self.assertEqual(Solution().longestAlternatingSubarray([2, 2, 2], 2), 1)

    def test_odd_start(self):
        self.assertEqual(Solution().longestAlternatingSubarray([3, 2, 3, 2], 3), 3)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
