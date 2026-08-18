import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/1208-equal-substrings")
from solution import Solution
import unittest

class TestEqualSubstring(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.equalSubstring("abcd", "bcdf", 3), 3)

    def test_example2(self):
        self.assertEqual(self.solution.equalSubstring("abcd", "cdef", 3), 1)

    def test_example3(self):
        self.assertEqual(self.solution.equalSubstring("abcd", "acde", 0), 1)

    def test_same_string(self):
        self.assertEqual(self.solution.equalSubstring("aaaa", "aaaa", 5), 4)

    def test_zero_cost(self):
        self.assertEqual(self.solution.equalSubstring("abc", "def", 0), 0)

    def test_all_single_chars(self):
        self.assertEqual(self.solution.equalSubstring("a", "b", 1), 1)
        self.assertEqual(self.solution.equalSubstring("a", "b", 0), 0)

if __name__ == "__main__":
    unittest.main()