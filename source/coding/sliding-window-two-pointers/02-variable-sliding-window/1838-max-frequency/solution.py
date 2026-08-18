from typing import List


class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        nums.sort()
        n = len(nums)
        ans = left = 0
        window_sum = 0
        for right in range(n):
            window_sum += nums[right]
            while nums[right] * (right - left + 1) - window_sum > k:
                window_sum -= nums[left]
                left += 1
            ans = max(ans, right - left + 1)
        return ans