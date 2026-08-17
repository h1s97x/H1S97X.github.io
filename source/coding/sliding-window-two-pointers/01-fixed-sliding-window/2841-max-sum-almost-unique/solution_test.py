import unittest


class TestMaxSum(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maxSum([2, 6, 7, 3, 1, 7], 3, 4), 18)

    def test_example2(self):
        self.assertEqual(self.solution.maxSum([5, 9, 9, 2, 4, 5, 4], 1, 3), 23)

    def test_no_subarray(self):
        self.assertEqual(self.solution.maxSum([1, 1, 1], 2, 3), 0)


if __name__ == "__main__":
    unittest.main()