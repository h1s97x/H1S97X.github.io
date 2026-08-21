import unittest


class TestConvertTemperature(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        result = self.solution.convertTemperature(36.50)
        self.assertAlmostEqual(result[0], 309.65000)
        self.assertAlmostEqual(result[1], 97.70000)

    def test_example2(self):
        result = self.solution.convertTemperature(122.11)
        self.assertAlmostEqual(result[0], 395.26000)
        self.assertAlmostEqual(result[1], 251.79800)

    def test_zero(self):
        result = self.solution.convertTemperature(0)
        self.assertAlmostEqual(result[0], 273.15)
        self.assertAlmostEqual(result[1], 32.00)


if __name__ == '__main__':
    unittest.main()