import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_true_basic(self):
        self.assertTrue(Solution().backspaceCompare("ab#c", "ad#c"))

    def test_true_all(self):
        self.assertTrue(Solution().backspaceCompare("a##c", "#a#c"))

    def test_false(self):
        self.assertFalse(Solution().backspaceCompare("a#c", "b"))


if __name__ == '__main__':
    unittest.main()
