import unittest


class TestXorOperation(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.xorOperation(5, 0), 8)

    def test_example2(self):
        self.assertEqual(self.solution.xorOperation(4, 3), 8)

    def test_single(self):
        self.assertEqual(self.solution.xorOperation(1, 7), 7)

    def test_large(self):
        self.assertEqual(self.solution.xorOperation(10, 5), 2)


if __name__ == '__main__':
    unittest.main()