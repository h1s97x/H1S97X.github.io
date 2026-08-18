class Solution:
    def getSubarrayBeauty(self, nums: list[int], k: int, x: int) -> list[int]:
        OFFSET = 50
        cnt = [0] * 101
        for i in range(k):
            cnt[nums[i] + OFFSET] += 1

        def get_xth() -> int:
            acc = 0
            for v in range(-50, 51):
                acc += cnt[v + OFFSET]
                if acc >= x:
                    return v if v < 0 else 0
            return 0

        n = len(nums)
        ans = [0] * (n - k + 1)
        ans[0] = get_xth()
        for i in range(k, n):
            cnt[nums[i - k] + OFFSET] -= 1
            cnt[nums[i] + OFFSET] += 1
            ans[i - k + 1] = get_xth()
        return ans