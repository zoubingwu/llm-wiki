---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - FFT
  - 算法
  - 信号处理
source_count: 1
---

# FFT and rFFT

快速傅里叶变换（Fast Fourier Transform，FFT）是高效计算 [[Fourier Transform|傅里叶变换]] 的算法。`rFFT`（Real FFT）则是面向实数输入的变体。

## FFT

FFT 用于快速把一段样本序列转换到频域。

在音频处理中，FFT 常用于分析一段窗口内的频率成分。

## rFFT

对于实数输入信号，输出频谱具有对称性，因此 `rFFT` 只返回一半有效结果。

这意味着：

- 信息仍然足够
- 结果更紧凑
- 计算通常更快

## 在音频可视化中的作用

[[Audio Visualization]] 往往以固定窗口大小取样，然后在每一帧对该窗口做 FFT 或 rFFT。

## 相关概念

- [[Fourier Transform]]
- [[Time Domain and Frequency Domain]]
- [[Time Smoothing]]
