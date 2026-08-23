import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_true(self):
        self.assertTrue(Solution().isSubsequence("abc", "ahbgdc"))

    def test_false(self):
        self.assertFalse(Solution().isSubsequence("axc", "ahbgdc"))

    def test_empty_s(self):
        self.assertTrue(Solution().isSubsequence("", "ahbgdc"))


if __name__ == '__main__':
    unittest.main()
