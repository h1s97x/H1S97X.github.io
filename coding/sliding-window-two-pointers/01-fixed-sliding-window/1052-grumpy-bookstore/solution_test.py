import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMaxSatisfied(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        customers = [1, 0, 1, 2, 1, 1, 7, 5]
        grumpy = [0, 1, 0, 1, 0, 1, 0, 1]
        minutes = 3
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 16)

    def test_example2(self):
        customers = [1]
        grumpy = [0]
        minutes = 1
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 1)

    def test_all_grumpy(self):
        customers = [3, 5, 2]
        grumpy = [1, 1, 1]
        minutes = 2
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 8)

    def test_all_happy(self):
        customers = [3, 5, 2]
        grumpy = [0, 0, 0]
        minutes = 2
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 10)

    def test_window_equals_array(self):
        customers = [4, 5]
        grumpy = [1, 0]
        minutes = 2
        self.assertEqual(self.solution.maxSatisfied(customers, grumpy, minutes), 9)


if __name__ == "__main__":
    unittest.main()