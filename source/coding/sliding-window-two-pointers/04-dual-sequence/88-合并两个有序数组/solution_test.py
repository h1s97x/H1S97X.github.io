import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unittest

from solution import Solution


class TestSolution(unittest.TestCase):
    def test_merge(self):
        nums1 = [1, 2, 3, 0, 0, 0]
        Solution().merge(nums1, 3, [2, 5, 6], 3)
        self.assertEqual(nums1, [1, 2, 2, 3, 5, 6])

    def test_n_is_zero(self):
        nums1 = [1]
        Solution().merge(nums1, 1, [], 0)
        self.assertEqual(nums1, [1])

    def test_m_is_zero(self):
        nums1 = [0]
        Solution().merge(nums1, 0, [1], 1)
        self.assertEqual(nums1, [1])


if __name__ == '__main__':
    unittest.main()
