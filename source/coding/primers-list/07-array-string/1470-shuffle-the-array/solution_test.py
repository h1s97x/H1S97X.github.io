import unittest


class TestShuffle(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.shuffle([2, 5, 1, 3, 4, 7], 3), [2, 3, 5, 4, 1, 7])

    def test_example2(self):
        self.assertEqual(self.solution.shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4), [1, 4, 2, 3, 3, 2, 4, 1])

    def test_single(self):
        self.assertEqual(self.solution.shuffle([1, 2], 1), [1, 2])


if __name__ == '__main__':
    unittest.main()