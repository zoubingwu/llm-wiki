---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 傅里叶变换
  - 频域
  - 数学
source_count: 1
---

# Fourier Transform

傅里叶变换（Fourier Transform）是一种把信号从时域（Time Domain）转换到频域（Frequency Domain）的数学方法。

## 直观作用

对于声音这样的复合波形，傅里叶变换可以帮助我们识别它由哪些频率成分构成。

例如，一个看起来复杂的波形，经过傅里叶变换后，可能显现出明显的 200 Hz 和 800 Hz 峰值。

## 输入与输出

- 输入通常是一串样本值
- 输出通常是一串复数，表示不同频率上的分量
- 在音频可视化中，常只关注复数的模（magnitude），也就是“强度”

## 在音频可视化中的作用

它让 [[Audio Visualization]] 可以把“当前这段声音里有哪些频率更强”画出来。

## 相关概念

- [[Time Domain and Frequency Domain]]
- [[FFT and rFFT]]
- [[Pure Tone]]
