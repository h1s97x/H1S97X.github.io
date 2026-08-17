import unittest


class TestSubtractProductAndSum(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.subtractProductAndSum(234), 15)

    def test_example2(self):
        self.assertEqual(self.solution.subtractProductAndSum(4421), 21)

    def test_single(self):
        self.assertEqual(self.solution.subtractProductAndSum(5), 0)

    def test_all_ones(self):
        self.assertEqual(self.solution.subtractProductAndSum(111), -1)


if __name__ == '__main__':
    unittest.main()