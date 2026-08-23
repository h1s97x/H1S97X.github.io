import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import unittest

from solution import Solution


class Test125(unittest.TestCase):
    def test_example1(self):
        self.assertTrue(Solution().isPalindrome("A man, a plan, a canal: Panama"))

    def test_example2(self):
        self.assertFalse(Solution().isPalindrome("race a car"))

    def test_empty_space(self):
        self.assertTrue(Solution().isPalindrome(" "))

    def test_underscore(self):
        self.assertTrue(Solution().isPalindrome("ab_a"))


if __name__ == '__main__':
    unittest.main()