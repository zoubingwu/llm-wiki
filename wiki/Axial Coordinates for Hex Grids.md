---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - coordinate-systems
source_count: 1
---

# Axial Coordinates for Hex Grids

六边形 axial 坐标（Axial Coordinates for Hex Grids）是 [[Cube Coordinates for Hex Grids]] 的二轴存储形式。它只保存 `q,r`，需要第三轴时用 `s = -q-r` 计算。

## 为什么常用

Axial 坐标保留了 cube 坐标的大部分算法优点：可以相加、相减、缩放，邻居方向固定，距离公式可由 cube 距离内联得到。它的存储量少于 cube 坐标，是 Red Blob Games 推荐的常用存储形式之一。

## 距离公式

Axial 距离可以先转成 cube 再计算，也可以内联为：

```text
(abs(a.q - b.q)
 + abs(a.q + a.r - b.q - b.r)
 + abs(a.r - b.r)) / 2
```

这个公式来自 cube 坐标上的曼哈顿距离。

## 与地图存储

Axial 坐标在菱形地图上可直接映射到数组。矩形、六边形和三角形地图可用 [[Hex Grid Map Storage]] 中的偏移索引或哈希表存储。

## 来源

- [[Red Blob Games Hexagonal Grids]]
