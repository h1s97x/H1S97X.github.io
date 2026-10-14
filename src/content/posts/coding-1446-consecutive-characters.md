---
title: 1446. 连续字符
tags: [双指针, 字符串]
leetcode: 1446
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 1446. 连续字符

## 题目描述

给你一个字符串 `s`，字符串的「能量」定义为：只含一种字符的最长非空子字符串的长度。

请你返回字符串 `s` 的**能量**。

**示例 1：**
```
输入：s = "leetcode"
输出：2
解释：子字符串 "ee" 长度为 2，只含字符 'e'。
```

**示例 2：**
```
输入：s = "abbcccddddeeeeedcba"
输出：5
解释：子字符串 "eeeee" 长度为 5，只含字符 'e'。
```

**提示：**
- `1 <= s.length <= 500`
- `s` 只包含小写英文字母

## 解题思路

### 核心思想

用**分组循环**把字符串划分成若干「连续相同字符」的段，取最长的段长度。灵茶山艾府题单里"分组循环"的经典骨架是「外层遍历段起点，内层扩展段终点」。

对每个段起点 `i`，用 `j` 向前扩展，直到 `s[j+1]` 与 `s[i]` 不同，此时 `[i, j]` 就是一个最长连续相同字符段，长度为 `j - i + 1`，用它更新答案，然后 `i` 跳到 `j+1` 开始下一段。

**分组示意（s = "abbccc"）：**

```
a | b b | c c c
段长 1   2   3   → 答案 3
```

### 算法步骤

1. 初始化 `ans = 1`（至少有一个字符），`i = 0`。
2. 当 `i < n` 时：
   - `j = i`，内层 `while j+1 < n and s[j+1] == s[i]` 时 `j++`；
   - `ans = max(ans, j - i + 1)`；
   - `i = j + 1`。
3. 返回 `ans`。

### 逐步举例

以 `s = "abbcccddddeeeeedcba"` 为例，最长为最后的 `e` 段：

| 段 | 区间 | 长度 |
| -- | ---- | ---- |
| a | [0,0] | 1 |
| bb | [1,2] | 2 |
| ccc | [3,5] | 3 |
| dddd | [6,9] | 4 |
| eeeeee | [10,15] | **5** |
| d | [16,16] | 1 |
| c | [17,17] | 1 |
| b | [18,18] | 1 |
| a | [19,19] | 1 |

答案为 `5`。

### 复杂度分析

- **时间复杂度**：O(N)，每个下标只被访问常数次。
- **空间复杂度**：O(1)。

## 代码实现

{{% highlight python %}}
```python
class Solution:
    def maxPower(self, s: str) -> int:
        n = len(s)
        ans = 1
        i = 0
        while i < n:
            j = i
            while j + 1 < n and s[j + 1] == s[i]:
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
    def test_example1(self):
        self.assertEqual(Solution().maxPower("leetcode"), 2)

    def test_example2(self):
        self.assertEqual(Solution().maxPower("abbcccddddeeeeedcba"), 5)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
