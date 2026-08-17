class Solution:
    def minArrivalsToDiscard(self, arrivals: list[int], w: int, m: int) -> int:
        max_val = max(arrivals)
        cnt = [0] * (max_val + 1)

        ans = 0
        for i, x in enumerate(arrivals):
            if i >= w:
                cnt[arrivals[i - w]] -= 1

            if cnt[x] >= m:
                ans += 1
            else:
                cnt[x] += 1

        return ans