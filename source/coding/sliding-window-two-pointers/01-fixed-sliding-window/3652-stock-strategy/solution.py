class Solution:
    def maxProfit(self, prices: list[int], strategy: list[int], k: int) -> int:
        n = len(prices)
        half = k // 2

        base = 0
        gain0 = [0] * n
        gain1 = [0] * n
        for i in range(n):
            base += strategy[i] * prices[i]
            gain0[i] = -strategy[i] * prices[i]
            gain1[i] = (1 - strategy[i]) * prices[i]

        sum_first = sum(gain0[:half])
        sum_second = sum(gain1[half:k])
        max_gain = sum_first + sum_second

        for i in range(k, n):
            sum_first += gain0[i - half] - gain0[i - k]
            sum_second += gain1[i] - gain1[i - half]
            cur = sum_first + sum_second
            if cur > max_gain:
                max_gain = cur

        return base + max(max_gain, 0)