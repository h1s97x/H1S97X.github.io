---
title: 925. 长按键入
tags: [双指针, 字符串]
leetcode: 925
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 925. 长按键入

## 题目描述

你的朋友正在使用键盘输入他的名字 `name`。偶尔，在键入字符 `c` 时，按键**可能会被长按**，而字符可能被输入 1 次或多次。

你将会检查键盘输入的字符 `typed`。如果它对应的可能是你的朋友的名字（其中有些字符可能被长按），就返回 `True`。

**示例 1：**
```
输入：name = "alex", typed = "aaleex"
输出：true
解释：'alex' 中的 'a' 和 'e' 被长按。
```

**示例 2：**
```
输入：name = "saeed", typed = "ssaaedd"
输出：false
解释：'e' 需要输入两次，但在 typed 的输出中不是这样。
```

**提示：**
- `1 <= name.length, typed.length <= 1000`
- `name` 和 `typed` 的字符都是小写字母

## 解题思路

### 核心思想

用**双指针**同时扫描 `name` 和 `typed`。指针 `i` 指向 `name`（期望的字符），指针 `j` 指向 `typed`（实际输入）。

由于长按只可能让某字符在 `typed` 中**出现得更连续、更多**，因此当 `typed[j]` 与 `name[i]` 相等时，说明当前该字符匹配，双指针同时前进；当 `typed[j]` 与当前 `name[i]` 不相等时，它只可能是上一个字符的长按重复（`typed[j] == typed[j-1]`），此时仅 `j` 前进；若既不等于 `name[i]` 也不等于上一个字符，则说明 `typed` 出现了 `name` 没有的字符，返回 `false`。

**关键法则：**

- `typed` 多出的字符只能是「紧跟在它前面的同一个字符」的重复（长按）；
- `name` 中的每个字符必须在 `typed` 中按顺序出现。

**长按匹配示意（name = "alex", typed = "aaleex"）：**

```
name:  a  l  e  x
typed: a  a  l  e  e  x
        这两个 a 匹配 name 的 a → 前进
        这个 e 是长按重复 → 跳过
```

### 算法步骤

1. 初始化 `i = 0, j = 0`。
2. 当 `j < len(typed)` 时循环：
   - 若 `i < len(name)` 且 `name[i] == typed[j]`：`i++`、`j++`，匹配一个字符；
   - 否则若 `j > 0` 且 `typed[j] == typed[j-1]`：说明是长按重复，仅 `j++`；
   - 否则：返回 `false`。
3. 循环结束后，判断 `i` 是否走到 `name` 末尾（`i == len(name)`）——若 `name` 还有未匹配字符则 `typed` 不够长，返回 `false`。

### 逐步举例

以 `name = "saeed", typed = "ssaaedd"` 为例：

| 步骤 | i | name[i] | j | typed[j] | 判断 | 操作 |
| ---- | - | ------- | - | -------- | ---- | ---- |
| 1 | 0 | s | 0 | s | 相等 | i=1, j=1 |
| 2 | 1 | a | 1 | s | 不相等，但 typed[1]==typed[0] | j=2 |
| 3 | 1 | a | 2 | a | 相等 | i=2, j=3 |
| 4 | 2 | e | 3 | a | 不相等，但 typed[3]==typed[2] | j=4 |
| 5 | 2 | e | 4 | e | 相等 | i=3, j=5 |
| 6 | 3 | e | 5 | d | 不相等，typed[5]=d != previous 'e' | 返回 false |

`typed` 输出的是 `d`，而期望的 `name[3]` 是 `e`，长按说明不成立 → `false`。

### 复杂度分析

- **时间复杂度**：O(N + M)，`name` 和 `typed` 各被扫描常数次。
- **空间复杂度**：O(1)，仅用两个指针。

## 代码实现

{{% highlight python %}}
```python
class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        i = j = 0
        while j < len(typed):
            if i < len(name) and name[i] == typed[j]:
                i += 1
                j += 1
            elif j > 0 and typed[j] == typed[j - 1]:
                j += 1
            else:
                return False
        return i == len(name)
```
```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_true(self):
        self.assertTrue(Solution().isLongPressedName("alex", "aaleex"))

    def test_false(self):
        self.assertFalse(Solution().isLongPressedName("saeed", "ssaaedd"))

    def test_true_single(self):
        self.assertTrue(Solution().isLongPressedName("leelee", "lleeelee"))


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
