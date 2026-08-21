import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/3090-max-two-occurrences")
from solution import Solution
import unittest

class TestMaximumLengthSubstring(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maximumLengthSubstring("bcbbbcba"), 4)

    def test_example2(self):
        self.assertEqual(self.solution.maximumLengthSubstring("aaaa"), 2)

    def test_all_unique(self):
        self.assertEqual(self.solution.maximumLengthSubstring("abcdef"), 6)

    def test_single_char(self):
        self.assertEqual(self.solution.maximumLengthSubstring("a"), 1)

    def test_two_chars(self):
        self.assertEqual(self.solution.maximumLengthSubstring("ab"), 2)

if __name__ == "__main__":
    unittest.main()