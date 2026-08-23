class Solution:
    def maxPower(self, s: str) -> int:
        n = len(s)
        ans = 1
        i = 0
        while i < n:
            j = i
            while j + 1 < n and s[j + 1] == s[i]:
                j += 1
            ans = max(ans, j - i + 1)
            i = j + 1
        return ans
