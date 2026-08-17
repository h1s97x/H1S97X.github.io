class Solution:
    def maxFreq(self, s: str, maxLetters: int, minSize: int, maxSize: int) -> int:
        cnt = [0] * 26
        distinct = 0
        freq = {}

        for i, c in enumerate(s):
            idx = ord(c) - 97
            if cnt[idx] == 0:
                distinct += 1
            cnt[idx] += 1

            if i >= minSize:
                idx2 = ord(s[i - minSize]) - 97
                cnt[idx2] -= 1
                if cnt[idx2] == 0:
                    distinct -= 1

            if i >= minSize - 1 and distinct <= maxLetters:
                sub = s[i - minSize + 1:i + 1]
                freq[sub] = freq.get(sub, 0) + 1

        return max(freq.values()) if freq else 0