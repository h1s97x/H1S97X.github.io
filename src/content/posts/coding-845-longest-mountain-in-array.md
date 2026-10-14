---
title: 845. 数组中的最长山脉
tags: [双指针, 数组]
leetcode: 845
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 845. 数组中的最长山脉

## 题目描述

把符合下列属性的数组 `arr` 称为**山脉数组**：

- `arr.length >= 3`
- 存在下标 `i`（`0 < i < arr.length - 1`）满足：
  - `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
  - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

给出一个整数数组 `arr`，返回最长山脉子数组的长度。如果不存在山脉子数组，返回 `0`。

**示例 1：**
```
输入：arr = [2,1,4,7,3,2,5]
输出：5
解释：最长的山脉子数组是 [1,4,7,3,2]，长度为 5。
```

**示例 2：**
```
输入：arr = [2,2,2]
输出：0
```

**提示：**
- `1 <= arr.length <= 10^4`
- `0 <= arr[i] <= 10^4`

## 解题思路

### 核心思想

一座山的特征是在某处先**严格上升**再**严格下降**，因此只需枚举每个可能成为「峰顶」的位置 `i`（满足 `arr[i-1] < arr[i] > arr[i+1]`）。对每个峰顶分别向左、向右扩展下降侧（即左边递增的尾部、右边递减的尾部），得到以该峰为最高点的最长山脉长度 `right - left + 1`，更新答案后跳过该段，避免重复计算。

**山峰示意（arr = [2,1,4,7,3,2,5]）：**

```
2  1  4  7  3  2  5
         ↑
        峰顶=7
       向左扩展: 1,4  向右扩展: 3,2
       整座山: [1,4,7,3,2] 长 5
```

### 算法步骤

1. 初始化 `ans = 0`，`i = 1`。
2. 当 `i < n - 1` 时：
   - 若 `arr[i-1] < arr[i] > arr[i+1]`：
     - `left = i - 1`，向左 `while left > 0 and arr[left-1] < arr[left]` 时 `left--`；
     - `right = i + 1`，向右 `while right+1 < n and arr[right+1] < arr[right]` 时 `right++`；
     - `ans = max(ans, right - left + 1)`，`i = right + 1`；
   - 否则 `i++`。
3. 返回 `ans`。

### 逐步举例

以 `arr = [2,1,4,7,3,2,5]` 为例：

- `i=1`: `arr[0]=2` 不满足 `arr[0]<arr[1]`（2>1），`i=2`；
- `i=2`: `1 < 4 > 7`? `4>7` 不成立，`i=3`；
- `i=3`: `4 < 7 > 3` ✅，left=2，左扩 `arr[1]=1 < arr[2]=4` 继续到 left=1，`arr[0]=2 < arr[1]=1`? 否停；right=4，右扩 `arr[5]=2 < arr[4]=3` 到 right=5，`arr[6]=5 < arr[5]=2`? 否停。长度 `5-1+1=5`，`ans=5`，`i=6`；
- 循环结束，返回 `5`。

### 复杂度分析

- **时间复杂度**：O(N)，每个位置最多被访问常数次（扩展过的段直接跳过）。
- **空间复杂度**：O(1)。

## 代码实现

{{% highlight python %}}
```python
from typing import List


class Solution:
    def longestMountain(self, arr: List[int]) -> int:
        n = len(arr)
        ans = 0
        i = 1
        while i < n - 1:
            if arr[i - 1] < arr[i] > arr[i + 1]:
                left = i - 1
                while left > 0 and arr[left - 1] < arr[left]:
                    left -= 1
                right = i + 1
                while right + 1 < n and arr[right + 1] < arr[right]:
                    right += 1
                ans = max(ans, right - left + 1)
                i = right + 1
            else:
                i += 1
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
        self.assertEqual(Solution().longestMountain([2, 1, 4, 7, 3, 2, 5]), 5)

    def test_example2(self):
        self.assertEqual(Solution().longestMountain([2, 2, 2]), 0)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
