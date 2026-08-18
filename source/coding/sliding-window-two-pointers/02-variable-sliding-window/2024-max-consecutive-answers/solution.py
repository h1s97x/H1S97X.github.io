class Solution:
    def maxConsecutiveAnswers(self, answerKey: str, k: int) -> int:
        ans = left = cntT = cntF = 0
        for right, c in enumerate(answerKey):
            if c == 'T':
                cntT += 1
            else:
                cntF += 1
            while cntT > k and cntF > k:
                if answerKey[left] == 'T':
                    cntT -= 1
                else:
                    cntF -= 1
                left += 1
            ans = max(ans, right - left + 1)
        return ans