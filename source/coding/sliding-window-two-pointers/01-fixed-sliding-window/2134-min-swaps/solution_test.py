import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMinSwaps(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.minSwaps([0, 1, 0, 1, 1, 0, 0]), 1)

    def test_example2(self):
        self.assertEqual(self.solution.minSwaps([0, 1, 1, 1, 0, 0, 1, 1, 0]), 2)

    def test_example3(self):
        self.assertEqual(self.solution.minSwaps([1, 1, 0, 0, 1]), 0)

    def test_all_ones(self):
        self.assertEqual(self.solution.minSwaps([1, 1, 1, 1]), 0)

    def test_all_zeros(self):
        self.assertEqual(self.solution.minSwaps([0, 0, 0, 0]), 0)

    def test_single_one(self):
        self.assertEqual(self.solution.minSwaps([1, 0, 0, 0]), 0)

    def test_circular_case(self):
        self.assertEqual(self.solution.minSwaps([1, 0, 0, 1, 0]), 1)


if __name__ == "__main__":
    unittest.main()