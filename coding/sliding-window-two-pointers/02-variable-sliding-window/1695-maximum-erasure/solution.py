class Solution:
    def maximumUniqueSubarray(self, nums: list[int]) -> int:
        ans = left = cur = 0
        seen = set()
        for right, x in enumerate(nums):
            while x in seen:
                seen.remove(nums[left])
                cur -= nums[left]
                left += 1
            seen.add(x)
            cur += x
            ans = max(ans, cur)
        return ans