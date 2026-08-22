import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(Solution().trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6)

    def test_flat(self):
        self.assertEqual(Solution().trap([0, 0, 0, 0]), 0)

    def test_high_middle(self):
        self.assertEqual(Solution().trap([4, 2, 0, 3, 2, 5]), 9)


if __name__ == '__main__':
    unittest.main()
