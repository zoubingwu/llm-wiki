---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 信号处理
  - FFT
  - 窗函数
source_count: 1
---

# Window Function

窗函数（Window Function）是在对样本窗口做 [[FFT and rFFT|FFT]] 之前，先对样本值施加的一种变换。

## 在文章中的定位

原文提到它通常会出现在 FFT 之前，但未展开原理；对当前理解音频可视化流程来说，可以先把它视为一个 `number[] -> number[]` 的预处理步骤。

## 实际意义

在频谱分析中，窗函数常用于改善窗口边界带来的分析误差。

## 相关概念

- [[FFT and rFFT]]
- [[Audio Visualization]]
