import unittest


class TestAddTwoIntegers(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_positive(self):
        self.assertEqual(self.solution.sum(12, 5), 17)

    def test_negative(self):
        self.assertEqual(self.solution.sum(-10, 4), -6)

    def test_zero(self):
        self.assertEqual(self.solution.sum(0, 0), 0)


if __name__ == '__main__':
    unittest.main()