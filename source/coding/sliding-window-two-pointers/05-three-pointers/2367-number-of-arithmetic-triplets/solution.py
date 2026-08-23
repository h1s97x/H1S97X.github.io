from typing import List


class Solution:
    def arithmeticTriplets(self, nums: List[int], diff: int) -> int:
        n = len(nums)
        i = j = 0
        ans = 0
        for k in range(n):
            x = nums[k]
            while j < k and x - nums[j] > diff:
                j += 1
            if j == k or x - nums[j] != diff:
                continue
            while i < j and nums[j] - nums[i] > diff:
                i += 1
            if i < j and nums[j] - nums[i] == diff:
                ans += 1
        return ans
