import unittest


class TestPeakIndexInMountainArray(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([0, 1, 0]), 1)

    def test_example2(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([0, 2, 1, 0]), 1)

    def test_example3(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([24, 69, 100, 99, 79, 78, 67, 36, 26, 19]), 2)

    def test_large(self):
        self.assertEqual(self.solution.peakIndexInMountainArray([1, 2, 3, 4, 5, 3, 1]), 4)


if __name__ == '__main__':
    unittest.main()