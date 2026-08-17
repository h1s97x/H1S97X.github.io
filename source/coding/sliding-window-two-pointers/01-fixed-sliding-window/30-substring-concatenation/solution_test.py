import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestFindSubstring(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(
            self.solution.findSubstring("barfoothefoobarman", ["foo", "bar"]),
            [0, 9]
        )

    def test_example2(self):
        self.assertEqual(
            self.solution.findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"]),
            []
        )

    def test_example3(self):
        self.assertEqual(
            self.solution.findSubstring("barfoofoobarthefoobarman", ["bar", "foo", "the"]),
            [6, 9, 12]
        )

    def test_empty_result(self):
        self.assertEqual(
            self.solution.findSubstring("abc", ["d", "e"]),
            []
        )

    def test_single_word(self):
        self.assertEqual(
            self.solution.findSubstring("aaaa", ["a"]),
            [0, 1, 2, 3]
        )

    def test_duplicate_words(self):
        self.assertEqual(
            self.solution.findSubstring("aaa", ["a", "a"]),
            [0, 1]
        )


if __name__ == "__main__":
    unittest.main()