class Solution:
    def getAverages(self, nums: list[int], k: int) -> list[int]:
        n = len(nums)
        ans = [-1] * n
        if k == 0:
            return nums
        if n < 2 * k + 1:
            return ans
        window = 2 * k + 1
        cur = sum(nums[:window])
        ans[k] = cur // window
        for i in range(k + 1, n - k):
            cur += nums[i + k] - nums[i - k - 1]
            ans[i] = cur // window
        return ans