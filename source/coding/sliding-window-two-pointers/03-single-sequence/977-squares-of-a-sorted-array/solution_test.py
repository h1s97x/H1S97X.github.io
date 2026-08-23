import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import unittest

from solution import Solution


class Test977(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(
            Solution().sortedSquares([-4, -1, 0, 3, 10]),
            [0, 1, 9, 16, 100],
        )

    def test_example2(self):
        self.assertEqual(
            Solution().sortedSquares([-7, -3, 2, 3, 11]),
            [4, 9, 9, 49, 121],
        )

    def test_single(self):
        self.assertEqual(Solution().sortedSquares([-2]), [4])


if __name__ == '__main__':
    unittest.main()