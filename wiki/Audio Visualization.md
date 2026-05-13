---
type: concept
created: 2026-04-09
updated: 2026-05-13
tags:
  - 音频
  - 可视化
  - 信号处理
source_count: 1
---

# Audio Visualization

音频可视化（Audio Visualization）是将音频信号的时间变化或频率结构转换为图形表现的技术。

## 核心思路

在播放器里常见的跳动柱状图，本质上是在展示当前音频窗口内不同频率分量的强弱。

一个基础实现通常包含以下步骤：

1. 解析音频文件，得到样本数组
2. 从当前播放位置截取一个固定大小的窗口
3. 对该窗口做 [[FFT and rFFT|快速傅里叶变换]]
4. 对复数结果求模，得到各频率分量强度
5. 将结果归一化后绘制成柱状图或曲线

## 关键组成

- [[Audio Sampling]] — 把连续声音离散化为样本
- [[Fourier Transform]] — 把复合波形拆到频率维度
- [[FFT and rFFT]] — 实际计算频谱的常用算法
- [[Time Smoothing]] — 让可视化结果更平稳
- [[Web Audio API]] — Web 端读取和处理音频的常用接口

## 来源

- [[音频可视化：采样、频率和傅里叶变换]]

## 相关概念

- [[Sound Wave]]
- [[Time Domain and Frequency Domain]]
- [[Fourier Transform]]
