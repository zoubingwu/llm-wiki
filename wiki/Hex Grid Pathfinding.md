---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - pathfinding
  - algorithms
source_count: 2
---

# Hex Grid Pathfinding

六边形网格寻路（Hex Grid Pathfinding）把六边形地图视为图：每个格子是节点，相邻格子是边。A*、Dijkstra 和 Floyd-Warshall 等图搜索算法可以直接用于六边形网格。

## 两个接口

邻居函数（neighbors）返回当前格子的六个相邻格子，并过滤不可通行格子。这个函数可基于 [[Cube Coordinates for Hex Grids]]、[[Axial Coordinates for Hex Grids]]、[[Offset Coordinates for Hex Grids]] 或 [[Doubled Coordinates for Hex Grids]] 实现。

启发式函数（heuristic）通常使用 [[Hex Grid Distance]]，并按移动成本缩放。例如单步成本为 5 时，启发式可写成 `hex_distance(a, b) * 5`。

## 移动范围与视野

无障碍移动范围可由 cube/axial 坐标不等式生成。带障碍的移动范围适合用限制深度的广度优先搜索（breadth-first search）。视野可先从起点对范围内每个格子做 [[Hex Grid Line Drawing]]，再判断线段是否穿过墙。

[[Implementation of Hex Grids]] 将寻路视为 graph algorithms 的应用：只要 `Hex`、neighbors 和 map nodes 已实现，移动范围、distance map 与 pathfinding 都可以复用图算法。

## 来源

- [[Red Blob Games Hexagonal Grids]]
- [[Implementation of Hex Grids]]
