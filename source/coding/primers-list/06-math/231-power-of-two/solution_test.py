import unittest


class TestIsPowerOfTwo(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_one(self):
        self.assertTrue(self.solution.isPowerOfTwo(1))

    def test_sixteen(self):
        self.assertTrue(self.solution.isPowerOfTwo(16))

    def test_not_power(self):
        self.assertFalse(self.solution.isPowerOfTwo(3))

    def test_zero(self):
        self.assertFalse(self.solution.isPowerOfTwo(0))

    def test_negative(self):
        self.assertFalse(self.solution.isPowerOfTwo(-16))


if __name__ == '__main__':
    unittest.main()