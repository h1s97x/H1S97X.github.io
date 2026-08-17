import unittest


class TestFindMaxAverage(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertAlmostEqual(
            self.solution.findMaxAverage([1, 12, -5, -6, 50, 3], 4), 12.75
        )

    def test_example2(self):
        self.assertAlmostEqual(self.solution.findMaxAverage([5], 1), 5.0)

    def test_negative(self):
        self.assertAlmostEqual(self.solution.findMaxAverage([-1, -2, -3], 2), -1.5)


if __name__ == "__main__":
    unittest.main()