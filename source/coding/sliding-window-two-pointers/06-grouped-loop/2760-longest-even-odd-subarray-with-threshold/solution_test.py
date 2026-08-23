import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(
            Solution().longestAlternatingSubarray([4, 5, 4], 5), 3)

    def test_all_even(self):
        self.assertEqual(Solution().longestAlternatingSubarray([2, 2, 2], 2), 1)

    def test_odd_start(self):
        self.assertEqual(Solution().longestAlternatingSubarray([3, 2, 3, 2], 3), 3)


if __name__ == '__main__':
    unittest.main()
