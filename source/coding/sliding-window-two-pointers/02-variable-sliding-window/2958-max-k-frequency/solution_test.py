import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/2958-max-k-frequency")
from solution import Solution
import unittest

class TestMaxSubarrayLength(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxSubarrayLength([1,2,3,1,2,3,1,2], 2), 6)

    def test_example2(self):
        self.assertEqual(self.solution.maxSubarrayLength([1,2,1,2,1,2,1,2], 1), 2)

    def test_example3(self):
        self.assertEqual(self.solution.maxSubarrayLength([5,5,5,5,5,5,5], 4), 4)

    def test_all_unique(self):
        self.assertEqual(self.solution.maxSubarrayLength([1,2,3,4,5], 1), 5)

    def test_k_large(self):
        self.assertEqual(self.solution.maxSubarrayLength([1,1,1,1], 10), 4)

if __name__ == "__main__":
    unittest.main()