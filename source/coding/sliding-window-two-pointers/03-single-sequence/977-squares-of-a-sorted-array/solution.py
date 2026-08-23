from typing import List


class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [0] * n
        left, right = 0, n - 1
        pos = n - 1
        while left <= right:
            l2 = nums[left] * nums[left]
            r2 = nums[right] * nums[right]
            if l2 > r2:
                ans[pos] = l2
                left += 1
            else:
                ans[pos] = r2
                right -= 1
            pos -= 1
        return ans