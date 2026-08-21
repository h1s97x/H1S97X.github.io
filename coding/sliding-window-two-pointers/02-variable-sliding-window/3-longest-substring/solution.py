class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        ans = left = 0
        idx = {}
        for right, ch in enumerate(s):
            if ch in idx and idx[ch] >= left:
                left = idx[ch] + 1
            idx[ch] = right
            ans = max(ans, right - left + 1)
        return ans