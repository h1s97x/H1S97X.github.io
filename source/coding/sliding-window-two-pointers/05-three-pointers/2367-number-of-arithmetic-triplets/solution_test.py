import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().arithmeticTriplets([0, 1, 4, 6, 7, 10], 3), 2)

    def test_example2(self):
        self.assertEqual(Solution().arithmeticTriplets([4, 5, 6, 7, 8, 9], 2), 2)


if __name__ == '__main__':
    unittest.main()
