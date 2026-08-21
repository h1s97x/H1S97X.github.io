import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/1016-binary-substrings")
from solution import Solution
import unittest

class TestQueryString(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertTrue(self.solution.queryString("0110", 3))

    def test_example2(self):
        self.assertFalse(self.solution.queryString("0110", 4))

    def test_small_n(self):
        self.assertTrue(self.solution.queryString("1", 1))

    def test_large_n_early_false(self):
        s = "0" * 1000
        self.assertFalse(self.solution.queryString(s, 100000))

    def test_contains_all(self):
        self.assertTrue(self.solution.queryString("11011101100", 5))

    def test_not_contain(self):
        self.assertFalse(self.solution.queryString("111", 4))

    def test_long_s(self):
        s = "01101110010111011110001001101010111100110111101111"
        self.assertTrue(self.solution.queryString(s, 5))

if __name__ == "__main__":
    unittest.main()