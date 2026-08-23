import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example(self):
        self.assertEqual(Solution().findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3)

    def test_all_ones(self):
        self.assertEqual(Solution().findMaxConsecutiveOnes([1, 1, 1]), 3)

    def test_all_zeros(self):
        self.assertEqual(Solution().findMaxConsecutiveOnes([0, 0, 0]), 0)


if __name__ == '__main__':
    unittest.main()
