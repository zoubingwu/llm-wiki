---
type: concept
created: 2026-05-13
updated: 2026-05-13
tags:
  - graphics
  - shaders
  - rendering
source_count: 1
---

# Raymarching

Raymarching 是一种沿射线分步采样空间的渲染方法。它常用于体积云、体积光、雾和 [[Atmospheric Scattering|大气散射]] 等透明或半透明介质，因为这些效果需要累积一段路径上的密度、吸收和散射。

## 在大气渲染中的角色

在 [[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 中，raymarching 从相机位置发出视线射线，沿大气体积逐步取样。每个采样点会计算：

- 当前高度的大气密度
- [[Rayleigh Scattering]]、[[Mie Scattering]] 和 [[Ozone Absorption]] 的局部贡献
- 视线方向上的 [[Optical Depth and Transmittance|光学深度和透射率]]
- 太阳方向上的 lightmarching 透射率

采样步数越多，结果越平滑，计算成本也越高。

## 与光线追踪的区别

光线追踪（Ray Tracing）通常关注射线与表面的交点、反射和折射路径。Raymarching 关注沿射线路径的离散采样，更适合连续体积介质。大气、云和雾都需要这种“沿路累积”的计算方式。

## 深度感知后处理

当 raymarching 用于场景后期处理时，shader 会从 depth buffer 重建当前像素的世界坐标，再用相机位置和该世界坐标得到 3D 视线射线。这样大气雾化可以在相机和真实场景几何体之间终止，而不是覆盖整个画面。

## 相关概念

- [[Atmospheric Scattering]]
- [[Optical Depth and Transmittance]]
- [[Planetary Atmosphere Rendering]]
- [[LUT-based Atmospheric Scattering]]
