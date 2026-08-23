import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_basic(self):
        nums = [3, 2, 2, 3]
        k = Solution().removeElement(nums, 3)
        self.assertEqual(k, 2)
        self.assertEqual(nums[:k], [2, 2])

    def test_more_occurrences(self):
        nums = [0, 1, 2, 2, 3, 0, 4, 2]
        k = Solution().removeElement(nums, 2)
        self.assertEqual(k, 5)
        self.assertEqual(nums[:k], [0, 1, 3, 0, 4])

    def test_no_val(self):
        nums = [1, 2, 3]
        k = Solution().removeElement(nums, 0)
        self.assertEqual(k, 3)

    def test_all_val(self):
        nums = [2, 2, 2]
        k = Solution().removeElement(nums, 2)
        self.assertEqual(k, 0)


if __name__ == "__main__":
    unittest.main()