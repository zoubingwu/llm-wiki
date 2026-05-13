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

# Ozone Absorption

臭氧吸收（Ozone Absorption）描述高层大气中的臭氧吸收部分波长的光。它和 [[Rayleigh Scattering]]、[[Mie Scattering]] 的关键差别在于：臭氧主要移除光，而不是把光重新散射到其他方向。

## 对颜色的影响

在天空渲染中，臭氧吸收会让天空颜色发生偏移并变深，尤其影响地平线、日落和暮光区域。[[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 中加入臭氧项后，天空蓝色更自然，太阳较低时会出现偏紫的色调。

## 在 shader 中的建模

臭氧项通常会进入光学深度和透射率计算。文章中的实现会在 raymarching 循环里累积 `viewODO`，并把 `BETA_OZONE_ABS * viewODO` 加入 `tau`，让指数透射率计算体现臭氧对光线的吸收。

## 相关概念

- [[Atmospheric Scattering]]
- [[Optical Depth and Transmittance]]
- [[Rayleigh Scattering]]
- [[Mie Scattering]]
