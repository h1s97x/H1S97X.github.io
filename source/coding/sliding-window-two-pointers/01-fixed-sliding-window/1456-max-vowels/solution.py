class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowels = set("aeiou")
        cur = sum(1 for c in s[:k] if c in vowels)
        ans = cur
        for i in range(k, len(s)):
            cur += (s[i] in vowels) - (s[i - k] in vowels)
            if cur > ans:
                ans = cur
        return ans