class Solution:
    def subStrHash(self, s: str, power: int, modulo: int, k: int, hashValue: int) -> str:
        n = len(s)
        val = lambda i: ord(s[i]) - 96  # 'a' -> 1

        # Compute hash of the rightmost window s[n-k:n]
        curr = 0
        for i in range(n - 1, n - k - 1, -1):
            curr = (curr * power + val(i)) % modulo

        ans = n - k
        if curr == hashValue:
            ans = n - k

        msb = pow(power, k - 1, modulo)

        # Slide from right to left
        for i in range(n - 1, k - 1, -1):
            curr = ((curr - val(i) * msb) * power + val(i - k)) % modulo
            if curr == hashValue:
                ans = i - k

        return s[ans:ans + k]
