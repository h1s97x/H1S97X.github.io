from typing import List


class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        i = 0
        while i < n:
            if nums[i] == 0:
                i += 1
                continue
            j = i
            while j + 1 < n and nums[j + 1] == 1:
                j += 1
            ans = max(ans, j - i + 1)
            i = j + 1
        return ans
