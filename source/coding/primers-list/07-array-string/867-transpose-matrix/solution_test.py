import unittest


class TestTranspose(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_square(self):
        self.assertEqual(self.solution.transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
                         [[1, 4, 7], [2, 5, 8], [3, 6, 9]])

    def test_rectangular(self):
        self.assertEqual(self.solution.transpose([[1, 2, 3], [4, 5, 6]]),
                         [[1, 4], [2, 5], [3, 6]])

    def test_single(self):
        self.assertEqual(self.solution.transpose([[1]]), [[1]])


if __name__ == '__main__':
    unittest.main()