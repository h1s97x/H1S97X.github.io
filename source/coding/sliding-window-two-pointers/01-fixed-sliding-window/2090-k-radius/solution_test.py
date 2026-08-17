import unittest


class TestGetAverages(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(
            self.solution.getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3),
            [-1, -1, -1, 5, 4, 4, -1, -1, -1],
        )

    def test_example2(self):
        self.assertEqual(self.solution.getAverages([100000], 0), [100000])

    def test_small_array(self):
        self.assertEqual(self.solution.getAverages([1, 2], 1), [-1, -1])


if __name__ == "__main__":
    unittest.main()