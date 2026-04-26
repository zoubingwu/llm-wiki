---
type: source
created: 2026-04-26
updated: 2026-04-26
tags:
  - source
  - hexagonal-grids
  - implementation
source_count: 1
---

# Implementation of Hex Grids

[[Implementation of Hex Grids]] 是 [[Red Blob Games]] 发布的六边形网格（Hexagonal Grids）实现指南，原文发布于 2015-05-06，是 [[Red Blob Games Hexagonal Grids]] 的配套文章。

这篇文章把六边形网格数学转成可移植的库设计。核心对象包括 `Hex`、`OffsetCoord`、`Layout`、`Orientation`、`Point` 和 `FractionalHex`，覆盖坐标存储、相等性、向量运算、距离、邻居、屏幕坐标转换、绘制角点、取整、线段绘制、地图形状、地图存储、旋转和 offset 转换。

## 关键知识

- [[Hex Grid Implementation]]：把理论公式组织为小型值对象和纯函数，便于翻译到 C++、Python、C#、JavaScript、TypeScript、Lua、Rust 等语言。
- [[Hex Grid Layout]]：用 `Orientation` 保存正向矩阵、逆矩阵和起始角，用 `Layout` 组合 orientation、size 与 origin。
- [[Fractional Hex Coordinates]]：为像素转六边形和线性插值保留浮点坐标，再通过 `hex_round` 回到整数格子。
- [[Hex Map Shapes]]：用生成循环创建 parallelogram、triangle、hexagon、rectangle 等地图形状。
- [[Hex Grid Map Storage]]：hash table 适合通用地图，紧凑数组适合形状规则且存储规模重要的地图。
- [[Offset Coordinate Conversion]]：用 even/odd offset 参数统一 odd-r、even-r、odd-q、even-q 的转换公式。

## 与主指南的关系

[[Red Blob Games Hexagonal Grids]] 解释几何和算法，[[Implementation of Hex Grids]] 给出库结构和代码 recipe。作者强调示例代码是可改造的 recipe，而非直接面向生产的完整库。

## 来源

- Source: `articles/Implementation of Hex Grids.md`
- URL: https://www.redblobgames.com/grids/hexagons/implementation.html
- Author: [[Red Blob Games]]
