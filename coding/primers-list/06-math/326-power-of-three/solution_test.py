import unittest


class TestIsPowerOfThree(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_twentyseven(self):
        self.assertTrue(self.solution.isPowerOfThree(27))

    def test_nine(self):
        self.assertTrue(self.solution.isPowerOfThree(9))

    def test_zero(self):
        self.assertFalse(self.solution.isPowerOfThree(0))

    def test_not_power(self):
        self.assertFalse(self.solution.isPowerOfThree(45))

    def test_negative(self):
        self.assertFalse(self.solution.isPowerOfThree(-3))


if __name__ == '__main__':
    unittest.main()