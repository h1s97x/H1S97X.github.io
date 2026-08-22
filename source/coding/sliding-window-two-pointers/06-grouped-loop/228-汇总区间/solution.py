from typing import List


class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        res = []
        n = len(nums)
        i = 0
        while i < n:
            start = nums[i]
            j = i
            while j + 1 < n and nums[j + 1] == nums[j] + 1:
                j += 1
            if start == nums[j]:
                res.append(str(start))
            else:
                res.append(f"{start}->{nums[j]}")
            i = j + 1
        return res
