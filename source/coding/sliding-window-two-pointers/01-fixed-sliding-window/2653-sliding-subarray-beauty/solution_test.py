import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/2653-sliding-subarray-beauty")
from solution import Solution
import unittest

class TestGetSubarrayBeauty(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.getSubarrayBeauty([1,-1,-3,-2,3], 3, 2), [-1,-2,-2])

    def test_example2(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-1,-2,-3,-4,-5], 2, 2), [-1,-2,-3,-4])

    def test_example3(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-3,1,2,-3,0,-3], 2, 1), [-3,0,-3,-3,-3])

    def test_all_positive(self):
        self.assertEqual(self.solution.getSubarrayBeauty([1,2,3,4,5], 3, 2), [0,0,0])

    def test_single_element(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-5], 1, 1), [-5])

    def test_x_larger(self):
        self.assertEqual(self.solution.getSubarrayBeauty([-1,-2,-3], 3, 3), [-1])

if __name__ == "__main__":
    unittest.main()