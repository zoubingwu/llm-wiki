---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - coordinate-systems
source_count: 1
---

# Doubled Coordinates for Hex Grids

六边形 doubled 坐标（Doubled Coordinates for Hex Grids）通过把行或列的步长加倍来表达六边形错位关系。合法坐标满足 `(col + row) mod 2 == 0`。

## 两种布局

Double-width 用在尖顶（pointy-top）水平布局中，列值每个格子增加 2。Double-height 用在平顶（flat-top）垂直布局中，行值每个格子增加 2。

相比 [[Offset Coordinates for Hex Grids]]，doubled 坐标的邻居差值在全图一致，可以安全地相加和相减。相比 [[Axial Coordinates for Hex Grids]]，它更贴近某些屏幕布局和存储直觉。

## 转换

Double-height 到 axial：

```text
q = col
r = (row - col) / 2
```

Double-width 到 axial：

```text
q = (col - row) / 2
r = row
```

## 来源

- [[Red Blob Games Hexagonal Grids]]
