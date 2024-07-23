#!/usr/bin/python3
"""
Pascal's Triangle
"""


def pascal_triangle(n):
    """A func that creates a function def pascal_triangle(n)
    of integers representing the Pascal’s triangle of n
    """
    respons = []
    if n > 0:
        for i in range(1, n + 1):
            level = []
            C = 1
            for k in range(1, i + 1):
                level.append(C)
                C = C * (i - k) // k
            respons.append(level)
    return respons
