import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/2730-semi-repetitive")
from solution import Solution
import unittest

class TestSemiRepetitive(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.longestSemiRepetitiveSubstring("52233"), 4)

    def test_example2(self):
        self.assertEqual(self.solution.longestSemiRepetitiveSubstring("5494"), 4)

    def test_example3(self):
        self.assertEqual(self.solution.longestSemiRepetitiveSubstring("1111111"), 2)

    def test_single(self):
        self.assertEqual(self.solution.longestSemiRepetitiveSubstring("1"), 1)

    def test_no_repeat(self):
        self.assertEqual(self.solution.longestSemiRepetitiveSubstring("12345"), 5)

if __name__ == "__main__":
    unittest.main()