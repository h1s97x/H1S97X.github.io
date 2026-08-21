class Solution:
    def findMaxAverage(self, nums: list[int], k: int) -> float:
        cur = sum(nums[:k])
        ans = cur
        for i in range(k, len(nums)):
            cur += nums[i] - nums[i - k]
            if cur > ans:
                ans = cur
        return ans / k