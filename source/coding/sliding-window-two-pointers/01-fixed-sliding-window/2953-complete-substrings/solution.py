class Solution:
    def countCompleteSubstrings(self, word: str, k: int) -> int:
        n = len(word)
        if n < k:
            return 0

        # Split into segments by adjacency condition
        segments = []
        start = 0
        for i in range(1, n):
            if abs(ord(word[i]) - ord(word[i - 1])) > 2:
                segments.append(word[start:i])
                start = i
        segments.append(word[start:])

        ans = 0
        for seg in segments:
            m = len(seg)
            max_j = min(26, m // k)
            for j in range(1, max_j + 1):
                target = j * k
                cnt = [0] * 26
                valid = 0
                distinct = 0

                for i, ch in enumerate(seg):
                    idx = ord(ch) - 97
                    cnt[idx] += 1
                    if cnt[idx] == 1:
                        distinct += 1
                    if cnt[idx] == k:
                        valid += 1
                    elif cnt[idx] == k + 1:
                        valid -= 1

                    if i >= target:
                        idx2 = ord(seg[i - target]) - 97
                        cnt[idx2] -= 1
                        if cnt[idx2] == 0:
                            distinct -= 1
                        if cnt[idx2] == k:
                            valid += 1
                        elif cnt[idx2] == k - 1:
                            valid -= 1

                    if i >= target - 1 and valid == distinct:
                        ans += 1
        return ans
