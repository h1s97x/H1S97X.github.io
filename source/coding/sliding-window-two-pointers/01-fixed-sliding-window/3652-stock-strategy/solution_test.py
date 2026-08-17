import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMaxProfit(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxProfit([4, 2, 8], [-1, 0, 1], 2), 10)

    def test_example2(self):
        self.assertEqual(self.solution.maxProfit([5, 4, 3], [1, 1, 0], 2), 9)

    def test_no_modification_needed(self):
        self.assertEqual(self.solution.maxProfit([3, 5, 2], [1, 1, 1], 2), 10)

    def test_all_buy_then_sell(self):
        self.assertEqual(self.solution.maxProfit([1, 2, 3, 4], [-1, -1, 1, 1], 2), 9)

    def test_k_equals_n(self):
        self.assertEqual(self.solution.maxProfit([1, 2], [-1, 1], 2), 2)

    def test_no_modification(self):
        prices = [10, 5, 15]
        strategy = [1, 1, 1]
        k = 2
        self.assertEqual(self.solution.maxProfit(prices, strategy, k), 30)


if __name__ == "__main__":
    unittest.main()