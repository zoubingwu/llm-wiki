---
type: overview
created: 2026-04-08
updated: 2026-04-26
tags:
  - overview
source_count: 12
---

# Overview

个人知识库的主题总览。目前涵盖十个核心主题：**上下文工程**（Context Engineering）、**AI 时代的用户体验**、**LLM Wiki 模式**、**Transformer 架构 / 注意力机制**、**音频信号处理 / 音频可视化**、**前端动画中的物理模型**、**浏览器中的折射玻璃效果**、**Web 应用快捷键系统**、**六边形网格算法** 和 **黑客文化 / 开源传统**。

## Context Engineering（上下文工程）

研究 LLM 如何接收、处理和利用输入信息，以及如何通过结构化管理上下文窗口来提升模型输出质量。

核心发现：输入更多信息反而可能降低模型表现（[[Context Rot]] 问题），需要通过 [[Context Engineering]] 的四种策略（Write、Select、Compress、Isolate）来优化。

涉及：[[Attention Mechanism]]、[[Context Window]]、[[Retrieval-Augmented Generation (RAG)]]、[[Lost in the Middle Problem]] 等。

## AI 时代的用户体验

研究 AI 把用户角色从“执行步骤的人”转成“监督自动化的人”之后，交互设计、可用性指标和风险控制方式会如何被重写。

这条知识线从 [[Intent-based Outcome Specification]] 出发，串起 [[Articulation Barrier]]、[[Orchestration Surface]]、[[Intentional Cognitive Friction]]、[[Slow AI]] 与 [[Intent by Discovery]]，也和 [[Long-term Memory for LLMs]]、[[Multi-agent System]] 等系统层能力发生交叉。

## LLM Wiki 模式

一种由 LLM 逐步构建和维护的持久化知识库架构。核心理念是 **知识编译一次、持续更新**，而非每次查询时重新从原始文档中提取。

人负责：提供源资料、提出问题、审查结果。LLM 负责：总结、交叉引用、归档、维护一致性。

涉及：[[Scratchpads]]、[[Long-term Memory for LLMs]]、Obsidian 工具链（Web Clipper、Dataview、Marp）。

## Transformer 架构与注意力机制

研究现代 LLM 的基础架构从何而来，以及注意力机制为什么既带来了表达能力，也带来了长上下文成本。

这条知识线从 [[Attention Is All You Need]] 出发，串起 [[Transformer]]、[[Self-Attention]]、[[Scaled Dot-Product Attention]]、[[Multi-Head Attention]] 和 [[Positional Encoding]]，也为理解 [[Context Window]]、[[Lost in the Middle Problem]] 等现象提供底层背景。

## 音频信号处理与音频可视化

研究声音如何从连续波形变成数字样本，如何通过 [[Fourier Transform]] 从时域切换到频域，以及如何把这些频率分量绘制成播放器里的频谱柱状图。

这条知识线串起了声音的物理直觉、数字音频的采样表示、频谱分析和浏览器端可视化实现。

涉及：[[Sound Wave]]、[[Frequency and Amplitude in Sound]]、[[Pure Tone]]、[[Audio Sampling]]、[[Sampling Rate and Bit Depth]]、[[Time Domain and Frequency Domain]]、[[FFT and rFFT]]、[[Audio Visualization]]、[[Time Smoothing]]、[[Web Audio API]]。

## 前端动画中的物理模型

研究前端交互动画如何借用物理模型来获得更自然的运动效果，尤其是弹簧动画（[[Spring Animation]]）背后的恢复力、质量和阻尼。

这条知识线把数学/物理模型与 UI 动画参数连接起来，帮助理解为什么 `mass`、`stiffness`、`damping` 会直接改变动画手感。

涉及：[[Hooke's Law]]、[[Harmonic Oscillator]]、[[Damping in Spring Animation]]、[[Spring Parameters in Framer Motion]]、[[Framer Motion]]。

## 浏览器中的折射玻璃效果

研究如何在浏览器里近似实现具有“材质感”的玻璃 UI，重点不是普通模糊，而是通过 [[Refraction]] 建模背景位移，再交给 [[SVG Displacement Map]] 和 [[Specular Highlight]] 组合出可感知的厚度与高光。

这条知识线连接了光学直觉、位移贴图编码和浏览器滤镜约束，也补充了前端渲染层面对“Apple 风格视觉效果”可实现边界的理解。

涉及：[[Liquid Glass Effect]]、[[Refraction]]、[[SVG Displacement Map]]、[[Specular Highlight]]。

## Web 应用快捷键系统

研究 Web 应用如何在浏览器环境里实现接近桌面应用的快捷键体验，问题链路从 [[Keyboard Event]] 的采集开始，经过 [[Keyboard Layout Mapping]] 的国际化归一化，再落到 [[Keybinding Service]] 的命令分派和冲突裁决。

这条知识线把浏览器输入事件、键盘布局检测、绑定解析和上下文条件系统连成了一条完整实现链路。

涉及：[[Keyboard Shortcut Support in Web Apps]]、[[keyCode]]、[[Keyboard Map API]]、[[Context Key Expression]]、[[VS Code]]、[[node-native-keymap]]。

## 六边形网格算法

研究游戏和可视化系统中六边形网格（Hexagonal Grids）的几何、坐标系统、存储和算法实现。核心思路是把六边形地图建模为可做向量运算的坐标系统，再在其上实现距离、线段、移动范围、视野和寻路。

这条知识线从 [[Red Blob Games Hexagonal Grids]] 出发，串起 [[Hexagonal Grid Geometry]]、[[Hex Coordinate Systems]]、[[Cube Coordinates for Hex Grids]]、[[Axial Coordinates for Hex Grids]]、[[Offset Coordinates for Hex Grids]]、[[Doubled Coordinates for Hex Grids]]、[[Hex Grid Distance]]、[[Hex Grid Line Drawing]]、[[Hex Grid Map Storage]] 和 [[Hex Grid Pathfinding]]。

## 黑客文化 / 开源传统

研究 hacker 一词在软件共同体中的原始含义、学习路径、声望机制和开源历史。核心关注点是能力、态度、贡献和同行认可如何共同形成技术身份。

这条知识线从 [[How To Become A Hacker]] 出发，串起 [[Hacker Culture]]、[[Hacker Attitude]]、[[Basic Hacking Skills]]、[[Hacker vs Cracker]]、[[Hacker Status and Reputation]]、[[Gift Culture in Hacker Culture]]、[[Open Source Software]]、[[Unix-centered Hacker Culture]] 和 [[Free Software Movement]]。
