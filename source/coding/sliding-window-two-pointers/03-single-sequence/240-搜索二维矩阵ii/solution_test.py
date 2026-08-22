import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def setUp(self):
        self.m = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22],
                  [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]

    def test_found(self):
        self.assertTrue(Solution().searchMatrix(self.m, 5))

    def test_not_found(self):
        self.assertFalse(Solution().searchMatrix(self.m, 20))

    def test_single(self):
        self.assertTrue(Solution().searchMatrix([[1]], 1))


if __name__ == '__main__':
    unittest.main()
