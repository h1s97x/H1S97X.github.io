from collections import Counter


class Solution:
    def maxSum(self, nums: list[int], m: int, k: int) -> int:
        window = Counter(nums[:k])
        cur = sum(nums[:k])
        ans = cur if len(window) >= m else 0
        for i in range(k, len(nums)):
            out = nums[i - k]
            window[out] -= 1
            if window[out] == 0:
                del window[out]
            window[nums[i]] += 1
            cur += nums[i] - out
            if len(window) >= m and cur > ans:
                ans = cur
        return ans