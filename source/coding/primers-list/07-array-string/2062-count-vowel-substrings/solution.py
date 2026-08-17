class Solution:
    def vowelStrings(self, words: list[str], left: int, right: int) -> int:
        vowels = set('aeiou')
        count = 0
        for i in range(left, right):
            w = words[i]
            if w[0] in vowels and w[-1] in vowels:
                count += 1
        return count