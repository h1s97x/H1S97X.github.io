class Solution:
    def maxSatisfied(self, customers: list[int], grumpy: list[int], minutes: int) -> int:
        base = sum(c for c, g in zip(customers, grumpy) if g == 0)

        extra = 0
        cur = 0
        for i, (c, g) in enumerate(zip(customers, grumpy)):
            cur += c if g == 1 else 0
            if i >= minutes:
                cur -= customers[i - minutes] if grumpy[i - minutes] == 1 else 0
            if i >= minutes - 1:
                extra = max(extra, cur)

        return base + extra