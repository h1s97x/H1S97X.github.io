import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/1493-longest-subarray-after-delete")
from solution import Solution
import unittest

class TestLongestSubarray(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.longestSubarray([1,1,0,1]), 3)

    def test_example2(self):
        self.assertEqual(self.solution.longestSubarray([0,1,1,1,0,1,1,0,1]), 5)

    def test_example3(self):
        self.assertEqual(self.solution.longestSubarray([1,1,1]), 2)

    def test_all_zeros(self):
        self.assertEqual(self.solution.longestSubarray([0,0,0]), 0)

    def test_single_one(self):
        self.assertEqual(self.solution.longestSubarray([1]), 0)

    def test_single_zero(self):
        self.assertEqual(self.solution.longestSubarray([0]), 0)

if __name__ == "__main__":
    unittest.main()