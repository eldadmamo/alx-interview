#!/usr/bin/python3
"""MATRIX ROTATION"""


def rotate_2d_matrix(matrix):
    """2D Matrix"""
    rotated = [[row[i] for row in matrix][::-1] for i in range(len(matrix[0]))]
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            matrix[i][j] = rotated[i][j]
