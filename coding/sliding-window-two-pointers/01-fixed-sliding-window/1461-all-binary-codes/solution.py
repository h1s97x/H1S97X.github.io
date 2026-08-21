class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        need = 1 << k
        seen = [False] * need
        mask = need - 1
        val = 0
        for i, ch in enumerate(s):
            val = ((val << 1) | (ord(ch) - 48)) & mask
            if i >= k - 1:
                seen[val] = True
        return all(seen)