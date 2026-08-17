import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestDistinctPoints(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.distinctPoints("LUL", 1), 2)

    def test_example2(self):
        self.assertEqual(self.solution.distinctPoints("UDLR", 4), 1)

    def test_example3(self):
        self.assertEqual(self.solution.distinctPoints("UU", 1), 1)

    def test_all_same(self):
        self.assertEqual(self.solution.distinctPoints("RRRR", 2), 1)

    def test_k_equals_n(self):
        self.assertEqual(self.solution.distinctPoints("RL", 2), 1)

    def test_cyclic(self):
        self.assertEqual(self.solution.distinctPoints("RLRU", 2), 2)

    def test_no_overlap(self):
        self.assertEqual(self.solution.distinctPoints("URDL", 2), 3)


if __name__ == "__main__":
    unittest.main()