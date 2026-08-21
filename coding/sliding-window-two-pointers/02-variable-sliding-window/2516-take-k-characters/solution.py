from collections import Counter


class Solution:
    def takeCharacters(self, s: str, k: int) -> int:
        cnt = Counter(s)
        if any(cnt[c] < k for c in "abc"):
            return -1

        n = len(s)
        need = {c: cnt[c] - k for c in "abc"}
        window = {"a": 0, "b": 0, "c": 0}
        left = max_len = 0

        for right in range(n):
            window[s[right]] += 1
            while window[s[right]] > need[s[right]]:
                window[s[left]] -= 1
                left += 1
            max_len = max(max_len, right - left + 1)

        return n - max_len