import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        nums = [0, 1, 0, 3, 12]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [1, 3, 12, 0, 0])

    def test_all_zero(self):
        nums = [0, 0, 0]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [0, 0, 0])

    def test_leading_zeros(self):
        nums = [0, 0, 1]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [1, 0, 0])

    def test_single(self):
        nums = [0]
        Solution().moveZeroes(nums)
        self.assertEqual(nums, [0])


if __name__ == "__main__":
    unittest.main()