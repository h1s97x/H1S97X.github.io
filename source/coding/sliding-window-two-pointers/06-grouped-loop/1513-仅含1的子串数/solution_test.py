import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().numSub("0110111"), 9)

    def test_example2(self):
        self.assertEqual(Solution().numSub("101"), 2)


if __name__ == '__main__':
    unittest.main()
