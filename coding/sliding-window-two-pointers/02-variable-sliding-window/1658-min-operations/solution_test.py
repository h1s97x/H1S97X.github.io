import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestMinOperations(unittest.TestCase):
    def test_example1(self):
        nums = [1, 1, 4, 2, 3]
        x = 5
        self.assertEqual(Solution().minOperations(nums, x), 2)

    def test_example2(self):
        nums = [5, 6, 7, 8, 9]
        x = 4
        self.assertEqual(Solution().minOperations(nums, x), -1)

    def test_example3(self):
        nums = [3, 2, 20, 1, 1, 3]
        x = 10
        self.assertEqual(Solution().minOperations(nums, x), 5)

    def test_remove_all(self):
        nums = [1, 2, 3]
        x = 6
        self.assertEqual(Solution().minOperations(nums, x), 3)

    def test_remove_first(self):
        nums = [5, 2, 3, 1, 1]
        x = 5
        self.assertEqual(Solution().minOperations(nums, x), 1)

    def test_single_element(self):
        nums = [1]
        x = 1
        self.assertEqual(Solution().minOperations(nums, x), 1)

    def test_single_element_impossible(self):
        nums = [1]
        x = 2
        self.assertEqual(Solution().minOperations(nums, x), -1)


if __name__ == "__main__":
    unittest.main()