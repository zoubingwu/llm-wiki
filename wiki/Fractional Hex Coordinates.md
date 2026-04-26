---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - algorithms
source_count: 1
---

# Fractional Hex Coordinates

浮点六边形坐标（Fractional Hex Coordinates）是在六边形算法中临时保存非整数 `q,r,s` 的表示，用于屏幕坐标反算和线性插值。

[[Implementation of Hex Grids]] 为此定义 `FractionalHex`。当 [[Hex Grid Layout]] 把屏幕坐标转回 hex 时，点击位置通常落在格子内部任意位置，因此得到的是浮点坐标。`hex_round` 将三个分量分别 round，再修正误差最大的分量，使结果重新满足 `q + r + s = 0`。

## 在线段绘制中的作用

[[Hex Grid Line Drawing]] 用 `hex_lerp` 在两个整数 hex 之间插值，每个采样点都是 `FractionalHex`。随后通过 `hex_round` 得到线段经过的整数格子。对于刚好落在边界上的点，可给端点加一个很小的 epsilon，让 rounding 方向稳定。

## 来源

- [[Implementation of Hex Grids]]
- [[Red Blob Games Hexagonal Grids]]
