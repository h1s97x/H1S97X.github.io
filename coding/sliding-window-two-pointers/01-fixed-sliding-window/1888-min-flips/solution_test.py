import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMinFlips(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.minFlips("111000"), 2)

    def test_example2(self):
        self.assertEqual(self.solution.minFlips("010"), 0)

    def test_example3(self):
        self.assertEqual(self.solution.minFlips("1110"), 1)

    def test_single_char(self):
        self.assertEqual(self.solution.minFlips("0"), 0)
        self.assertEqual(self.solution.minFlips("1"), 0)

    def test_already_alternating(self):
        self.assertEqual(self.solution.minFlips("01"), 0)
        self.assertEqual(self.solution.minFlips("10"), 0)
        self.assertEqual(self.solution.minFlips("0101"), 0)

    def test_all_same(self):
        self.assertEqual(self.solution.minFlips("000"), 1)
        self.assertEqual(self.solution.minFlips("111"), 1)
        self.assertEqual(self.solution.minFlips("0000"), 2)

    def test_longer(self):
        self.assertEqual(self.solution.minFlips("01001001101"), 2)


if __name__ == "__main__":
    unittest.main()