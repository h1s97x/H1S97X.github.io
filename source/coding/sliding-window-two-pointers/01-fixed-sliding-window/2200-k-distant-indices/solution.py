class Solution:
    def findKDistantIndices(self, nums: list[int], key: int, k: int) -> list[int]:
        n = len(nums)
        ans = []
        r = 0
        for j, x in enumerate(nums):
            if x == key:
                l = max(r, j - k)
                r = min(n - 1, j + k) + 1
                for i in range(l, r):
                    ans.append(i)
        return ans