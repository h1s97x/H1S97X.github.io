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