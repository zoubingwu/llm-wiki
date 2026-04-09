---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 采样
  - 音频
  - 数字信号
source_count: 1
---

# Audio Sampling

音频采样（Audio Sampling）是把连续变化的声音信号离散化为样本序列的过程。

## 为什么需要

声音本质上是连续函数，而计算机只能存储有限个值，因此必须通过固定时间间隔进行取样，把连续信号变成离散序列。

## 结果

采样后得到的是一个样本数组（samples），每个元素代表某个时间点的声音值。

## 关键参数

- [[Sampling Rate and Bit Depth|采样率（Sampling Rate）]]
- [[Sampling Rate and Bit Depth|采样深度（Bit Depth）]]

## 在音频可视化中的作用

无论是做 [[Fourier Transform|傅里叶变换]]，还是在 [[Audio Visualization|音频可视化]] 中截取窗口，输入都来自采样后的样本数组。

## 相关概念

- [[Sound Wave]]
- [[Sampling Rate and Bit Depth]]
- [[Web Audio API]]
