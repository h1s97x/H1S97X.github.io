import unittest


class TestMaximumSubarraySum(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3), 15)

    def test_example2(self):
        self.assertEqual(self.solution.maximumSubarraySum([4, 4, 4], 3), 0)

    def test_all_distinct(self):
        self.assertEqual(self.solution.maximumSubarraySum([1, 2, 3, 4], 3), 9)


if __name__ == "__main__":
    unittest.main()