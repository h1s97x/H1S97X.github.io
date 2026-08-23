import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().numSubarrayBoundedMax([2, 1, 4, 3], 2, 3), 3)

    def test_example2(self):
        self.assertEqual(Solution().numSubarrayBoundedMax([2, 9, 2, 5, 6], 2, 8), 7)


if __name__ == '__main__':
    unittest.main()
