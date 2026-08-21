class Solution:
    def maxScore(self, cardPoints: list[int], k: int) -> int:
        n = len(cardPoints)
        total = sum(cardPoints)
        if k == n:
            return total
        m = n - k
        cur = sum(cardPoints[:m])
        min_sum = cur
        for i in range(m, n):
            cur += cardPoints[i] - cardPoints[i - m]
            if cur < min_sum:
                min_sum = cur
        return total - min_sum