import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/1695-maximum-erasure")
from solution import Solution
import unittest

class TestMaximumUniqueSubarray(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maximumUniqueSubarray([4,2,4,5,6]), 17)

    def test_example2(self):
        self.assertEqual(self.solution.maximumUniqueSubarray([5,2,1,2,5,2,1,2,5]), 8)

    def test_single_element(self):
        self.assertEqual(self.solution.maximumUniqueSubarray([1]), 1)

    def test_all_unique(self):
        self.assertEqual(self.solution.maximumUniqueSubarray([1,2,3,4]), 10)

    def test_all_same(self):
        self.assertEqual(self.solution.maximumUniqueSubarray([5,5,5,5]), 5)

if __name__ == "__main__":
    unittest.main()