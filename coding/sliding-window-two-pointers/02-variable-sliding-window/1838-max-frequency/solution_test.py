import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestMaxFrequency(unittest.TestCase):
    def test_example1(self):
        nums = [1, 2, 4]
        k = 5
        self.assertEqual(Solution().maxFrequency(nums, k), 3)

    def test_example2(self):
        nums = [1, 4, 8, 13]
        k = 5
        self.assertEqual(Solution().maxFrequency(nums, k), 2)

    def test_example3(self):
        nums = [3, 9, 6]
        k = 2
        self.assertEqual(Solution().maxFrequency(nums, k), 1)

    def test_single(self):
        nums = [5]
        k = 0
        self.assertEqual(Solution().maxFrequency(nums, k), 1)

    def test_all_same(self):
        nums = [1, 1, 1, 1]
        k = 0
        self.assertEqual(Solution().maxFrequency(nums, k), 4)

    def test_k_zero(self):
        nums = [1, 2, 3, 4]
        k = 0
        self.assertEqual(Solution().maxFrequency(nums, k), 1)

    def test_large_k(self):
        nums = [1, 2, 3, 4]
        k = 100
        self.assertEqual(Solution().maxFrequency(nums, k), 4)


if __name__ == "__main__":
    unittest.main()