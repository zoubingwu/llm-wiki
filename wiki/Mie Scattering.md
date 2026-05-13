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

# Mie Scattering

米氏散射（Mie Scattering）描述光与大气中较大颗粒相互作用时发生的散射，例如尘埃、烟尘和气溶胶。

## 对天空渲染的影响

在 [[Atmospheric Scattering|大气散射]] shader 中，米氏散射主要负责太阳附近的明亮雾状光晕，以及太阳靠近地平线时的柔和混合。相比 [[Rayleigh Scattering]]，它更强调接近太阳方向的前向散射，因此会让日出、日落和地平线光照更自然。

## 在 shader 中的建模

[[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 使用 Mie density function 和 Mie phase function 来建模：

- density function 描述大颗粒物质随高度变化的密度
- phase function 用 `mieG` 等参数控制散射方向分布
- `mieBeta`、`mieBetaExt` 等参数分别影响散射和消光

米氏散射与 [[Ozone Absorption]]、瑞利散射一起进入透射率和最终散射颜色计算。

## 相关概念

- [[Atmospheric Scattering]]
- [[Rayleigh Scattering]]
- [[Ozone Absorption]]
- [[Optical Depth and Transmittance]]
