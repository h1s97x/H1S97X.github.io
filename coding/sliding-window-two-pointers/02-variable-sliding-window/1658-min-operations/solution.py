from typing import List


class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        total = sum(nums)
        target = total - x
        if target < 0:
            return -1
        if target == 0:
            return len(nums)

        n = len(nums)
        ans = -1
        left = window = 0
        for right in range(n):
            window += nums[right]
            while window > target:
                window -= nums[left]
                left += 1
            if window == target:
                ans = max(ans, right - left + 1)
        return -1 if ans == -1 else n - ans