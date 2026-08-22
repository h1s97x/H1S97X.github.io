import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().longestMountain([2, 1, 4, 7, 3, 2, 5]), 5)

    def test_example2(self):
        self.assertEqual(Solution().longestMountain([2, 2, 2]), 0)


if __name__ == '__main__':
    unittest.main()
