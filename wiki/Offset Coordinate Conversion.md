---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - coordinate-systems
source_count: 1
---

# Offset Coordinate Conversion

Offset 坐标转换（Offset Coordinate Conversion）是在 [[Offset Coordinates for Hex Grids]] 与 [[Cube Coordinates for Hex Grids]] / [[Axial Coordinates for Hex Grids]] 之间互转的实现模式。

[[Implementation of Hex Grids]] 使用 `OffsetCoord(col,row)` 表示 offset 坐标，并把 odd/even 差异编码为 `ODD = -1` 与 `EVEN = +1`。`qoffset_*` 处理 flat-top 的 odd-q / even-q，`roffset_*` 处理 pointy-top 的 odd-r / even-r。

## 奇偶判断

转换公式需要判断行或列的奇偶。文章推荐 `a & 1`，因为它在常见二进制补码系统中对负数也返回稳定的 0 或 1。若语言提供 floored 或 euclidean modulo，也可以使用对应的 modulo 函数。

## 用途

实际库可以在内部使用 `Hex`，只在玩家可见坐标、矩形地图输入输出或 UI 显示时使用 offset 坐标。

## 来源

- [[Implementation of Hex Grids]]
