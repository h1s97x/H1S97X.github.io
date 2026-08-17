import unittest


class TestAddDigits(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.addDigits(38), 2)

    def test_zero(self):
        self.assertEqual(self.solution.addDigits(0), 0)

    def test_single(self):
        self.assertEqual(self.solution.addDigits(5), 5)

    def test_large(self):
        self.assertEqual(self.solution.addDigits(999), 9)


if __name__ == '__main__':
    unittest.main()