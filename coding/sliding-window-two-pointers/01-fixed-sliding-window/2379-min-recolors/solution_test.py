import unittest


class TestMinimumRecolors(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.minimumRecolors("WBBWWBBWBW", 7), 3)

    def test_example2(self):
        self.assertEqual(self.solution.minimumRecolors("WBWBBBW", 2), 0)

    def test_all_white(self):
        self.assertEqual(self.solution.minimumRecolors("WWWWW", 3), 3)


if __name__ == "__main__":
    unittest.main()