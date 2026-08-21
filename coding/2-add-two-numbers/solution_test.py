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