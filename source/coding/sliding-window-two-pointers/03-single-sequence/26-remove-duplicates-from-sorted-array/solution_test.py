import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        nums = [1, 1, 2]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 2)
        self.assertEqual(nums[:k], [1, 2])

    def test_multi_dup(self):
        nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 5)
        self.assertEqual(nums[:k], [0, 1, 2, 3, 4])

    def test_no_dup(self):
        nums = [1, 2, 3, 4]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 4)

    def test_single(self):
        nums = [5]
        k = Solution().removeDuplicates(nums)
        self.assertEqual(k, 1)


if __name__ == "__main__":
    unittest.main()