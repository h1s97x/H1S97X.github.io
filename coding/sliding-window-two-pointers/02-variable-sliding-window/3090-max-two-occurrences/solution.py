class Solution:
    def maximumLengthSubstring(self, s: str) -> int:
        ans = left = 0
        cnt = {}
        for right, ch in enumerate(s):
            cnt[ch] = cnt.get(ch, 0) + 1
            while cnt[ch] > 2:
                cnt[s[left]] -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans