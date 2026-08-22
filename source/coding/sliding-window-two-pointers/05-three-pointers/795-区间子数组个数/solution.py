from typing import List


class Solution:
    def numSubarrayBoundedMax(self, nums: List[int], left: int, right: int) -> int:
        ans = 0
        last_gt = -1   # 最近一个 > right 的元素下标
        last_ge = -1   # 最近一个 >= left 的元素下标
        for i, x in enumerate(nums):
            if x > right:
                last_gt = i
            if x >= left:
                last_ge = i
            ans += max(0, last_ge - last_gt)
        return ans
