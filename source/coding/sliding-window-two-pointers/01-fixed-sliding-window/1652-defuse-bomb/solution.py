class Solution:
    def decrypt(self, code: list[int], k: int) -> list[int]:
        n = len(code)
        if k == 0:
            return [0] * n

        m = abs(k)
        start = 1 if k > 0 else n - m
        cur = sum(code[start:start + m])
        ans = [0] * n
        ans[0] = cur

        for i in range(1, n):
            cur -= code[(start + i - 1) % n]
            cur += code[(start + i + m - 1) % n]
            ans[i] = cur

        return ans