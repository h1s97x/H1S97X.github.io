class Solution:
    def numOfSubarrays(self, arr: list[int], k: int, threshold: int) -> int:
        target = k * threshold
        cur = sum(arr[:k])
        ans = 1 if cur >= target else 0
        for i in range(k, len(arr)):
            cur += arr[i] - arr[i - k]
            if cur >= target:
                ans += 1
        return ans