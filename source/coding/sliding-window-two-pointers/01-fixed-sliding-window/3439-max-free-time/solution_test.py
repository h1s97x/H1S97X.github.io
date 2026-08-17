import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMaxFreeTime(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxFreeTime(5, 1, [1, 3], [2, 5]), 2)

    def test_example2(self):
        self.assertEqual(self.solution.maxFreeTime(10, 1, [0, 2, 9], [1, 4, 10]), 6)

    def test_example3(self):
        self.assertEqual(self.solution.maxFreeTime(5, 2, [0, 1, 2, 3, 4], [1, 2, 3, 4, 5]), 0)

    def test_k_equals_n(self):
        self.assertEqual(self.solution.maxFreeTime(10, 3, [1, 3, 5], [2, 4, 6]), 7)

    def test_move_middle_meetings(self):
        self.assertEqual(self.solution.maxFreeTime(10, 2, [1, 3, 5], [2, 4, 6]), 6)

    def test_single_meeting(self):
        self.assertEqual(self.solution.maxFreeTime(10, 1, [2], [5]), 7)

    def test_no_gap(self):
        self.assertEqual(self.solution.maxFreeTime(5, 1, [0, 2], [2, 5]), 0)


if __name__ == "__main__":
    unittest.main()