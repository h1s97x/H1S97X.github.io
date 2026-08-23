from typing import List

class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """Do not return anything, modify nums in-place instead."""
        n = len(nums)
        low, mid, high = 0, 0, n - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 2:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1
            else:
                mid += 1