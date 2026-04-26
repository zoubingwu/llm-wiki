---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - map-generation
source_count: 1
---

# Hex Map Shapes

六边形地图形状（Hex Map Shapes）是用坐标循环生成一组 hex 节点的方式。[[Implementation of Hex Grids]] 把地图问题拆成两个部分：生成 shape，存储 map data。

## 常见形状

Parallelogram 可直接循环任意两条 cube/axial 轴生成。Triangle 通过约束 `q + r` 的范围生成。Hexagon 使用半径 `N`，对每个 `q` 计算合法的 `r` 区间。Rectangle 适合先按 [[Offset Coordinates for Hex Grids]] 的行列循环，再转成 axial/cube。

## 与存储的关系

shape 生成循环决定 [[Hex Grid Map Storage]] 的索引方式。Hash table 可直接存储任意 shape 的节点；紧凑数组需要从生成循环推导每一行的起点、长度和访问公式。

## 来源

- [[Implementation of Hex Grids]]
