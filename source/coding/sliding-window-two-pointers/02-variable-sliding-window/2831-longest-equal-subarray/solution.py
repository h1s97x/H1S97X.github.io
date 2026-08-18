from typing import List
from collections import defaultdict


class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        cnt = defaultdict(int)
        ans = left = max_freq = 0
        for right, x in enumerate(nums):
            cnt[x] += 1
            max_freq = max(max_freq, cnt[x])
            while right - left + 1 - max_freq > k:
                cnt[nums[left]] -= 1
                left += 1
            ans = max(ans, max_freq)
        return ans