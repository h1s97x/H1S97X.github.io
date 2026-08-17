import unittest


class TestMaxVowels(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxVowels("abciiidef", 3), 3)

    def test_example2(self):
        self.assertEqual(self.solution.maxVowels("aeiou", 2), 2)

    def test_example3(self):
        self.assertEqual(self.solution.maxVowels("leetcode", 3), 2)

    def test_single_char(self):
        self.assertEqual(self.solution.maxVowels("a", 1), 1)

    def test_no_vowel(self):
        self.assertEqual(self.solution.maxVowels("bcdfg", 2), 0)


if __name__ == "__main__":
    unittest.main()