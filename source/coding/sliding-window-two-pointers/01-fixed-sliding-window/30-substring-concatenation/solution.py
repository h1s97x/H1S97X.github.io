class Solution:
    def findSubstring(self, s: str, words: list[str]) -> list[int]:
        word_len = len(words[0])
        word_count = len(words)
        total_len = word_len * word_count
        n = len(s)
        if n < total_len:
            return []

        from collections import Counter
        target = Counter(words)
        ans = []

        for offset in range(word_len):
            left = offset
            cur = {}
            valid = 0

            for right in range(offset, n - word_len + 1, word_len):
                w = s[right:right + word_len]

                if w not in target:
                    cur.clear()
                    valid = 0
                    left = right + word_len
                    continue

                cur[w] = cur.get(w, 0) + 1
                if cur[w] == target[w]:
                    valid += 1

                while right - left + word_len > total_len:
                    w_left = s[left:left + word_len]
                    if cur[w_left] == target[w_left]:
                        valid -= 1
                    cur[w_left] -= 1
                    left += word_len

                if valid == len(target):
                    ans.append(left)

        return ans