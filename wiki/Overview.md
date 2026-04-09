---
type: overview
created: 2026-04-08
updated: 2026-04-09
tags:
  - overview
source_count: 4
---

# Overview

个人知识库的主题总览。目前涵盖四个核心主题：**上下文工程**（Context Engineering）、**LLM Wiki 模式**、**音频信号处理 / 音频可视化** 和 **前端动画中的物理模型**。

## Context Engineering（上下文工程）

研究 LLM 如何接收、处理和利用输入信息，以及如何通过结构化管理上下文窗口来提升模型输出质量。

核心发现：输入更多信息反而可能降低模型表现（[[Context Rot]] 问题），需要通过 [[Context Engineering]] 的四种策略（Write、Select、Compress、Isolate）来优化。

涉及：[[Attention Mechanism]]、[[Context Window]]、[[Retrieval-Augmented Generation (RAG)]]、[[Lost in the Middle Problem]] 等。

## LLM Wiki 模式

一种由 LLM 逐步构建和维护的持久化知识库架构。核心理念是 **知识编译一次、持续更新**，而非每次查询时重新从原始文档中提取。

人负责：提供源资料、提出问题、审查结果。LLM 负责：总结、交叉引用、归档、维护一致性。

涉及：[[Scratchpads]]、[[Long-term Memory for LLMs]]、Obsidian 工具链（Web Clipper、Dataview、Marp）。

## 音频信号处理与音频可视化

研究声音如何从连续波形变成数字样本，如何通过 [[Fourier Transform]] 从时域切换到频域，以及如何把这些频率分量绘制成播放器里的频谱柱状图。

这条知识线串起了声音的物理直觉、数字音频的采样表示、频谱分析和浏览器端可视化实现。

涉及：[[Sound Wave]]、[[Frequency and Amplitude in Sound]]、[[Pure Tone]]、[[Audio Sampling]]、[[Sampling Rate and Bit Depth]]、[[Time Domain and Frequency Domain]]、[[FFT and rFFT]]、[[Audio Visualization]]、[[Time Smoothing]]、[[Web Audio API]]。

## 前端动画中的物理模型

研究前端交互动画如何借用物理模型来获得更自然的运动效果，尤其是弹簧动画（[[Spring Animation]]）背后的恢复力、质量和阻尼。

这条知识线把数学/物理模型与 UI 动画参数连接起来，帮助理解为什么 `mass`、`stiffness`、`damping` 会直接改变动画手感。

涉及：[[Hooke's Law]]、[[Harmonic Oscillator]]、[[Damping in Spring Animation]]、[[Spring Parameters in Framer Motion]]、[[Framer Motion]]。
