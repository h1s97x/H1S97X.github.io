import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_odd_length(self):
        s = ["h", "e", "l", "l", "o"]
        Solution().reverseString(s)
        self.assertEqual(s, ["o", "l", "l", "e", "h"])

    def test_even_length(self):
        s = ["H", "a", "n", "n", "a", "h"]
        Solution().reverseString(s)
        self.assertEqual(s, ["h", "a", "n", "n", "a", "H"])

    def test_single(self):
        s = ["a"]
        Solution().reverseString(s)
        self.assertEqual(s, ["a"])

    def test_two(self):
        s = ["a", "b"]
        Solution().reverseString(s)
        self.assertEqual(s, ["b", "a"])


if __name__ == "__main__":
    unittest.main()