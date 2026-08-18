import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from solution import Solution


class TestTakeCharacters(unittest.TestCase):
    def test_example1(self):
        s = "aabaaaacaabc"
        k = 2
        self.assertEqual(Solution().takeCharacters(s, k), 8)

    def test_example2(self):
        s = "a"
        k = 1
        self.assertEqual(Solution().takeCharacters(s, k), -1)

    def test_k_zero(self):
        s = "abc"
        k = 0
        self.assertEqual(Solution().takeCharacters(s, k), 0)

    def test_all_take(self):
        s = "aabbcc"
        k = 2
        self.assertEqual(Solution().takeCharacters(s, k), 6)

    def test_partial(self):
        s = "abc"
        k = 1
        self.assertEqual(Solution().takeCharacters(s, k), 3)

    def test_single_char(self):
        s = "aaaa"
        k = 2
        self.assertEqual(Solution().takeCharacters(s, k), -1)


if __name__ == "__main__":
    unittest.main()