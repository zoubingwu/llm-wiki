---
type: concept
created: 2026-05-13
updated: 2026-05-13
tags:
  - graphics
  - shaders
  - optimization
source_count: 1
---

# LUT-based Atmospheric Scattering

基于 LUT 的大气散射（LUT-based Atmospheric Scattering）把昂贵的大气散射计算预先写入查找表（Look Up Table, LUT），最终渲染时通过纹理采样组合结果。

## 解决的问题

朴素 [[Atmospheric Scattering|大气散射]] shader 通常有两层循环：外层沿视线 raymarching，内层沿太阳方向 lightmarching。全屏分辨率下重复执行这些计算成本很高。

LUT 方案把稳定或可复用的计算拆出来：

- 预计算太阳光穿过大气后的透射率
- 预计算天空不同方向的颜色
- 预计算相机到场景几何体之间的大气雾化

## 三类 LUT

[[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 参考 [[Sebastian Hillaire]] 的思路，使用三类 LUT：

- Transmittance LUT：按高度和光照方向存储太阳光透射率
- Sky View LUT：按观察位置和天穹方向存储远场天空颜色
- Aerial Perspective LUT：按屏幕像素存储近场雾霭、散射光和视线透射率

## 合成方式

最终 post-processing pass 会根据 depth buffer 判断当前像素类型：

- 背景像素采样 Sky View LUT，得到天空颜色
- 场景几何像素采样 Aerial Perspective LUT，用 alpha 表示的视线透射率衰减原始颜色，再加上 RGB 中的散射光

这样可以用纹理查找替代重复的太阳方向 raymarching，显著降低实时渲染成本。

## 相关概念

- [[Atmospheric Scattering]]
- [[Optical Depth and Transmittance]]
- [[Raymarching]]
- [[Planetary Atmosphere Rendering]]
- [[Sebastian Hillaire]]
