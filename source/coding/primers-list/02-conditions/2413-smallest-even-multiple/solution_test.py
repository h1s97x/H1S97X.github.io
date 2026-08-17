import unittest


class TestSmallestEvenMultiple(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_odd(self):
        self.assertEqual(self.solution.smallestEvenMultiple(5), 10)

    def test_even(self):
        self.assertEqual(self.solution.smallestEvenMultiple(6), 6)

    def test_one(self):
        self.assertEqual(self.solution.smallestEvenMultiple(1), 2)

    def test_two(self):
        self.assertEqual(self.solution.smallestEvenMultiple(2), 2)


if __name__ == '__main__':
    unittest.main()