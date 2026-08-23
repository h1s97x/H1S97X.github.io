from typing import List


class Solution:
    def largeGroupPositions(self, s: str) -> List[List[int]]:
        res = []
        n = len(s)
        i = 0
        while i < n:
            j = i
            while j + 1 < n and s[j + 1] == s[i]:
                j += 1
            if j - i + 1 >= 3:
                res.append([i, j])
            i = j + 1
        return res
