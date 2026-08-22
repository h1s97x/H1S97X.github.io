import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

import unittest
from solution import Solution


class TestSolution(unittest.TestCase):

    def test_basic(self):
        nums = [2, 0, 2, 1, 1, 0]
        Solution().sortColors(nums)
        self.assertEqual(nums, [0, 0, 1, 1, 2, 2])

    def test_three(self):
        nums = [2, 0, 1]
        Solution().sortColors(nums)
        self.assertEqual(nums, [0, 1, 2])

    def test_already_sorted(self):
        nums = [0, 1, 2]
        Solution().sortColors(nums)
        self.assertEqual(nums, [0, 1, 2])

    def test_single(self):
        nums = [0]
        Solution().sortColors(nums)
        self.assertEqual(nums, [0])


if __name__ == "__main__":
    unittest.main()