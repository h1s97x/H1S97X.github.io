class Solution:
    def distinctPoints(self, s: str, k: int) -> int:
        DIR = {'U': (0, 1), 'D': (0, -1), 'L': (-1, 0), 'R': (1, 0)}

        total_x = total_y = 0
        for ch in s:
            dx, dy = DIR[ch]
            total_x += dx
            total_y += dy

        win_x = win_y = 0
        points = set()
        n = len(s)

        for i, ch in enumerate(s):
            dx, dy = DIR[ch]
            win_x += dx
            win_y += dy

            if i >= k:
                pdx, pdy = DIR[s[i - k]]
                win_x -= pdx
                win_y -= pdy

            if i >= k - 1:
                points.add((total_x - win_x, total_y - win_y))

        return len(points)