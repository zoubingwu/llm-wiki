---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - coordinate-systems
source_count: 1
---

# Hex Coordinate Systems

六边形坐标系统（Hex Coordinate Systems）是在六边形网格上标识、移动、测距和存储格子的表示方法。常见系统包括 [[Offset Coordinates for Hex Grids]]、[[Cube Coordinates for Hex Grids]]、[[Axial Coordinates for Hex Grids]] 和 [[Doubled Coordinates for Hex Grids]]。

## 选择原则

[[Cube Coordinates for Hex Grids]] 有三条轴 `q,r,s`，约束为 `q + r + s = 0`，对称性最好，适合表达距离、旋转、反射、邻居、环和范围。

[[Axial Coordinates for Hex Grids]] 存储 `q,r`，通过 `s = -q-r` 恢复第三轴，保留 cube 的多数算法优点，同时存储更小。

[[Offset Coordinates for Hex Grids]] 把每隔一行或一列错开，适合矩形数组和传统瓦片地图，但移动差值依赖奇偶行或列。

[[Doubled Coordinates for Hex Grids]] 通过把行或列步长加倍来表达错位关系，保留全局一致的加减操作，约束为 `(col + row) mod 2 == 0`。

## 实现建议

算法层优先使用 axial/cube，存储层根据地图形状和访问模式选择。矩形地图可用 offset 或 doubled；任意形状地图可用 axial/cube 配合哈希表或压缩数组。

## 来源

- [[Red Blob Games Hexagonal Grids]]
