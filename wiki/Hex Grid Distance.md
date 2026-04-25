---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - algorithms
source_count: 1
---

# Hex Grid Distance

六边形网格距离（Hex Grid Distance）表示两个六边形格子之间的最少移动步数。它最容易从 [[Cube Coordinates for Hex Grids]] 推导。

## Cube 距离

在三维 cube 空间中，相邻六边形对应两个坐标各变化 1，因此三维曼哈顿距离的每 2 步对应六边形网格的 1 步：

```text
distance = (abs(dq) + abs(dr) + abs(ds)) / 2
```

由于 `dq + dr + ds = 0`，同一个距离也可写成：

```text
distance = max(abs(dq), abs(dr), abs(ds))
```

## 其他坐标

[[Axial Coordinates for Hex Grids]] 可通过隐含的 `s = -q-r` 得到同样公式。[[Offset Coordinates for Hex Grids]] 和 [[Doubled Coordinates for Hex Grids]] 可以转换到 axial/cube 后计算，也可以使用直接公式。

## 用途

- [[Hex Grid Line Drawing]] 用距离决定采样点数量。
- 移动范围用距离不等式生成半径内所有格子。
- [[Hex Grid Pathfinding]] 中的 A* 启发式通常使用距离乘以单步移动成本。

## 来源

- [[Red Blob Games Hexagonal Grids]]
