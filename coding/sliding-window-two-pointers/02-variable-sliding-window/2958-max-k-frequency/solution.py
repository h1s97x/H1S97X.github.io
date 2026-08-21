class Solution:
    def maxSubarrayLength(self, nums: list[int], k: int) -> int:
        ans = left = 0
        cnt = {}
        for right, x in enumerate(nums):
            cnt[x] = cnt.get(x, 0) + 1
            while cnt[x] > k:
                cnt[nums[left]] -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans