import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestDecrypt(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.decrypt([5, 7, 1, 4], 3), [12, 10, 16, 13])

    def test_example2(self):
        self.assertEqual(self.solution.decrypt([1, 2, 3, 4], 0), [0, 0, 0, 0])

    def test_example3(self):
        self.assertEqual(self.solution.decrypt([2, 4, 9, 3], -2), [12, 5, 6, 13])

    def test_k_positive_one(self):
        self.assertEqual(self.solution.decrypt([1, 2, 3, 4], 1), [2, 3, 4, 1])

    def test_k_negative_one(self):
        self.assertEqual(self.solution.decrypt([1, 2, 3, 4], -1), [4, 1, 2, 3])

    def test_all_same(self):
        self.assertEqual(self.solution.decrypt([10, 10, 10], 2), [20, 20, 20])


if __name__ == "__main__":
    unittest.main()