import unittest


class TestNumIdenticalPairs(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.numIdenticalPairs([1, 2, 3, 1, 1, 3]), 4)

    def test_example2(self):
        self.assertEqual(self.solution.numIdenticalPairs([1, 1, 1, 1]), 6)

    def test_no_pairs(self):
        self.assertEqual(self.solution.numIdenticalPairs([1, 2, 3]), 0)

    def test_single(self):
        self.assertEqual(self.solution.numIdenticalPairs([1]), 0)


if __name__ == '__main__':
    unittest.main()