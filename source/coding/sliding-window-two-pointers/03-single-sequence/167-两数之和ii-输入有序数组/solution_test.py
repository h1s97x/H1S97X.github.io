import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import unittest

from solution import Solution


class Test167(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(Solution().twoSum([2, 7, 11, 15], 9), [1, 2])

    def test_example2(self):
        self.assertEqual(Solution().twoSum([2, 3, 4], 6), [1, 3])

    def test_example3(self):
        self.assertEqual(Solution().twoSum([-1, 0], -1), [1, 2])


if __name__ == '__main__':
    unittest.main()