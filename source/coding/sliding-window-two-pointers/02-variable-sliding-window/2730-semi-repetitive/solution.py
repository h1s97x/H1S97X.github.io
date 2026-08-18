class Solution:
    def longestSemiRepetitiveSubstring(self, s: str) -> int:
        ans = left = cnt = 0
        for right in range(len(s)):
            if right > 0 and s[right] == s[right - 1]:
                cnt += 1
            while cnt > 1:
                if s[left] == s[left + 1]:
                    cnt -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans