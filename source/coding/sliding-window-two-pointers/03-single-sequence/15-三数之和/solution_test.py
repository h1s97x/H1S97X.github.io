import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        res = Solution().threeSum([-1, 0, 1, 2, -1, -4])
        expected = [[-1, -1, 2], [-1, 0, 1]]
        self.assertEqual(sorted(res), sorted(expected))

    def test_no_solution(self):
        self.assertEqual(Solution().threeSum([0, 1, 1]), [])

    def test_zeros(self):
        self.assertEqual(Solution().threeSum([0, 0, 0, 0]), [[0, 0, 0]])


if __name__ == '__main__':
    unittest.main()
