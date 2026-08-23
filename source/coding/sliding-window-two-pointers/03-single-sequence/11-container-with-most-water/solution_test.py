import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(Solution().maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49)

    def test_two(self):
        self.assertEqual(Solution().maxArea([1, 1]), 1)

    def test_ascending(self):
        self.assertEqual(Solution().maxArea([1, 2, 4, 3]), 4)


if __name__ == '__main__':
    unittest.main()
