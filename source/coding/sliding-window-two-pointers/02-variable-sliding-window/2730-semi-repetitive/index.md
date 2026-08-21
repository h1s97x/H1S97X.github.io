---
title: 2730. 找到最长的半重复子字符串
notebook: coding
tags:
  - 滑动窗口
  - 不定长
  - 字符串
description: "求最长子串，其中相邻相同字符对至多一对"
leetcode: 2730
studyplan: 滑动窗口与双指针
---

# 2730. 找到最长的半重复子字符串

## 题目描述

给你一个下标从 0 开始的字符串 `s`，只包含数字字符。如果一个字符串 `t` 中**至多有一对相邻字符是相等的**，则称 `t` 是**半重复**的。返回 `s` 中最长半重复子字符串的长度。

## 核心思想

**不定长滑动窗口**，维护窗口内**相邻相同字符对数** `cnt_dup`。

窗口合法的充要条件是 `cnt_dup ≤ 1`。

**状态转移**：
- 右端点 `right` 进入窗口：若 `s[right] == s[right-1]`，则 `cnt_dup += 1`（新增一对相邻相同）
- 左端点 `left` 离开窗口：若 `s[left] == s[left+1]`，则 `cnt_dup -= 1`（移除一对相邻相同）

当 `cnt_dup > 1` 时，不断右移 `left` 直到 `cnt_dup ≤ 1`。

## 算法步骤

1. 初始化 `left = 0`, `cnt_dup = 0`, `ans = 0`
2. 遍历 `right` 从 `0` 到 `n-1`：
   - 若 `right > 0` 且 `s[right] == s[right-1]`，`cnt_dup += 1`
   - 当 `cnt_dup > 1` 时：
     - 若 `s[left] == s[left+1]`，`cnt_dup -= 1`
     - `left += 1`
   - 更新 `ans = max(ans, right - left + 1)`
3. 返回 `ans`

## 逐步举例

以 `s = "1111"` 为例，`n = 4`：

| right | s[right] | s[right]==s[right-1]? | cnt_dup | 收缩过程 | left | ans |
|-------|----------|----------------------|---------|---------|------|-----|
| 0     | '1'      | —                    | 0       | —       | 0    | 1   |
| 1     | '1'      | 是                   | 1       | —       | 0    | 2   |
| 2     | '1'      | 是                   | 2       | s[0]==s[1]→cnt=1,l=1 | 1 | 2 |
| 3     | '1'      | 是                   | 2       | s[1]==s[2]→cnt=1,l=2 | 2 | 2 |

最终 `ans = 2`（最长半重复子串为 `"11"`）。

## 复杂度分析

- **时间复杂度**：`O(n)`。`left` 和 `right` 各遍历一次，每个元素最多被访问两次。
- **空间复杂度**：`O(1)`。仅用常数个变量。

## 参考

- [灵茶山艾府：找到最长的半重复子字符串](https://leetcode.cn/problems/find-the-longest-semi-repetitive-substring/solutions/2262923/)

## 代码实现

{% asset_code solution.py %}

{% asset_code solution_test.py %}
