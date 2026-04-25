---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - algorithms
source_count: 1
---

# Hex Grid Line Drawing

六边形网格线段绘制（Hex Grid Line Drawing）用于找出一条直线穿过哪些六边形格子，常见于视线、射线、技能范围和地图可视化。

## 算法

Red Blob Games 的做法是在线段两端之间做线性插值（linear interpolation）。先用 [[Hex Grid Distance]] 得到端点间距离 `N`，再取 `N+1` 个均匀采样点：

```text
A + (B - A) * (i / N)
```

采样点是浮点 cube 坐标，最后通过 `cube_round` 落到最近的整数 [[Cube Coordinates for Hex Grids]]。

## Rounding

`cube_round` 先分别四舍五入 `q,r,s`，再修正变化最大的分量，使结果重新满足 `q + r + s = 0`。这个步骤保证浮点坐标回到合法六边形格子。

当线段恰好落在格子边界上时，可对端点加一个很小的 epsilon，让边界选择保持一致。

## 来源

- [[Red Blob Games Hexagonal Grids]]
