import unittest


class TestMaxScore(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxScore("011101"), 5)

    def test_example2(self):
        self.assertEqual(self.solution.maxScore("00111"), 5)

    def test_all_zeros(self):
        self.assertEqual(self.solution.maxScore("00"), 1)

    def test_all_ones(self):
        self.assertEqual(self.solution.maxScore("11"), 1)


if __name__ == '__main__':
    unittest.main()