import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestMaximumBeauty(unittest.TestCase):
    def test_example1(self):
        nums = [4, 6, 1, 2]
        k = 2
        self.assertEqual(Solution().maximumBeauty(nums, k), 3)

    def test_example2(self):
        nums = [1, 1, 1, 1]
        k = 10
        self.assertEqual(Solution().maximumBeauty(nums, k), 4)

    def test_single(self):
        nums = [5]
        k = 0
        self.assertEqual(Solution().maximumBeauty(nums, k), 1)

    def test_no_range(self):
        nums = [1, 10, 100]
        k = 0
        self.assertEqual(Solution().maximumBeauty(nums, k), 1)

    def test_large_k(self):
        nums = [1, 3, 5, 7]
        k = 5
        self.assertEqual(Solution().maximumBeauty(nums, k), 4)

    def test_two_elements(self):
        nums = [1, 10]
        k = 4
        self.assertEqual(Solution().maximumBeauty(nums, k), 1)


if __name__ == "__main__":
    unittest.main()