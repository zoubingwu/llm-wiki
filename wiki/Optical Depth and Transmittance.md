---
type: concept
created: 2026-05-13
updated: 2026-05-13
tags:
  - graphics
  - shaders
  - optics
source_count: 1
---

# Optical Depth and Transmittance

光学深度（Optical Depth）表示光沿路径穿过介质时累计遇到多少吸收或散射材料。透射率（Transmittance）表示光沿这段路径传播后剩余的比例。

## 在大气散射中的意义

在 [[Atmospheric Scattering|大气散射]] 中，天空颜色取决于两个问题：

- 有多少太阳光能穿过大气抵达某个采样点
- 有多少散射光能从采样点继续穿过大气抵达相机

光学深度回答路径上介质有多厚，透射率回答光损失了多少。

## 计算方式

[[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 沿 raymarching 路径累积 Rayleigh、Mie 和 Ozone 三类光学深度，再合成为 `tau`。透射率使用指数衰减形式：

```glsl
vec3 transmittance = exp(-tau);
```

其中 `T=1.0` 表示光完整保留，`T=0.0` 表示光完全衰减。

## 视线路径与太阳路径

朴素天空 shader 先沿相机视线累积光学深度。为了得到日出和日落，还需要从每个采样点沿太阳方向做 lightmarching，估算太阳光抵达采样点之前的透射率。

[[LUT-based Atmospheric Scattering]] 把太阳路径上的透射率预计算成 Transmittance LUT，减少重复的内层循环。

## 相关概念

- [[Raymarching]]
- [[Rayleigh Scattering]]
- [[Mie Scattering]]
- [[Ozone Absorption]]
- [[LUT-based Atmospheric Scattering]]
