from collections import Counter


class Solution:
    def numIdenticalPairs(self, nums: list[int]) -> int:
        count = Counter(nums)
        return sum(c * (c - 1) // 2 for c in count.values())