---
title: 42. 接雨水
notebook: coding
tags: [双指针, 单调栈]
leetcode: 42
studyplan: 滑动窗口与双指针
---

# 42. 接雨水

> 题目链接: [LeetCode 42](https://leetcode.cn/problems/trapping-rain-water/)

## 题目描述

给定 `n` 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**
```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分）。
```
**示例 2：**
```
输入：height = [4,2,0,3,2,5]
输出：9
```

## 解题思路

### 核心思想

每个位置能接的水量 = `min(左侧最高柱, 右侧最高柱) - height[i]`（若为正才接水）。用**双指针**：`left`、`right` 从两端向中间靠拢。关键在于：当 `height[left] < height[right]` 时，位置 `left` 的水量由**左侧最高**决定（此时右边界已经足够高），因此我们可以放心处理左指针。

### 算法步骤

1. `left=0, right=n-1, left_max=right_max=0, ans=0`。
2. 更新 `left_max = max(left_max, height[left])`、`right_max = max(right_max, height[right])`。
3. 若 `height[left] < height[right]`：说明 `left` 处左边界是短板，`ans += left_max - height[left]`，`left += 1`。
4. 否则：处理右侧，`ans += right_max - height[right]`，`right -= 1`。
5. 重复直到 `left >= right`，返回 `ans`。

### 逐步举例

`height = [0,1,0,2,1,0,1,3,2,1,2,1]`：

| 步骤 | left | right | 处理边 | left_max | right_max | 增量 | ans |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 0 | 11 | 左(0<1) | 0 | 1 | 0 | 0 |
| 2 | 1 | 11 | 左(1<1)→右 | 1 | 1 | 0 | 1 |
| 3 | 1 | 10 | 左(1<2) | 1 | 2 | 1-1=0 | 1 |
| 4 | 2 | 10 | 左(0<2) | 1 | 2 | 1-0=1 | 2 |
| ... | ... | ... | ... | ... | ... | ... | 6 |

最终 `ans = 6`。

### 复杂度分析

- **时间复杂度**：O(n)，双指针各扫描一次。
- **空间复杂度**：O(1)。

## 代码实现

{% asset_code solution.py %}

{% asset_code solution_test.py %}
