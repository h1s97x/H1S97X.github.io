class Solution:
    def numSub(self, s: str) -> int:
        MOD = 10 ** 9 + 7
        ans = 0
        n = len(s)
        i = 0
        while i < n:
            if s[i] == '0':
                i += 1
                continue
            j = i
            while j + 1 < n and s[j + 1] == '1':
                j += 1
            k = j - i + 1
            ans = (ans + k * (k + 1) // 2) % MOD
            i = j + 1
        return ans
