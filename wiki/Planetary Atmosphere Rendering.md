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

# Planetary Atmosphere Rendering

行星大气渲染（Planetary Atmosphere Rendering）是在球形行星周围渲染大气壳，让观察者能从地面、空中和轨道视角看到一致的天空、地平线和大气边缘。

## 从天穹到大气壳

[[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 先实现平面天穹 shader，再把它扩展成深度感知的后期处理效果。行星尺度需要进一步把大气表示为包围行星网格的球壳，并让 raymarching 只发生在射线穿过大气球壳的片段内。

## 核心技术

- 对数深度缓冲（logarithmic depth buffer）：提高大尺度场景中深度值的有效精度，缓解远距离观察时的深度冲突
- 射线-球体相交（ray-sphere intersection）：找到视线射线进入和离开大气球壳的位置
- 行星表面截断：当射线先撞到地面，就把地面交点作为大气采样终点
- 场景几何截断：当其他物体位于地面之前，就用 depth buffer 里的场景深度截断大气片段

## 与后期处理的关系

行星大气效果通常作为 post-processing pass 应用。shader 读取 depth buffer，重建世界坐标，判断当前像素对应射线穿过多少大气，再把 [[Atmospheric Scattering|大气散射]] 结果混入原始场景颜色。

## 相关概念

- [[Atmospheric Scattering]]
- [[Raymarching]]
- [[Optical Depth and Transmittance]]
- [[LUT-based Atmospheric Scattering]]
