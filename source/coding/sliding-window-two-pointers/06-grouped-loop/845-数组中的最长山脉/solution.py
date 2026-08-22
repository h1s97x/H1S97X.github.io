from typing import List


class Solution:
    def longestMountain(self, arr: List[int]) -> int:
        n = len(arr)
        ans = 0
        i = 1
        while i < n - 1:
            if arr[i - 1] < arr[i] > arr[i + 1]:
                left = i - 1
                while left > 0 and arr[left - 1] < arr[left]:
                    left -= 1
                right = i + 1
                while right + 1 < n and arr[right + 1] < arr[right]:
                    right += 1
                ans = max(ans, right - left + 1)
                i = right + 1
            else:
                i += 1
        return ans
