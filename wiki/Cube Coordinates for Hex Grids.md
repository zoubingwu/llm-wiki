---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - coordinate-systems
source_count: 2
---

# Cube Coordinates for Hex Grids

六边形 cube 坐标（Cube Coordinates for Hex Grids）把六边形网格看作三维立方体网格中 `q + r + s = 0` 的斜切平面。每个六边形由三元组 `q,r,s` 表示，并始终满足三轴和为 0 的约束。

## 核心性质

Cube 坐标支持向量操作：坐标可以相加、相减、缩放和插值。这个性质让邻居、距离、线段绘制、旋转、反射、环和范围都能用短公式表达。

[[Implementation of Hex Grids]] 将 cube/axial 合并为一个 `Hex` 类型，并通过构造函数或 invariant 检查保证 `q + r + s = 0`。这种实现让 [[Hex Grid Implementation]] 可以直接复用三维向量式运算。

六个相邻方向可以表示成三轴中一个加 1、另一个减 1、第三个保持 0 的六种组合。距离可写成：

```text
(abs(dq) + abs(dr) + abs(ds)) / 2
```

也可写成：

```text
max(abs(dq), abs(dr), abs(ds))
```

## 典型用途

- [[Hex Grid Distance]]：直接用 cube 坐标差计算最短步数。
- [[Hex Grid Line Drawing]]：在线段端点间做浮点插值，再用 `cube_round` 转回格子。
- 旋转和反射：围绕中心先转成向量，再变换 `q,r,s`，最后加回中心。
- 环和螺旋：从中心沿一个方向走到半径处，再沿六个方向绕行。

## 来源

- [[Red Blob Games Hexagonal Grids]]
- [[Implementation of Hex Grids]]
