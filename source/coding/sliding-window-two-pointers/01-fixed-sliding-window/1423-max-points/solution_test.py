import unittest


class TestMaxScore(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxScore([1, 2, 3, 4, 5, 6, 1], 3), 12)

    def test_example2(self):
        self.assertEqual(self.solution.maxScore([2, 2, 2], 2), 4)

    def test_take_all(self):
        self.assertEqual(self.solution.maxScore([1, 2, 3], 3), 6)


if __name__ == "__main__":
    unittest.main()