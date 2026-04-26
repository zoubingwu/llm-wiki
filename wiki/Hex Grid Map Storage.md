---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - data-structures
source_count: 2
---

# Hex Grid Map Storage

六边形地图存储（Hex Grid Map Storage）是把六边形坐标映射到数组、哈希表或压缩行结构中的数据结构问题。

## 三种策略

二维数组（2D Array）可用 `null` 或哨兵值填充地图外空位，适合简单实现。常见形状的浪费空间通常在可接受范围内。

哈希表（hash table）适合任意形状地图、稀疏地图和带洞地图，键可由 `q,r` 或 `q,r,s` 生成。

数组的数组（array of arrays）可按行压缩：每行记录实际起始列和长度，用 `q - first_column(r)` 访问元素。矩形、六边形、菱形、上三角和下三角地图可以分别定义行偏移规则。

## 坐标选择

[[Axial Coordinates for Hex Grids]] 在菱形地图上直接对应二维数组。矩形地图可把 axial 行滑动到左侧，得到类似 odd-r offset 的存储形式。平顶布局可交换行列角色。

存储访问建议封装在 map 的 getter/setter 中，让寻路、渲染和玩法逻辑继续使用清晰的 [[Hex Coordinate Systems]]。

[[Implementation of Hex Grids]] 补充了实现取舍：hash table 适合任意 shape 和带洞地图；显式图结构适合边界、墙和洞长期稳定的 irregular map；紧凑数组适合大地图或存储规模敏感场景。[[Hex Map Shapes]] 的生成循环决定紧凑数组的索引公式。

## 来源

- [[Red Blob Games Hexagonal Grids]]
- [[Implementation of Hex Grids]]
