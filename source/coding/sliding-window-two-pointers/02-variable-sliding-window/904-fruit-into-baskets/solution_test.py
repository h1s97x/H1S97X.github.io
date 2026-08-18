import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/904-fruit-into-baskets")
from solution import Solution
import unittest

class TestTotalFruit(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.totalFruit([1,2,1]), 3)

    def test_example2(self):
        self.assertEqual(self.solution.totalFruit([0,1,2,2]), 3)

    def test_example3(self):
        self.assertEqual(self.solution.totalFruit([1,2,3,2,2]), 4)

    def test_example4(self):
        self.assertEqual(self.solution.totalFruit([3,3,3,1,2,1,1,2,3,3,4]), 5)

    def test_single_type(self):
        self.assertEqual(self.solution.totalFruit([1,1,1,1]), 4)

    def test_two_types(self):
        self.assertEqual(self.solution.totalFruit([1,2,1,2,1]), 5)

if __name__ == "__main__":
    unittest.main()