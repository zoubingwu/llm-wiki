---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - implementation
source_count: 1
---

# Hex Grid Implementation

六边形网格实现（Hex Grid Implementation）是把 [[Hex Coordinate Systems]]、距离、邻居、绘制和地图存储公式组织成可复用代码的过程。

[[Implementation of Hex Grids]] 的设计核心是小型值对象加纯函数：`Hex` 表示 cube/axial 坐标，`OffsetCoord` 表示玩家可见的 offset 坐标，`Layout` 负责 hex 与屏幕坐标互转，`FractionalHex` 承载浮点中间结果，map 结构承载地形、对象和单位等业务数据。

## 实现原则

文章选择 cube storage + cube constructor 作为讲解风格，因为它让算法最直观。实际项目可以选择 axial storage、向量数组、模板参数或已有 geometry vector 类型，只要全项目保持一致。

实现层优先让 `Hex` 支持相等性、加减、缩放、距离和邻居。之后 [[Hex Grid Layout]]、[[Fractional Hex Coordinates]]、[[Hex Map Shapes]]、[[Hex Grid Map Storage]] 和 [[Offset Coordinate Conversion]] 都能建立在同一套坐标对象上。

## 来源

- [[Implementation of Hex Grids]]
