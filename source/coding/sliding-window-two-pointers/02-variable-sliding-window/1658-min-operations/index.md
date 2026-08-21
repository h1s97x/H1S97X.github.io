---
title: "1658. 将 x 减到 0 的最小操作数"
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 正难则反
description: "从两端移除元素使和为 x，转化为找中间最长子数组和为 total-x"
leetcode: 1658
studyplan: 滑动窗口与双指针
---

# 1658. 将 x 减到 0 的最小操作数

## 题目描述

给你一个整数数组 `nums` 和一个整数 `x`。每一次操作时，你应当移除数组 `nums` 最左边或最右边的元素，然后从 `x` 中减去该元素的值。

如果可以将 `x` 恰好减到 `0`，返回**最小操作数**；否则，返回 `-1`。

## 核心思想

**正难则反 + 不定长滑动窗口**。

从两端移除元素使和为 `x`，等价于在数组中间找一个**最长**子数组，其和为 `total - x`。

设 `target = total - x`：
- 若 `target < 0`：无解，返回 `-1`
- 若 `target == 0`：需移除全部元素，返回 `n`
- 否则：用滑动窗口找和为 `target` 的最长子数组，答案 = `n - 最长子数组长度`

## 算法步骤

1. 计算 `total = sum(nums)`, `target = total - x`
2. 特判 `target < 0` 返回 `-1`，`target == 0` 返回 `n`
3. 初始化 `left = 0`, `window = 0`, `ans = -1`
4. 遍历 `right` 从 `0` 到 `n-1`：
   - `window += nums[right]`
   - 当 `window > target` 时：`window -= nums[left]`, `left += 1`
   - 若 `window == target`：`ans = max(ans, right - left + 1)`
5. 若 `ans == -1` 返回 `-1`，否则返回 `n - ans`

## 逐步举例

以 `nums = [1, 1, 4, 2, 3]`, `x = 5` 为例：

`total = 11`, `target = 11 - 5 = 6`

| right | nums[right] | window | >6? | 收缩 | left | window==6? | ans |
|-------|-------------|--------|-----|------|------|------------|-----|
| 0     | 1           | 1      | 否  | —    | 0    | 否         | -1  |
| 1     | 1           | 2      | 否  | —    | 0    | 否         | -1  |
| 2     | 4           | 6      | 否  | —    | 0    | 是         | 3   |
| 3     | 2           | 8      | 是  | l=1, window=7; l=2, window=6 | 2 | 是 | 3 |
| 4     | 3           | 9      | 是  | l=3, window=5 | 3 | 否 | 3 |

最终 `ans = 3`（子数组 `[1,1,4]`），返回 `5 - 3 = 2`。

验证：移除两端 `[2, 3]`，和 = 5 ✓，操作数 = 2。

## 复杂度分析

- **时间复杂度**：`O(n)`。每个元素最多进出窗口各一次。
- **空间复杂度**：`O(1)`。

## 参考

- [灵茶山艾府：将 x 减到 0 的最小操作数](https://leetcode.cn/problems/minimum-operations-to-reduce-x-to-zero/solutions/2362481/)

## 代码实现

{% asset_code solution.py %}

{% asset_code solution_test.py %}
