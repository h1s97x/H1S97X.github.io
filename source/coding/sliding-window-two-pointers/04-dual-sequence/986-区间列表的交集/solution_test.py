import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        first = [[0, 2], [5, 10], [13, 23], [24, 25]]
        second = [[1, 5], [8, 12], [15, 24], [25, 26]]
        expected = [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]]
        self.assertEqual(Solution().intervalIntersection(first, second), expected)

    def test_no_intersection(self):
        self.assertEqual(Solution().intervalIntersection([[1, 3]], [[5, 7]]), [])


if __name__ == '__main__':
    unittest.main()
