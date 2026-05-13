---
type: source
created: 2026-05-13
updated: 2026-05-13
tags:
  - source
  - graphics
  - shaders
  - atmosphere
source_count: 1
---

# On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel

这篇文章用浏览器端 shader 实验解释如何从简单天穹推进到行星尺度的 [[Atmospheric Scattering|大气散射]] 渲染。核心路径是：用 [[Raymarching]] 采样大气密度，用 [[Rayleigh Scattering]]、[[Mie Scattering]] 和 [[Ozone Absorption]] 组合天空颜色，再用深度缓冲、射线-球体相交和 [[LUT-based Atmospheric Scattering]] 优化成可用于场景的后期处理效果。

源文见：[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel](../articles/On%20Rendering%20the%20Sky%2C%20Sunsets%2C%20and%20Planets%20-%20The%20Blog%20of%20Maxime%20Heckel.md)。

## 核心贡献

- 把天空颜色建模为光与大气体积相互作用的结果，而不是静态渐变背景
- 用 [[Optical Depth and Transmittance]] 描述视线方向与太阳方向上的光线衰减
- 解释 [[Rayleigh Scattering]] 如何让短波长蓝光更容易进入观察方向
- 解释 [[Mie Scattering]] 如何产生太阳附近的雾状光晕和日出日落的地平线混合
- 解释 [[Ozone Absorption]] 如何改变并加深天空颜色，尤其影响地平线、日落和暮光
- 把平面天空 shader 改造成深度感知的后期处理效果，用世界坐标重建和 depth buffer 处理场景几何遮挡
- 用 [[Planetary Atmosphere Rendering]] 的大气球壳、行星球体和对数深度缓冲解决地面到轨道视角的尺度问题
- 介绍 [[Sebastian Hillaire]] 的 LUT 思路，把昂贵的 lightmarching 预计算成纹理查找

## 实现链路

### 1. 天空模型

文章从一个 fragment shader 开始：每个像素发出一条视线射线，沿射线采样大气密度。每个采样点会累积三类量：

- Rayleigh 光学深度，用来表示分子散射贡献
- Mie 光学深度，用来表示尘埃、气溶胶等较大颗粒贡献
- Ozone 光学深度，用来表示高层大气吸收贡献

这些量合成 `tau` 后，通过 Beer-Lambert 风格的指数衰减公式得到透射率。

### 2. 光照模型

早期版本只计算相机到采样点的衰减。为了得到日出和日落，需要从每个采样点沿太阳方向再做一次 lightmarching，计算太阳光在抵达采样点之前穿过大气时损失了多少。

### 3. 场景后期处理

文章随后把天空 shader 变成后期处理效果：从 depth buffer 重建世界坐标，用相机位置和当前像素的世界坐标得到 3D 射线，再按场景深度、地面交点或最近几何体截断 raymarching 片段。

### 4. 行星大气

行星尺度需要两个额外处理：

- 用对数深度缓冲处理远距离观察时的精度问题
- 用射线-球体相交测试找到大气球壳入口、出口和行星地面交点

这样 shader 能同时覆盖地面视角、空中视角和近地轨道视角。

### 5. LUT 优化

最后一部分把大气散射拆成多个 LUT：

- Transmittance LUT：保存给定高度和光照角度下有多少阳光能穿过大气
- Sky View LUT：保存从当前观察位置看向不同天穹方向的天空颜色
- Aerial Perspective LUT：保存相机与场景几何体之间的大气雾化和视线透射率

最终合成 pass 会把 Sky View LUT 用于背景像素，把 Aerial Perspective LUT 用于场景几何体，从而用纹理查找替代大量重复 raymarching。

## 中文校对记录

源文附带中文对照，录入时已按英文主文校对关键术语和明显错误，主要包括：

- 将 `raymarching` 从“光线追踪”修正为保留英文术语或“沿射线逐步采样”
- 将 `Uniforms` 从“制服/校服”修正为“参数”
- 修正 `optical depth`、`transmittance`、`Aerial Perspective LUT`、`Sky View LUT` 等术语
- 修正 “Green a bit more / Blue the most” 等被机翻破坏的列表项
- 修正 `Outer-Worldly Atmosphere`、`Final Thoughts` 等标题译法

## 关联页面

- [[Atmospheric Scattering]]
- [[Raymarching]]
- [[Rayleigh Scattering]]
- [[Mie Scattering]]
- [[Ozone Absorption]]
- [[Optical Depth and Transmittance]]
- [[Planetary Atmosphere Rendering]]
- [[LUT-based Atmospheric Scattering]]
- [[Maxime Heckel]]
- [[Sebastian Hillaire]]
