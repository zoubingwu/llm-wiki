---
type: source
created: 2026-04-11
updated: 2026-05-13
tags:
  - source
  - frontend
  - svg
  - graphics
source_count: 1
---

# Liquid Glass in the Browser Refraction with CSS and SVG

这篇 [[kube]] 文章用一个浏览器端原型拆解了 Liquid Glass 效果的核心组成：[[Refraction|折射]]、[[SVG Displacement Map|SVG 位移贴图]] 和 [[Specular Highlight|镜面高光]]。

源文见：[Liquid Glass in the Browser Refraction with CSS and SVG](../articles/Liquid%20Glass%20in%20the%20Browser%20Refraction%20with%20CSS%20and%20SVG.md)。

## 核心贡献

- 把 Liquid Glass 近似为“实时折射 + 边缘高光”，而不是追求像素级复刻
- 用简化后的 [[Refraction]] 模型计算玻璃边缘的位移幅度
- 将位移矢量场编码进 [[SVG Displacement Map]] 的红绿通道
- 用单独的高光图层和 `<feBlend />` 叠加出 [[Specular Highlight]]
- 明确指出 SVG filter 作为 `backdrop-filter` 的方案目前基本受限于 Chromium / Chrome

## 文章中的实现假设

- 环境介质折射率固定为 1（空气）
- 只考虑 `index > 1` 的材料，典型值取 1.5（玻璃）
- 只模拟一次折射，不处理出射时的第二次折射
- 入射光线与背景平面正交，不考虑透视
- 目标物体视作与背景平行的二维形状
- 物体与背景之间没有间隙，因此无需跨层采样

这些约束刻意压缩了问题空间，使实现能落到浏览器滤镜和预计算贴图上。

## 关键实现链路

### 1. 表面函数

文章先为玻璃边缘定义一个表面函数（surface function），再通过导数估算表面法线，用 [[Refraction]] 的角度关系得到每个位置的偏移方向。

### 2. 位移预计算

对于圆形或可由圆形拉伸得到的形状，距边界相同的位置具有相同的位移幅度。因此可以沿单个半径预计算位移，再绕形状边缘复用。

### 3. 位移图编码

预计算好的位移向量先归一化，再从极坐标转换到笛卡尔坐标：

- `R` 通道保存 X 位移
- `G` 通道保存 Y 位移
- `128` 表示零位移
- `<feDisplacementMap />` 的 `scale` 用来把归一化位移恢复成实际像素偏移

### 4. 高光叠加

折射之外，再单独生成一层 [[Specular Highlight]]，最后通过 `<feBlend />` 覆盖到折射后的结果上。

## 重要限制

- 每个通道只有 8 bit，单轴可表达的离散位移范围有限
- 滤镜尺寸不会自动匹配元素尺寸，需要自行保证贴图和目标元素一致
- 除了调整 `scale` 这类参数外，形状或尺寸一变，通常就要重建整张位移贴图
- 在常规浏览器场景里，SVG filter 作为 `backdrop-filter` 仍然缺乏跨浏览器支持

## 中文校对记录

源文附带的中文对照存在多处明显机器翻译错误，录入时已按英文原文修正，主要包括：

- 把 `Normal` 误译成“普通的”，修正为“法线”
- 折射率条件 `n2 < n1` 一段中文被破坏，已恢复
- 把 `Lip` 误译成“七月”，修正为“唇缘”
- 把 `Scale` 误译成“楼梯”，修正为“缩放”
- 多处标题和句子存在粘连、断裂和术语不统一，已做最低限度校正

## 关联页面

- [[Liquid Glass Effect]]
- [[Refraction]]
- [[SVG Displacement Map]]
- [[Specular Highlight]]
