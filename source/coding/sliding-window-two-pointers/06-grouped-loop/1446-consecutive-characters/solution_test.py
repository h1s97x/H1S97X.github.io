import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().maxPower("leetcode"), 2)

    def test_example2(self):
        self.assertEqual(Solution().maxPower("abbcccddddeeeeedcba"), 5)


if __name__ == '__main__':
    unittest.main()
