import unittest


class TestVowelStrings(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.vowelStrings(["are", "amy", "u"], 0, 2), 2)

    def test_example2(self):
        self.assertEqual(self.solution.vowelStrings(["hey", "aeo", "mu", "ooo", "artro"], 1, 4), 2)

    def test_none(self):
        self.assertEqual(self.solution.vowelStrings(["bc", "df"], 0, 2), 0)


if __name__ == '__main__':
    unittest.main()