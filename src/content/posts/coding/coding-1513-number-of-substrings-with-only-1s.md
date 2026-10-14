---
title: 1513. 仅含 1 的子串数
tags: [双指针, 字符串, 数学]
leetcode: 1513
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 1513. 仅含 1 的子串数

## 题目描述

给你一个二进制字符串 `s`（仅由 `'0'` 和 `'1'` 组成）。

返回所有字符都为 `1` 的**子字符串**的数目。

由于答案可能很大，请你将它对 `10^9 + 7` 取模后返回。

**示例 1：**
```
输入：s = "0110111"
输出：9
解释：共有 9 个子字符串仅由 '1' 组成：
"1" -> 5 个
"11" -> 3 个
"111" -> 1 个
```

**示例 2：**
```
输入：s = "101"
输出：2
```

**提示：**
- `1 <= s.length <= 10^5`
- `s[i]` 是 `'0'` 或 `'1'`

## 解题思路

### 核心思想

把字符串按连续的 `'1'` 分成若干**段**（用分组循环）。对任意一段长度为 `k` 的连续 `'1'`，它内部能形成的全 1 子串数量为：

```
长度为 1 的有 k 个
长度为 2 的有 k-1 个
...
长度为 k 的有 1 个
合计 = 1 + 2 + ... + k = k * (k + 1) / 2
```

把每一段的贡献累加并对 `10^9+7` 取模即可。因为不同段之间被 `'0'` 隔开，子串不能跨界，所以互不影响，直接相加。

**段贡献示意（s = "0110111"）：**

```
"01 1 0 1 1 1"
     段1(k=2)       段2(k=3)
贡献= 2*3/2=3    贡献= 3*4/2=6
总计 = 3 + 6 = 9
```

### 算法步骤

1. 初始化 `ans = 0`，`i = 0`。
2. 当 `i < n` 时：
   - 若 `s[i] == '0'`，`i++` 跳过；
   - 否则 `j = i`，内层 `while` 扩展连续 `'1'`；段长 `k = j - i + 1`；
   - `ans += k*(k+1)//2`，`i = j + 1`。
3. 返回 `ans % (10^9+7)`。

### 逐步举例

以 `s = "0110111"`，按段统计：

| 段 | 区间 | 长度 k | 贡献 k(k+1)/2 |
| -- | ---- | ------ | -------------- |
| 1（跳过 '0'） | - | - | - |
| 11 | [1,2] | 2 | 3 |
| 0 | - | - | - |
| 111 | [4,6] | 3 | 6 |

合计 `3 + 6 = 9`。

### 复杂度分析

- **时间复杂度**：O(N)，单次线性扫描。
- **空间复杂度**：O(1)。

## 代码实现

{{% highlight python %}}
```python
class Solution:
    def numSub(self, s: str) -> int:
        MOD = 10 ** 9 + 7
        ans = 0
        n = len(s)
        i = 0
        while i < n:
            if s[i] == '0':
                i += 1
                continue
            j = i
            while j + 1 < n and s[j + 1] == '1':
                j += 1
            k = j - i + 1
            ans = (ans + k * (k + 1) // 2) % MOD
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
        self.assertEqual(Solution().numSub("0110111"), 9)

    def test_example2(self):
        self.assertEqual(Solution().numSub("101"), 2)


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
