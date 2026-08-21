import sys
sys.path.insert(0, "/workspace/projects/source/coding/sliding-window-two-pointers/01-fixed-sliding-window/2156-substring-hash")
from solution import Solution
import unittest

class TestSubStrHash(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.subStrHash("leetcode", 7, 20, 2, 0), "ee")

    def test_example2(self):
        self.assertEqual(self.solution.subStrHash("fbxzaad", 31, 100, 3, 32), "fbx")

    def test_single_char(self):
        self.assertEqual(self.solution.subStrHash("a", 1, 10, 1, 1), "a")

    def test_large_k(self):
        s = "abcde"
        # hash = 1*1 + 2*2 + 3*4 + 4*8 + 5*16 = 1+4+12+32+80 = 129 ≡ 29 (mod 100)
        self.assertEqual(self.solution.subStrHash(s, 2, 100, 5, 29), "abcde")

    def test_multiple_matches(self):
        # s="aaa", power=1, modulo=10, k=2, hashValue=2
        # "aa": 1+1 = 2 ≡ 2 (mod 10)
        self.assertEqual(self.solution.subStrHash("aaa", 1, 10, 2, 2), "aa")

if __name__ == "__main__":
    unittest.main()
