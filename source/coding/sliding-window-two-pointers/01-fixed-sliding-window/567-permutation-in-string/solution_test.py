import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestCheckInclusion(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertTrue(self.solution.checkInclusion("ab", "eidbaooo"))

    def test_example2(self):
        self.assertFalse(self.solution.checkInclusion("ab", "eidboaoo"))

    def test_same_string(self):
        self.assertTrue(self.solution.checkInclusion("abc", "abc"))

    def test_s1_larger_than_s2(self):
        self.assertFalse(self.solution.checkInclusion("abc", "ab"))

    def test_duplicate_chars(self):
        self.assertTrue(self.solution.checkInclusion("aab", "baa"))

    def test_single_char(self):
        self.assertTrue(self.solution.checkInclusion("a", "a"))
        self.assertFalse(self.solution.checkInclusion("a", "b"))


if __name__ == "__main__":
    unittest.main()