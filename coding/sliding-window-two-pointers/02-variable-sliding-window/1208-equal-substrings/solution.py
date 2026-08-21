class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        n = len(s)
        ans = left = cost = 0
        for right in range(n):
            cost += abs(ord(s[right]) - ord(t[right]))
            while cost > maxCost:
                cost -= abs(ord(s[left]) - ord(t[left]))
                left += 1
            ans = max(ans, right - left + 1)
        return ans