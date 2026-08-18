import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/1004-max-consecutive-ones")
from solution import Solution
import unittest

class TestLongestOnes(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2), 6)

    def test_example2(self):
        self.assertEqual(self.solution.longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3), 10)

    def test_all_ones(self):
        self.assertEqual(self.solution.longestOnes([1,1,1,1], 2), 4)

    def test_all_zeros(self):
        self.assertEqual(self.solution.longestOnes([0,0,0], 2), 2)

    def test_k_zero(self):
        self.assertEqual(self.solution.longestOnes([0,1,0,1,0], 0), 1)

if __name__ == "__main__":
    unittest.main()