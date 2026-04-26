---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - coordinate-systems
source_count: 2
---

# Offset Coordinates for Hex Grids

六边形 offset 坐标（Offset Coordinates for Hex Grids）通过把每隔一行或一列错开来表示六边形网格。列通常记为 `col` 或 `q`，行通常记为 `row` 或 `r`。

## 四种变体

尖顶（pointy-top）布局通常使用 row offset，包括 odd-r 和 even-r。平顶（flat-top）布局通常使用 column offset，包括 odd-q 和 even-q。

Offset 坐标适合矩形数组存储，因为二维数组的行列结构能直接承载错位布局。它的主要代价是邻居差值依赖当前行或列的奇偶性，因此邻居表需要按 parity 分成两套。

## 与算法的关系

距离、线段、旋转和范围等算法通常先把 offset 转成 [[Axial Coordinates for Hex Grids]] 或 [[Cube Coordinates for Hex Grids]]，运行算法后再转回 offset。这个转换策略能保持代码短且行为清晰。

判断奇偶时，原文建议用 `a & 1`，因为它对负数坐标也稳定。

[[Offset Coordinate Conversion]] 给出统一实现：用 `ODD = -1` 与 `EVEN = +1` 编码四种 offset 变体，并分别用 `qoffset_*` 与 `roffset_*` 处理 flat-top 和 pointy-top 布局。

## 来源

- [[Red Blob Games Hexagonal Grids]]
- [[Implementation of Hex Grids]]
