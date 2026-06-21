---
type: concept
created: 2026-06-21
updated: 2026-06-21
tags:
  - browser
  - rendering
  - performance
source_count: 1
---

# Browser Rendering Pipeline

浏览器渲染流水线（Browser Rendering Pipeline）把 HTML、CSS 和 JavaScript 变化转成屏幕像素。[[How modern browsers work]] 用 Chromium 管线概括为：DOM → style → layout → paint → layerize → raster → composite。

## 从 DOM 到布局

HTML parser 以流式方式构建 DOM（Document Object Model）。CSS parser 构建 CSSOM（CSS Object Model），浏览器再把 DOM 和 CSSOM 匹配成每个节点的 computed style。

布局阶段会构建 layout tree：`display: none` 的元素从 layout tree 中省略，伪元素和可见内容会形成布局节点。layout 计算每个盒子的尺寸、坐标、换行、边距、padding、border、flow、flexbox 或 grid 结果。

## 从绘制到合成

布局完成后，渲染进程会生成 paint records 或 display list。浏览器再把页面拆成 layers，按 tile 光栅化成 bitmap texture，并把 compositor frame 交给 browser process 和 GPU process 合成。

合成线程和主线程分离运行。滚动、`transform` 和 `opacity` 这类 compositor-friendly 变化通常可以直接更新 layer 位置或透明度，减少 style/layout/paint 的重复工作。

## 性能含义

样式、布局、绘制和合成是有依赖顺序的链条。频繁交错 DOM 写入和布局读取会触发布局抖动（layout thrashing）。批量 DOM 更新、压缩同步布局读取、使用 `requestAnimationFrame` 对齐帧边界，以及优先选择 compositor-friendly 动画，都是从这条管线推导出的实践。

## 关联页面

- [[Modern Browser Architecture]]
- [[Browser Networking and Resource Loading]]
- [[V8 JavaScript Engine]]
- [[Liquid Glass Effect]]
- [[Refraction]]
- [[SVG Displacement Map]]
- [[Specular Highlight]]
