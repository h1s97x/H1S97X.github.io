---
title: "1838. 最高频元素的频数"
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 排序
description: "排序后滑动窗口，判断窗口内元素能否在 k 次操作内全部变成 nums[right]"
leetcode: 1838
studyplan: 滑动窗口与双指针
---

# 1838. 最高频元素的频数

## 题目描述

元素的**频数**是该元素在一个数组中出现的次数。

给你一个整数数组 `nums` 和一个整数 `k`。在一步操作中，你可以选择 `nums` 的一个下标，并将该下标对应元素的值**增加 1**。

执行最多 `k` 次操作后，返回数组中最高频元素的**最大可能频数**。

## 核心思想

**排序 + 不定长滑动窗口**。

只能增加，不能减少，因此最高频元素一定是数组中的某个元素，且要将它前面的元素提升到它的值。

排序后，用滑动窗口维护一个区间，区间内所有元素都能在 `k` 次操作内变成 `nums[right]`（窗口最大值）。

**判断条件**：`nums[right] * 窗口长度 - 窗口和 <= k`

## 算法步骤

1. 排序 `nums`
2. 初始化 `left = 0`, `window_sum = 0`, `ans = 0`
3. 遍历 `right` 从 `0` 到 `n-1`：
   - `window_sum += nums[right]`
   - 当 `nums[right] * (right - left + 1) - window_sum > k` 时：
     - `window_sum -= nums[left]`, `left += 1`
   - `ans = max(ans, right - left + 1)`
4. 返回 `ans`

## 逐步举例

以 `nums = [1, 2, 4]`, `k = 5` 为例（已排序）：

| right | nums[right] | window_sum | 窗口长度 | 操作数 | >5? | 收缩 | left | ans |
|-------|-------------|------------|----------|--------|-----|------|------|-----|
| 0     | 1           | 1          | 1        | 1*1-1=0 | 否 | — | 0 | 1 |
| 1     | 2           | 3          | 2        | 2*2-3=1 | 否 | — | 0 | 2 |
| 2     | 4           | 7          | 3        | 4*3-7=5 | 否 | — | 0 | 3 |

最终 `ans = 3`。

验证：将 `[1, 2]` 都变成 `4`，需要 `(4-1) + (4-2) = 3 + 2 = 5` 次操作 ✓。

## 复杂度分析

- **时间复杂度**：`O(n log n)`。排序 `O(n log n)`，滑动窗口 `O(n)`。
- **空间复杂度**：`O(1)`（忽略排序的栈空间）。

## 参考

- [灵茶山艾府：最高频元素的频数](https://leetcode.cn/problems/frequency-of-the-most-frequent-element/solutions/2362481/)

## 代码实现

{% asset_code solution.py %}

{% asset_code solution_test.py %}
