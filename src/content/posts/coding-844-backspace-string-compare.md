---
title: 844. 比较含退格的字符串
tags: [双指针, 字符串, 栈]
leetcode: 844
studyplan: 滑动窗口与双指针
published: 2026-08-23T12:12:27+08:00
updated: 2026-08-23T12:12:27+08:00
category: 题解
notebook: coding
---


# 844. 比较含退格的字符串

## 题目描述

给定 `s` 和 `t` 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 `true`。`#` 代表退格字符。

注意：如果对空文本输入退格字符，文本继续为空。

**示例 1：**
```
输入：s = "ab#c", t = "ad#c"
输出：true
解释：s 变为 "ac"，t 变为 "ac"。
```

**示例 2：**
```
输入：s = "a##c", t = "#a#c"
输出：true
解释：s 变为 "c"，t 变为 "c"。
```

**示例 3：**
```
输入：s = "a#c", t = "b"
输出：false
解释：s 变为 "c"，t 变为 "b"。
```

**提示：**
- `1 <= s.length, t.length <= 200`
- `s` 和 `t` 只含有小写字母以及字符 `#`

## 解题思路

两种经典做法：**栈** 或 **从后往前的双指针**。这里采用空间 O(1) 的双指针。

### 核心思想

从**后往前**扫描，因为退格键影响的是它**前面**（左侧）的字符，从尾部逆序处理可以即时跳过被退格删除的字符，无需额外空间。

维护两个指针 `i`（指向 `s`）、`j`（指向 `t`）和两个计数 `skipS`、`skipT`（记录待跳过的退格次数）：

- 遇到 `#`，`skip` 加一；
- 遇到普通字符，若 `skip > 0` 则说明该字符被退格删除，`skip` 减一并让指针前进；
- 否则该字符是**最终有效字符**，停下指针做比较。

找到两侧各自的有效字符后，若不相同直接返回 `false`；若一侧还有字符而另一侧已越界，也说明不等。

**从后往前跳过被退格的字符示意（s = "ab##c"）：**

```
从右往左扫描:
  '#' → skip=1
  '#' → skip=2
  'b' → skip>0, 被删除, skip=1
  'a' → skip>0, 被删除, skip=0
  'c' → 有效字符
最终有效结果: "c"
```

### 算法步骤

1. 初始化 `i = len(s)-1, j = len(t)-1, skipS = skipT = 0`。
2. 只要 `i >= 0` 或 `j >= 0` 就循环：
   - **内层跳过 `s` 被退格删除的字符**：遇到 `#` 则 `skipS++`；遇到普通字符且 `skipS > 0` 则 `skipS--` 并跳过；否则遇到有效字符，退出内层。
   - **内层跳过 `t` 被退格删除的字符**（同理）。
   - 比较两侧有效字符：都有效且不相等 → `false`；只有一侧越界 → `false`。
   - `i--, j--` 继续。
3. 全部处理完返回 `true`。

### 逐步举例

以 `s = "ab#c", t = "ad#c"` 为例：

| 步骤 | i | s[i] | 处理 | j | t[j] | 处理 |
| ---- | - | ---- | ---- | - | ---- | ---- |
| 1 | 3 | c | 有效字符 | 3 | c | 有效字符 |
| 2 | 比较 c==c ✅，i=2, j=2 | | | | |
| 3 | 2 | # | skipS=1 | 2 | # | skipT=1 |
| 4 | 1 | b | 被删除，skipS=0 | 1 | d | 被删除，skipT=0 |
| 5 | 0 | a | 有效字符 | 0 | a | 有效字符 |
| 6 | 比较 a==a ✅，i=-1, j=-1 结束 → true | | | | |

### 复杂度分析

- **时间复杂度**：O(N + M)，两个字符串各被扫描一遍。
- **空间复杂度**：O(1)，只用常数额外空间。

## 代码实现

{{% highlight python %}}
```python
class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        i, j = len(s) - 1, len(t) - 1
        skip_s = skip_t = 0
        while i >= 0 or j >= 0:
            while i >= 0:
                if s[i] == '#':
                    skip_s += 1
                    i -= 1
                elif skip_s:
                    skip_s -= 1
                    i -= 1
                else:
                    break
            while j >= 0:
                if t[j] == '#':
                    skip_t += 1
                    j -= 1
                elif skip_t:
                    skip_t -= 1
                    j -= 1
                else:
                    break
            if i >= 0 and j >= 0:
                if s[i] != t[j]:
                    return False
            elif i >= 0 or j >= 0:
                return False
            i -= 1
            j -= 1
        return True
```
```python
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_true_basic(self):
        self.assertTrue(Solution().backspaceCompare("ab#c", "ad#c"))

    def test_true_all(self):
        self.assertTrue(Solution().backspaceCompare("a##c", "#a#c"))

    def test_false(self):
        self.assertFalse(Solution().backspaceCompare("a#c", "b"))


if __name__ == '__main__':
    unittest.main()
```
{{% /highlight %}}
