---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - geometry
source_count: 1
---

# Hexagonal Grid Geometry

六边形网格几何（Hexagonal Grid Geometry）描述正六边形在屏幕或地图中的尺寸、方向、间距和角点计算。

正六边形（regular hexagon）有六条等长边，外接圆半径常记为 `size`。平顶（flat-top）六边形宽度为 `2 * size`，高度为 `sqrt(3) * size`；尖顶（pointy-top）六边形宽度为 `sqrt(3) * size`，高度为 `2 * size`。

## 方向和间距

平顶布局中，相邻中心的水平距离是 `3/2 * size`，垂直距离是 `sqrt(3) * size`。尖顶布局中，相邻中心的水平距离是 `sqrt(3) * size`，垂直距离是 `3/2 * size`。

角点计算来自六个 60 度楔形。尖顶六边形常用 `60 * i - 30` 度生成第 `i` 个角点；平顶六边形可用 0、60、120、180、240、300 度方向。屏幕坐标系的 y 轴方向会影响角度正方向。

## 与算法的关系

几何层负责把抽象坐标映射成像素。[[Hex Coordinate Systems]] 负责地图中的格子身份，[[Hex Grid Distance]]、[[Hex Grid Line Drawing]] 和 [[Hex Grid Pathfinding]] 依赖坐标系统运行。

## 来源

- [[Red Blob Games Hexagonal Grids]]
