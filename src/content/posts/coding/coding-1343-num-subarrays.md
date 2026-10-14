---
title: 1343. 大小为 K 且平均值大于等于阈值的子数组数目
tags: [滑动窗口, 定长]
description: "返回长度为 k 且平均值 >= threshold 的连续子数组个数"
leetcode: 1343
studyplan: 滑动窗口与双指针
published: 2026-08-16T22:48:11+08:00
updated: 2026-08-16T22:48:11+08:00
category: 题解
notebook: coding
---


# 1343. 大小为 K 且平均值大于等于阈值的子数组数目

## 题目描述

给你一个整数数组 `arr` 和两个整数 `k` 和 `threshold`。

请你返回长度为 `k` 且平均值大于等于 `threshold` 的子数组数目。

**示例 1：**

```
输入：arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
输出：3
解释：子数组 [2,5,5],[5,5,5] 和 [5,5,8] 的平均值分别为 4,5 和 6。
```

**示例 2：**

```
输入：arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
输出：6
```

**提示：**

- `1 <= arr.length <= 10^5`
- `1 <= k <= arr.length`
- `0 <= threshold <= 10^4`

## 解法思路

**定长滑动窗口**。

**关键技巧**：条件「平均值 ≥ threshold」如果直接比较会涉及大量除法。由于窗口长度固定为 k，可以把它**等价变形为「窗口和 ≥ k × threshold」**，从而全部只用整数加法/比较，`k * threshold` 只需算一次。这样既避免了除法精度与性能开销，也不影响判断正确性。

沿用定长滑窗的 **入-更新-出** 三步：

1. **入**：右端点 `arr[i]` 进入窗口，窗口和 `win += arr[i]`；若 `i < k-1` 窗口长度不足 k，继续循环。
2. **更新**：窗口长度为 k，判断 `win >= k * threshold`，成立则 `ans += 1`。
3. **出**：左端点 `arr[i-k+1]` 离开窗口，`win -= arr[i-k+1]`。

**逐步举例**（`arr = [2,2,2,2,5,5,5,8]`, `k = 3`, `threshold = 4`）。先算阈值 `k*threshold = 12`，遍历并依次判断每个长 3 窗口：

| 窗口 | 窗口和 | ≥ 12 |
|---|---|---|
| [2,2,2] | 6 | ✗ |
| [2,2,2] | 6 | ✗ |
| [2,2,5] | 9 | ✗ |
| [2,5,5] | 12 | ✓ |
| [5,5,5] | 15 | ✓ |
| [5,5,8] | 18 | ✓ |

满足条件的子数组共 3 个，与预期一致；全程只用整数加法比较，没有除法。

> 思路与写法参考灵茶山艾府《【模板】定长滑动窗口》（入-更新-出套路）及对应题解。

## 复杂度分析

- 时间复杂度：O(n)，其中 n 是 `arr` 长度，每步 O(1)。
- 空间复杂度：O(1)。

## 代码实现

```python
class Solution:
    def numOfSubarrays(self, arr: list[int], k: int, threshold: int) -> int:
        target = k * threshold
        cur = sum(arr[:k])
        ans = 1 if cur >= target else 0
        for i in range(k, len(arr)):
            cur += arr[i] - arr[i - k]
            if cur >= target:
                ans += 1
        return ans
```

```python
import unittest


class TestNumOfSubarrays(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(
            self.solution.numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4), 3
        )

    def test_example2(self):
        self.assertEqual(
            self.solution.numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5), 6
        )

    def test_none(self):
        self.assertEqual(self.solution.numOfSubarrays([1, 1, 1], 2, 5), 0)


if __name__ == "__main__":
    unittest.main()
```