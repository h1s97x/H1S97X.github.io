import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/3-longest-substring")
from solution import Solution
import unittest

class TestLengthOfLongestSubstring(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("abcabcbb"), 3)

    def test_example2(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("bbbbb"), 1)

    def test_example3(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("pwwkew"), 3)

    def test_empty(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring(""), 0)

    def test_single(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("a"), 1)

    def test_all_unique(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("abcdef"), 6)

if __name__ == "__main__":
    unittest.main()