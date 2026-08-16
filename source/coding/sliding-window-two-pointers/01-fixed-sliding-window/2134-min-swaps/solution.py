class Solution:
    def minSwaps(self, nums: list[int]) -> int:
        k = sum(nums)
        if k <= 1:
            return 0

        n = len(nums)
        cur = sum(nums[:k])
        max_ones = cur
        for i in range(k, n + k - 1):
            cur += nums[i % n] - nums[(i - k) % n]
            if cur > max_ones:
                max_ones = cur

        return k - max_ones