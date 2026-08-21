import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/2200-k-distant-indices")
from solution import Solution
import unittest

class TestFindKDistantIndices(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.findKDistantIndices([3,4,9,1,3,9,5], 9, 1), [1,2,3,4,5,6])

    def test_example2(self):
        self.assertEqual(self.solution.findKDistantIndices([2,2,2,2,2], 2, 2), [0,1,2,3,4])

    def test_single_key(self):
        self.assertEqual(self.solution.findKDistantIndices([1,2,3,4,5], 3, 1), [1,2,3])

    def test_no_key(self):
        self.assertEqual(self.solution.findKDistantIndices([1,2,3], 4, 1), [])

    def test_k_large(self):
        self.assertEqual(self.solution.findKDistantIndices([1,2,1,2,1], 1, 10), [0,1,2,3,4])

if __name__ == "__main__":
    unittest.main()