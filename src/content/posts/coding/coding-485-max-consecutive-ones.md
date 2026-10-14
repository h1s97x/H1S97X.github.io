---
title: 485. 最大连续 1 的个数
tags: [双指针, 数组]
leetcode: 485
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 485. 最大连续 1 的个数

## 题目描述

给定一个二进制数组 `nums`，计算其中最大连续 `1` 的个数。

**示例 1：**
```
输入：nums = [1,1,0,1,1,1]
输出：3
解释：开头的两位和最后的三位都是连续 1，所以最大连续 1 的个数是 3。
```

**提示：**
- `1 <= nums.length <= 10^5`
- `nums[i]` 不是 `0` 就是 `1`

## 解题思路

### 核心思想

用**分组循环**把数组按连续 `1` 分段：找到一段 `1` 的起点 `i`，内层 `j` 向后扩展直到遇到 `0`，段长度 `j - i + 1` 更新答案，然后 `i` 跳到 `j+1`。

**分组示意（nums = [1,1,0,1,1,1]）：**

```
[1,1] | 0 | [1,1,1]
  2           3   → 最大 3
```

### 算法步骤

1. 初始化 `ans = 0`，`i = 0`。
2. 当 `i < n` 时：
   - 若 `nums[i] == 0`，`i++` 跳过；
   - 否则 `j = i`，内层 `while` 扩展连续 `1`；
   - `ans = max(ans, j - i + 1)`，`i = j + 1`。
3. 返回 `ans`。

### 逐步举例

以 `nums = [1,1,0,1,1,1]` 为例：

| 段 | 区间 | 长度 |
| -- | ---- | ---- |
| 11 | [0,1] | 2 |
| 111 | [3,5] | **3** |

最大为 `3`。

### 复杂度分析

- **时间复杂度**：O(N)，单次线性扫描。
- **空间复杂度**：O(1)。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        i = 0
        while i < n:
            if nums[i] == 0:
                i += 1
                continue
            j = i
            while j + 1 < n and nums[j + 1] == 1:
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
    def test_example(self):
        self.assertEqual(Solution().findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3)

    def test_all_ones(self):
        self.assertEqual(Solution().findMaxConsecutiveOnes([1, 1, 1]), 3)

    def test_all_zeros(self):
        self.assertEqual(Solution().findMaxConsecutiveOnes([0, 0, 0]), 0)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
