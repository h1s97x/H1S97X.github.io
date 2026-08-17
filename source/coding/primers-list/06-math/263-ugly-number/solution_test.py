import unittest


class TestIsUgly(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_six(self):
        self.assertTrue(self.solution.isUgly(6))

    def test_one(self):
        self.assertTrue(self.solution.isUgly(1))

    def test_fourteen(self):
        self.assertFalse(self.solution.isUgly(14))

    def test_zero(self):
        self.assertFalse(self.solution.isUgly(0))

    def test_negative(self):
        self.assertFalse(self.solution.isUgly(-6))


if __name__ == '__main__':
    unittest.main()