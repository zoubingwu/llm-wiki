---
type: concept
created: 2026-04-11
updated: 2026-04-11
tags:
  - svg
  - frontend
  - graphics
source_count: 1
---

# SVG Displacement Map

SVG 位移贴图（SVG Displacement Map）是一种把“像素该从哪里取样”编码进图像，再交给 `<feDisplacementMap />` 执行位移的机制。它适合把数学上计算出的位移场转换成浏览器可渲染的滤镜效果。

## 这篇文章里的编码方式

文章把每个位置的位移向量编码进一张 RGBA 图像：

- 红色通道（R）表示 X 方向位移
- 绿色通道（G）表示 Y 方向位移
- 蓝色通道（B）在这里被忽略
- Alpha 通道保持不透明

向量先归一化到 `[-1, 1]`，再映射到 `0..255` 的颜色通道范围，`128` 表示零位移。

## `<feDisplacementMap />` 的关键语义

`<feDisplacementMap />` 读取位移图后，会按通道值和 `scale` 共同决定真实像素偏移：

- `0` 接近最大负位移
- `128` 表示不位移
- `255` 接近最大正位移
- `scale` 决定归一化位移最终放大成多少像素

因此，如果位移向量已经按最大位移做过归一化，`scale` 就可以直接设成那个最大位移值。

## 生成流程

### 1. 预计算位移

先根据 [[Refraction]] 和表面法线，得到每个位置的位移方向和幅度。

### 2. 归一化

用整个贴图里的最大位移幅度做分母，把所有向量压缩到统一范围。

### 3. 极坐标转笛卡尔坐标

把 `angle + magnitude` 转成 `x + y` 分量。

### 4. 编码成图像

把 `x` / `y` 重新映射到 `R` / `G` 通道，作为 `<feImage />` 载入滤镜。

## 限制

- 每个颜色通道只有 8 bit，能表达的位移分辨率有限
- 贴图本质上是图像资源，尺寸和目标元素不匹配时容易出错
- 把这个滤镜进一步用于 `backdrop-filter` 时，浏览器支持面明显变窄

## 相关概念

- [[Refraction]]
- [[Liquid Glass Effect]]
- [[Specular Highlight]]
- [[Liquid Glass in the Browser Refraction with CSS and SVG]]
