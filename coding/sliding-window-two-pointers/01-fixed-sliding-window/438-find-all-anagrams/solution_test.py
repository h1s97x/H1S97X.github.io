import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestFindAnagrams(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.findAnagrams("cbaebabacd", "abc"), [0, 6])

    def test_example2(self):
        self.assertEqual(self.solution.findAnagrams("abab", "ab"), [0, 1, 2])

    def test_no_anagram(self):
        self.assertEqual(self.solution.findAnagrams("abcdef", "ghi"), [])

    def test_p_larger_than_s(self):
        self.assertEqual(self.solution.findAnagrams("a", "ab"), [])

    def test_same_string(self):
        self.assertEqual(self.solution.findAnagrams("abc", "abc"), [0])

    def test_duplicate_chars(self):
        self.assertEqual(self.solution.findAnagrams("aaa", "aa"), [0, 1])


if __name__ == "__main__":
    unittest.main()