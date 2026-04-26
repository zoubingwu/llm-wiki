---
type: concept
created: 2026-04-26
updated: 2026-04-26
tags:
  - hexagonal-grids
  - rendering
source_count: 1
---

# Hex Grid Layout

六边形网格布局（Hex Grid Layout）负责把 [[Cube Coordinates for Hex Grids]] 或 [[Axial Coordinates for Hex Grids]] 转成屏幕坐标，并把鼠标点击等屏幕坐标转回六边形坐标。

[[Implementation of Hex Grids]] 使用两个对象表达布局：

- `Orientation` 保存 2x2 正向矩阵、2x2 逆矩阵和角点起始角。
- `Layout` 保存 orientation、`size` 和 `origin`。

## Hex to screen

hex 到屏幕坐标的流程是矩阵变换、缩放、平移。`size` 支持统一缩放，也支持 x/y 分别缩放以匹配像素素材。`origin` 表示 `q=0,r=0` hex 的屏幕中心位置。

## Screen to hex

屏幕坐标到 hex 的流程按反向顺序执行：先减 origin，再除以 size，最后乘以逆矩阵。结果通常是 [[Fractional Hex Coordinates]]，需要通过 rounding 回到整数 hex。

## Drawing

绘制六边形时，先用 `hex_to_pixel` 得到中心，再用 orientation 的 `start_angle` 计算六个角点。平顶布局从 0 度开始，尖顶布局从 30 度开始。

## 来源

- [[Implementation of Hex Grids]]
