import unittest


class TestCountGoodTriplets(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3), 4)

    def test_example2(self):
        self.assertEqual(self.solution.countGoodTriplets([1, 1, 2, 2, 3], 0, 0, 1), 0)

    def test_all_valid(self):
        self.assertEqual(self.solution.countGoodTriplets([1, 1, 1], 0, 0, 0), 1)


if __name__ == '__main__':
    unittest.main()