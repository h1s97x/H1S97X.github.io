---
title: 2. 两数相加
tags: [算法]
description: "给你两个非空链表表示两个非负整数，每位数字逆序存储，将两数相加并以相同形式返回"
leetcode: 2
studyplan: 编程入门
published: 2024-11-09T20:49:16+08:00
updated: 2024-11-09T20:49:16+08:00
category: 题解
notebook: coding
---


## Problem

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

<https://leetcode.cn/problems/add-two-numbers/description/>

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)

> 输入：l1 = [2,4,3], l2 = [5,6,4]
> 输出：[7,0,8]
> 解释：342 + 465 = 807.

**示例 2：**

> 输入：l1 = [0], l2 = [0]
> 输出：[0]

**示例 3：**

> 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
> 输出：[8,9,9,9,0,0,0,1]

**约束：**

- 每个链表中的节点数在范围 `[1, 100]` 内
- `0 <= Node.val <= 9`
- 题目数据保证列表表示的数字不含前导零

## 思路

两数相加本质上就是模拟竖式加法：从低位到高位逐位相加，记录进位。

```
  2 4 3
+ 5 6 4
--------
  7 0 8
```

因为是逆序存储，链表头正好是最低位，可以直接从 head 开始遍历，与竖式加法从左到右的顺序一致。

### 解法 1：迭代

用 dummy head 简化边界处理，一个指针 `curr` 逐位构建新链表，一个变量 `carry` 记录进位。

关键点：两个链表长度可能不同，且最后可能多出一位进位（如 5+5=10）。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)
        curr = dummy
        carry = 0

        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            total = v1 + v2 + carry
            carry = total // 10
            curr.next = ListNode(total % 10)
            curr = curr.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

        return dummy.next
```

### 解法 2：递归

本质与迭代相同，但把"逐位处理"的逻辑用递归表达。每次递归处理一位，将进位传给下一层递归。

递归终止条件：两个链表都遍历完且无进位。

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode, carry: int = 0) -> ListNode:
        if not l1 and not l2 and not carry:
            return None

        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        total = v1 + v2 + carry

        node = ListNode(total % 10)
        node.next = self.addTwoNumbers(
            l1.next if l1 else None,
            l2.next if l2 else None,
            total // 10
        )
        return node
```

## 测试

```python
import unittest


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def list_to_linked(arr):
    dummy = ListNode(0)
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def linked_to_list(node):
    result = []
    while node:
        result.append(node.val)
        node = node.next
    return result


class TestAddTwoNumbers(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        l1 = list_to_linked([2, 4, 3])
        l2 = list_to_linked([5, 6, 4])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_to_list(result), [7, 0, 8])

    def test_example2(self):
        l1 = list_to_linked([0])
        l2 = list_to_linked([0])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_to_list(result), [0])

    def test_example3(self):
        l1 = list_to_linked([9, 9, 9, 9, 9, 9, 9])
        l2 = list_to_linked([9, 9, 9, 9])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_to_list(result), [8, 9, 9, 9, 0, 0, 0, 1])

    def test_carry(self):
        """5 + 5 = 10, 应进位"""
        l1 = list_to_linked([5])
        l2 = list_to_linked([5])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_to_list(result), [0, 1])

    def test_diff_length(self):
        """不同长度的链表"""
        l1 = list_to_linked([1, 8])
        l2 = list_to_linked([0])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_to_list(result), [1, 8])


if __name__ == '__main__':
    unittest.main()
```
