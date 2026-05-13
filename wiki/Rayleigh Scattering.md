---
type: concept
created: 2026-05-13
updated: 2026-05-13
tags:
  - graphics
  - atmosphere
  - optics
source_count: 1
---

# Rayleigh Scattering

瑞利散射（Rayleigh Scattering）描述光与远小于光波长的粒子相互作用时发生的散射。在天空渲染语境中，它主要对应空气分子对太阳光的散射。

## 对天空颜色的影响

短波长光比长波长光更容易发生瑞利散射，因此蓝光更容易被重新定向到观察者方向。白天天空呈蓝色，地平线附近因路径更长而出现更浅的雾霭，都可以从这个机制得到直觉解释。

## 在 shader 中的建模

[[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 使用两个函数组织瑞利散射：

- Rayleigh density function：随高度指数衰减，用来表示空气密度随海拔升高而变薄
- Rayleigh phase function：根据太阳方向和视线方向的夹角，描述散射光如何分配到观察方向

Rayleigh 光学深度会进入 [[Optical Depth and Transmittance|透射率]] 计算，也会作为散射贡献累积到最终颜色。

## 相关概念

- [[Atmospheric Scattering]]
- [[Mie Scattering]]
- [[Ozone Absorption]]
- [[Raymarching]]
