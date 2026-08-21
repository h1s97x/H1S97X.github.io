class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        ans = left = 0
        cnt = {}
        for right, x in enumerate(fruits):
            cnt[x] = cnt.get(x, 0) + 1
            while len(cnt) > 2:
                left_fruit = fruits[left]
                cnt[left_fruit] -= 1
                if cnt[left_fruit] == 0:
                    del cnt[left_fruit]
                left += 1
            ans = max(ans, right - left + 1)
        return ans