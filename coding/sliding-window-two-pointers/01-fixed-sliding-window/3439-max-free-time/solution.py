class Solution:
    def maxFreeTime(self, eventTime: int, k: int, startTime: list[int], endTime: list[int]) -> int:
        n = len(startTime)
        gaps = [0] * (n + 1)
        gaps[0] = startTime[0]
        for i in range(1, n):
            gaps[i] = startTime[i] - endTime[i - 1]
        gaps[n] = eventTime - endTime[-1]

        cur = sum(gaps[:k + 1])
        ans = cur
        for i in range(k + 1, n + 1):
            cur += gaps[i] - gaps[i - (k + 1)]
            if cur > ans:
                ans = cur

        return ans