import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/2953-complete-substrings")
from solution import Solution
import unittest

class TestCountCompleteSubstrings(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.countCompleteSubstrings("igigee", 2), 3)

    def test_example2(self):
        self.assertEqual(self.solution.countCompleteSubstrings("aaabbbccc", 3), 6)

    def test_single_char(self):
        self.assertEqual(self.solution.countCompleteSubstrings("a", 1), 1)

    def test_no_valid(self):
        self.assertEqual(self.solution.countCompleteSubstrings("abc", 2), 0)

    def test_same_char(self):
        self.assertEqual(self.solution.countCompleteSubstrings("aaaa", 2), 3)

if __name__ == "__main__":
    unittest.main()
