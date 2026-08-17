class Solution:
    def minFlips(self, s: str) -> int:
        n = len(s)
        s2 = s + s
        diff = [0] * (2 * n)
        for i, ch in enumerate(s2):
            target = '0' if i % 2 == 0 else '1'
            diff[i] = 1 if ch != target else 0

        cur = sum(diff[:n])
        ans = n
        for l in range(n):
            flips = cur if l % 2 == 0 else n - cur
            ans = min(ans, flips, n - flips)
            cur += diff[l + n] - diff[l]
        return ans