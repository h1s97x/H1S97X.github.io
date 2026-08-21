class Solution:
    def queryString(self, s: str, n: int) -> bool:
        m = len(s)
        # Maximum distinct values we can get from substrings ≤ 30 length
        max_possible = m * 30
        if n > max_possible:
            return False

        seen = set()
        for i in range(m):
            val = 0
            for j in range(i, min(i + 30, m)):
                val = (val << 1) | (ord(s[j]) - 48)
                if val > n:
                    break
                if val > 0:
                    seen.add(val)

        for i in range(1, n + 1):
            if i not in seen:
                return False
        return True