import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestLongestEqualSubarray(unittest.TestCase):
    def test_example1(self):
        nums = [1, 3, 2, 3, 1, 3]
        k = 3
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 3)

    def test_example2(self):
        nums = [1, 1, 2, 2, 1, 1]
        k = 2
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 4)

    def test_k_zero(self):
        nums = [1, 2, 3, 4]
        k = 0
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 1)

    def test_all_same(self):
        nums = [1, 1, 1, 1]
        k = 0
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 4)

    def test_single(self):
        nums = [1]
        k = 0
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 1)

    def test_large_k(self):
        nums = [1, 2, 3, 4, 5]
        k = 4
        self.assertEqual(Solution().longestEqualSubarray(nums, k), 1)


if __name__ == "__main__":
    unittest.main()