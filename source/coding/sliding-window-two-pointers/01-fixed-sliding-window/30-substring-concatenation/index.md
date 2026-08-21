---
title: 30. 串联所有单词的子串
notebook: coding
tags:
  - 滑动窗口
  - 哈希表
description: "在 s 中找到所有由 words 中每个单词恰好一次串联而成的子串的起始索引"
leetcode: 30
studyplan: 滑动窗口与双指针
---

# 30. 串联所有单词的子串

## 题目描述

给定一个字符串 `s` 和一个字符串数组 `words`，其中 `words` 中所有字符串**长度相同**。在 `s` 中找到所有子串的起始索引，这些子串是 `words` 中每个单词**恰好一次**、**无间隔**地串联而成的排列。

**示例 ：**

```
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]（子串 [0,6)="barfoo"，[9,15)="foobar"）
```

## 解法思路

**核心思想：把每个单词当作一个"超级字符"，问题就退化成了 438 的异位词滑窗。**

由于所有单词等长 `word_len`，正确的串联子串一定从某一个 `offset`（0..word_len-1）开始，且该子串按 `word_len` 切分后，得到的单词序列必须与 `words` 的计数一致。因此分 `word_len` 组分别做滑窗：

- 对每个 `offset`，把 `s` 按 `word_len` 切成单词序列 `w`；
- 维护窗口内单词计数字典 `cur` 和一个 `valid` 变量，记录**频次恰好匹配的单词种类数**；
- 入单词：`cur[w]++`，若正好等于 `target[w]`，`valid+1`；
- 出单词（窗口总长超过 `total_len = len(words)*word_len` 时）：`cur[w_left]--`，若先前正好匹配则 `valid-1`；
- 遇到不在 `target` 中的单词，直接清空窗口重置；
- 当 `valid == len(target)`，当前起点 `left` 就是一个合法子串起点。

**逐步举例**（`s="barfoothefoobarman", words=["foo","bar"]`，`word_len=3, total_len=6`，只看 `offset=0` 分组）：

- 切分出的单词序列：`bar foo the foo bar man`。
- 入 `"bar"`：`cur[bar]=1==target[bar]`，`valid=1`。
- 入 `"foo"`：`cur[foo]=1==target[foo]`，`valid=2==len(target)` → `append(0)` ✓。
- 入 `"the"`（不在 target）→ 清空窗口，`left` 跳到其后。
- 最终 `offset=0` 得到起点 `0`；`offset=3` 分组还会得到起点 `9`。

## 复杂度分析

- 时间复杂度：O(n·word_len)，每组各做一次 O(n/word_len) 遍历。
- 空间复杂度：O(n)，哈希表存储单词计数。

## 代码实现

{% asset_code solution.py %}

{% asset_code solution_test.py %}