---
type: concept
created: 2026-04-11
updated: 2026-04-11
tags:
  - frontend
  - ui
  - graphics
source_count: 1
---

# Liquid Glass Effect

液态玻璃效果（Liquid Glass Effect）是一类让 UI 元素看起来像弯曲、可折射玻璃的界面视觉效果。它的核心不是普通模糊，而是让背景内容随着“玻璃表面”发生位移，并在边缘叠加高光。

## 在浏览器中的近似实现

这篇文章给出的实现路径是：

- 用 [[Refraction|折射]] 计算背景采样位置的偏移
- 把偏移编码成 [[SVG Displacement Map|SVG 位移贴图]]
- 用 `<feDisplacementMap />` 对背景内容做位移
- 再叠加一层 [[Specular Highlight|镜面高光]]

这是一种工程上的近似，而不是完整的物理玻璃模拟。

## 形状为什么重要

玻璃边缘的表面函数（surface function）直接决定折射梯度。

- 凸面（convex）通常把采样保持在形状内部，更适合 UI 组件
- 凹面（concave）会把采样推出边界之外，导致需要额外的背景区域
- squircle 风格的凸面比简单圆弧过渡更平滑，拉伸成圆角矩形时更自然

## 工程限制

- 依赖 [[SVG Displacement Map]] 的图像编码和位移范围
- 折射贴图通常需要预计算，动态改尺寸或改形状时成本较高
- 把 SVG filter 当作 `backdrop-filter` 用于真实 UI 组件时，目前主要受限于 Chromium

## 相关概念

- [[Refraction]]
- [[SVG Displacement Map]]
- [[Specular Highlight]]
- [[Liquid Glass in the Browser Refraction with CSS and SVG]]
