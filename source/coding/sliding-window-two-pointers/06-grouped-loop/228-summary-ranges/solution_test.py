import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().summaryRanges([0, 1, 2, 4, 5, 7]),
                         ["0->2", "4->5", "7"])

    def test_example2(self):
        self.assertEqual(Solution().summaryRanges([0, 2, 3, 4, 6, 8, 9]),
                         ["0", "2->4", "6", "8->9"])


if __name__ == '__main__':
    unittest.main()
