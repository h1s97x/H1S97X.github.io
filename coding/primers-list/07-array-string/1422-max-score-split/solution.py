class Solution:
    def maxScore(self, s: str) -> int:
        total_ones = s.count('1')
        zeros = 0
        ones = total_ones
        max_score = 0
        for i in range(len(s) - 1):
            if s[i] == '0':
                zeros += 1
            else:
                ones -= 1
            max_score = max(max_score, zeros + ones)
        return max_score