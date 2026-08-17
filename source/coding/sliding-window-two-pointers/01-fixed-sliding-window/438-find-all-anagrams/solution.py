class Solution:
    def findAnagrams(self, s: str, p: str) -> list[int]:
        n, m = len(p), len(s)
        if n > m:
            return []

        cnt = [0] * 26
        for c in p:
            cnt[ord(c) - 97] -= 1

        non_zero = sum(1 for v in cnt if v != 0)
        ans = []

        for i, c in enumerate(s):
            idx = ord(c) - 97
            old = cnt[idx]
            cnt[idx] += 1
            if old == 0:
                non_zero += 1
            elif cnt[idx] == 0:
                non_zero -= 1

            if i >= n:
                idx2 = ord(s[i - n]) - 97
                old2 = cnt[idx2]
                cnt[idx2] -= 1
                if old2 == 0:
                    non_zero += 1
                elif cnt[idx2] == 0:
                    non_zero -= 1

            if i >= n - 1 and non_zero == 0:
                ans.append(i - n + 1)

        return ans