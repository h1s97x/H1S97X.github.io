import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/02-variable-sliding-window/2024-max-consecutive-answers")
from solution import Solution
import unittest

class TestMaxConsecutiveAnswers(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TTFF", 2), 4)

    def test_example2(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TFFT", 1), 3)

    def test_example3(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TTFTTFTT", 1), 5)

    def test_all_same(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TTTT", 2), 4)

    def test_k_zero(self):
        self.assertEqual(self.solution.maxConsecutiveAnswers("TFTF", 0), 1)

if __name__ == "__main__":
    unittest.main()