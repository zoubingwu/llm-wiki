---
type: concept
created: 2026-05-13
updated: 2026-05-13
tags:
  - graphics
  - shaders
  - atmosphere
source_count: 1
---

# Atmospheric Scattering

大气散射（Atmospheric Scattering）是光线穿过大气时被分子、尘埃、气溶胶和臭氧等介质散射或吸收后形成天空颜色、日出日落色彩和地平线雾霭的现象。

在 [[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 中，它被当作一个实时图形渲染问题：shader 需要沿视线在大气体积中采样密度，估算太阳光和视线方向上的衰减，再把散射进相机方向的光累积成最终像素颜色。

## 组成部分

- [[Rayleigh Scattering]]：描述空气分子等小颗粒对短波长光的强散射，是白天天空偏蓝的主要原因
- [[Mie Scattering]]：描述尘埃、气溶胶等较大颗粒对光的散射，负责太阳附近的雾状光晕和地平线混合
- [[Ozone Absorption]]：描述臭氧吸收部分波长，让地平线、日落和暮光的颜色发生偏移和加深
- [[Optical Depth and Transmittance]]：描述光沿路径穿过多少介质，以及剩余多少光能抵达采样点或相机

## 实时渲染模型

最直接的实现是用 [[Raymarching]] 沿视线射线在大气中取样。每个采样点会计算本地密度、相位函数、视线透射率和太阳方向透射率，最后把散射贡献累积到像素颜色。

这个模型可以先渲染平面天穹，再通过深度缓冲和世界坐标重建变成深度感知的后期处理效果，最终扩展到 [[Planetary Atmosphere Rendering|行星大气渲染]]。

## 性能问题

朴素实现通常包含两层循环：

- 主 raymarching 循环沿相机视线采样
- 内层 lightmarching 循环沿太阳方向估算阳光透射率

[[LUT-based Atmospheric Scattering]] 通过预计算 Transmittance LUT、Sky View LUT 和 Aerial Perspective LUT，把重复计算转换为纹理查找。

## 相关概念

- [[Raymarching]]
- [[Rayleigh Scattering]]
- [[Mie Scattering]]
- [[Ozone Absorption]]
- [[Optical Depth and Transmittance]]
- [[Planetary Atmosphere Rendering]]
- [[LUT-based Atmospheric Scattering]]
