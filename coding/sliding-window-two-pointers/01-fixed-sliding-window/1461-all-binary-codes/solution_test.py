import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/1461-all-binary-codes")
from solution import Solution
import unittest

class TestHasAllCodes(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertTrue(self.solution.hasAllCodes("00110110", 2))

    def test_example2(self):
        self.assertTrue(self.solution.hasAllCodes("0110", 1))

    def test_example3(self):
        self.assertFalse(self.solution.hasAllCodes("0110", 2))

    def test_long_string(self):
        s = "0" * 10000 + "1" * 10000
        self.assertFalse(self.solution.hasAllCodes(s, 10))

    def test_small_k(self):
        self.assertTrue(self.solution.hasAllCodes("01", 1))

    def test_not_enough(self):
        self.assertFalse(self.solution.hasAllCodes("000", 2))

if __name__ == "__main__":
    unittest.main()