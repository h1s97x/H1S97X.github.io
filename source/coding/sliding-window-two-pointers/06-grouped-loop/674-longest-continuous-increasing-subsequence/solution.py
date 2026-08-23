from typing import List


class Solution:
    def findLengthOfLCIS(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        i = 0
        while i < n:
            j = i
            while j + 1 < n and nums[j + 1] > nums[j]:
                j += 1
            ans = max(ans, j - i + 1)
            i = j + 1
        return ans
