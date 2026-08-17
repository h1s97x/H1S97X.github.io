import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMaxFreq(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxFreq("aababcaab", 2, 3, 4), 2)

    def test_example2(self):
        self.assertEqual(self.solution.maxFreq("aaaa", 1, 3, 3), 2)

    def test_example3(self):
        self.assertEqual(self.solution.maxFreq("aabcabcab", 2, 2, 3), 3)

    def test_no_valid_substring(self):
        self.assertEqual(self.solution.maxFreq("abcde", 1, 2, 3), 0)

    def test_max_letters_zero(self):
        self.assertEqual(self.solution.maxFreq("abc", 0, 1, 1), 0)


if __name__ == "__main__":
    unittest.main()