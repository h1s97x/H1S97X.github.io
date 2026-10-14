---
title: 2236. 判断根结点是否等于子结点之和
tags: [入门, 条件判断]
description: "判断二叉树根结点值是否等于左右子结点值之和"
leetcode: 2236
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你一个二叉树根结点，判断该根结点是否等于它的左右子结点之和。

树只包含根结点、左子结点和右子结点。

<https://leetcode.cn/problems/root-equals-sum-of-children/description/>

**示例 1：**

> 输入：root = [10, 4, 6]
> 输出：true
> 解释：10 == 4 + 6，返回 true。

**示例 2：**

> 输入：root = [5, 3, 1]
> 输出：false
> 解释：5 != 3 + 1，返回 false。

**约束：**

- 树只包含 1 到 3 个结点
- 每个结点值在 `[0, 100]` 范围内

## 思路

直接判断 `root.val == root.left.val + root.right.val`。注意题目保证左右子结点都存在。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def checkTree(self, root: TreeNode) -> bool:
        return root.val == root.left.val + root.right.val
```

```python
import unittest


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class TestCheckTree(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_equal(self):
        root = TreeNode(10, TreeNode(4), TreeNode(6))
        self.assertTrue(self.solution.checkTree(root))

    def test_not_equal(self):
        root = TreeNode(5, TreeNode(3), TreeNode(1))
        self.assertFalse(self.solution.checkTree(root))

    def test_zero(self):
        root = TreeNode(0, TreeNode(0), TreeNode(0))
        self.assertTrue(self.solution.checkTree(root))


if __name__ == '__main__':
    unittest.main()
```