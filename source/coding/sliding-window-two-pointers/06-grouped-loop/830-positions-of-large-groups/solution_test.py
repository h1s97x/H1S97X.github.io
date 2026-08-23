import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().largeGroupPositions("abbxxxxzzy"), [[3, 6]])

    def test_example2(self):
        self.assertEqual(Solution().largeGroupPositions("abc"), [])

    def test_example3(self):
        self.assertEqual(Solution().largeGroupPositions("abcdddeeeeaabbbcd"),
                         [[3, 5], [6, 9], [12, 14]])


if __name__ == '__main__':
    unittest.main()
