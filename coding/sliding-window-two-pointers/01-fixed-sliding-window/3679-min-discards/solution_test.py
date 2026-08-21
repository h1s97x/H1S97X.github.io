import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from solution import Solution


class TestMinArrivalsToDiscard(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        arrivals = [1, 2, 1, 3, 1]
        w = 4
        m = 2
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 0)

    def test_example2(self):
        arrivals = [1, 2, 3, 3, 3, 4]
        w = 3
        m = 2
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 1)

    def test_all_same_type(self):
        arrivals = [1, 1, 1, 1, 1]
        w = 3
        m = 2
        # i=0: keep 1, cnt[1]=1
        # i=1: keep 1, cnt[1]=2
        # i=2: keep 1, cnt[1]=3 → wait, remove i=0? no, i=2 < w=3
        # Actually i=0,1,2: no removal yet. cnt[1]=3 > m=2 at i=2? No, at i=0 cnt=1, i=1 cnt=2, i=2 cnt=3 - but i=2 < w=3 so no removal
        # At i=2: cnt[1]=2 before adding, so cnt[1] < m=2? No, cnt[1]=2 which is not < 2, so cnt[1] >= m, discard
        # Hmm, let me re-trace
        # i=0: cnt[1]=0 < 2, keep, cnt[1]=1
        # i=1: cnt[1]=1 < 2, keep, cnt[1]=2
        # i=2: cnt[1]=2 >= 2, discard, ans=1
        # i=3: remove i=0 (1), cnt[1]=1. cnt[1]=1 < 2, keep, cnt[1]=2
        # i=4: remove i=1 (1), cnt[1]=1. cnt[1]=1 < 2, keep, cnt[1]=2
        # ans=1
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 1)

    def test_w_equals_one(self):
        arrivals = [1, 2, 1, 2]
        w = 1
        m = 1
        # Each window is just the current day, so each type can appear at most once
        # i=0: keep 1, cnt[1]=1
        # i=1: remove i=-1? no. cnt[2]=0 < 1, keep, cnt[2]=1
        # i=2: remove i=1 (2), cnt[2]=0. cnt[1]=0 < 1, keep, cnt[1]=1
        # i=3: remove i=2 (1), cnt[1]=0. cnt[2]=0 < 1, keep, cnt[2]=1
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 0)

    def test_all_discard(self):
        arrivals = [1, 1, 1]
        w = 2
        m = 1
        # i=0: keep 1, cnt[1]=1
        # i=1: cnt[1]=1 >= 1, discard, ans=1
        # i=2: remove i=0 (1), cnt[1]=0. cnt[1]=0 < 1, keep, cnt[1]=1
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 1)

    def test_large_m(self):
        arrivals = [1, 2, 3, 4, 5]
        w = 5
        m = 10
        self.assertEqual(self.solution.minArrivalsToDiscard(arrivals, w, m), 0)


if __name__ == "__main__":
    unittest.main()