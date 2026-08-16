import unittest


class TestToLowerCase(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_mixed(self):
        self.assertEqual(self.solution.toLowerCase("Hello"), "hello")

    def test_lower(self):
        self.assertEqual(self.solution.toLowerCase("here"), "here")

    def test_upper(self):
        self.assertEqual(self.solution.toLowerCase("LOVELY"), "lovely")

    def test_non_alpha(self):
        self.assertEqual(self.solution.toLowerCase("123!@#"), "123!@#")


if __name__ == '__main__':
    unittest.main()