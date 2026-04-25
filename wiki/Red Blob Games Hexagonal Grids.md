---
type: source
created: 2026-04-26
updated: 2026-04-26
tags:
  - source
  - hexagonal-grids
  - game-development
source_count: 1
---

# Red Blob Games Hexagonal Grids

[[Red Blob Games Hexagonal Grids]] 是 [[Amit J. Patel]] 在 Red Blob Games 发布的六边形网格（Hexagonal Grids）指南，原文发布于 2013-03-11，覆盖六边形几何、坐标系统、坐标转换、邻居、距离、线段绘制、移动范围、旋转、反射、环、视野、像素映射、地图存储和寻路。

这篇文章的核心价值是把六边形网格从“画格子”整理成一套可实现的数学模型。作者推荐用 [[Cube Coordinates for Hex Grids]] 或 [[Axial Coordinates for Hex Grids]] 表达算法，用 axial 或 doubled 存储坐标，并在需要矩形数组存储时考虑 [[Offset Coordinates for Hex Grids]] 或 [[Doubled Coordinates for Hex Grids]]。

## 关键知识

- [[Hexagonal Grid Geometry]]：平顶（flat-top）和尖顶（pointy-top）六边形只差一个旋转；外接圆半径 `size` 决定宽高、间距和角点计算。
- [[Hex Coordinate Systems]]：offset、cube、axial、doubled 是四类常用表示，算法便利性主要来自坐标能否支持加减和缩放。
- [[Hex Grid Distance]]：cube 距离来自三维曼哈顿距离的一半，也可写成三个坐标差绝对值的最大值。
- [[Hex Grid Line Drawing]]：线段绘制通过线性插值（linear interpolation）采样 `N+1` 个点，再用 `cube_round` 落回最近的整数六边形。
- [[Hex Grid Map Storage]]：axial 坐标可用二维数组、哈希表或按行压缩的数组数组存储，矩形、六边形、菱形和三角形地图各有索引映射。
- [[Hex Grid Pathfinding]]：A*、Dijkstra、Floyd-Warshall 等图搜索可复用在六边形网格上，关键是提供邻居函数和距离启发式。

## 实现取舍

作者的实践建议是：矩形地图可以使用与地图朝向匹配的 offset 或 doubled 坐标；其他形状的地图优先使用 axial/cube。Axial 和 cube 本质上是同一套坐标系统，axial 存储 `q,r`，算法需要时通过 `s = -q-r` 恢复第三轴。

## 来源

- Source: `articles/Red Blob Games Hexagonal Grids.md`
- URL: https://www.redblobgames.com/grids/hexagons/
- Author: [[Amit J. Patel]]
