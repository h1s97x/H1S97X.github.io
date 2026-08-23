import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_true(self):
        self.assertTrue(Solution().isLongPressedName("alex", "aaleex"))

    def test_false(self):
        self.assertFalse(Solution().isLongPressedName("saeed", "ssaaedd"))

    def test_true_single(self):
        self.assertTrue(Solution().isLongPressedName("leelee", "lleeelee"))


if __name__ == '__main__':
    unittest.main()
