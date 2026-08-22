from typing import List


class Solution:
    def countSubarrays(self, nums: List[int], minK: int, maxK: int) -> int:
        ans = 0
        bad = -1  # 最近一个越界（<minK 或 >maxK）的下标
        mn = -1   # 最近一个等于 minK 的下标
        mx = -1   # 最近一个等于 maxK 的下标
        for i, x in enumerate(nums):
            if x < minK or x > maxK:
                bad = i
            if x == minK:
                mn = i
            if x == maxK:
                mx = i
            ans += max(0, min(mn, mx) - bad)
        return ans
