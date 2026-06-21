---
type: overview
created: 2026-04-08
updated: 2026-06-21
tags:
  - overview
source_count: 22
---

# Overview

个人知识库的主题总览。目前涵盖十八个核心主题：**上下文工程**（Context Engineering）、**AI 推理工程 / 模型服务**、**AI 时代的用户体验**、**界面设计词汇 / 设计系统**、**LLM Wiki 模式**、**Transformer 架构 / 注意力机制**、**音频信号处理 / 音频可视化**、**前端动画中的物理模型**、**浏览器中的折射玻璃效果**、**实时图形渲染中的大气散射**、**现代浏览器内部机制**、**Web 应用快捷键系统**、**跨平台桌面应用架构**、**六边形网格算法**、**黑客文化 / 开源传统**、**身份改变 / 目标系统**、**Tailscale 网络加速 / Peer Relay** 和 **开源产品信任与自托管**。

## Context Engineering（上下文工程）

研究 LLM 如何接收、处理和利用输入信息，以及如何通过结构化管理上下文窗口来提升模型输出质量。

核心发现：输入更多信息反而可能降低模型表现（[[Context Rot]] 问题），需要通过 [[Context Engineering]] 的四种策略（Write、Select、Compress、Isolate）来优化。

涉及：[[Attention Mechanism]]、[[Context Window]]、[[Retrieval-Augmented Generation (RAG)]]、[[Lost in the Middle Problem]] 等。

## AI 推理工程 / 模型服务

研究训练后模型如何在生产环境中以可控延迟、吞吐量、成本和质量运行。核心切入点是 [[LLM Inference Phases]]：prefill 受算力限制，用 TTFT 衡量；decode 受内存带宽限制，用 TPS 衡量。

这条知识线从 [[A Guide to AI Inference Engineering]] 出发，串起 [[AI Inference Engineering]]、[[Inference Batching]]、[[Prefix Caching]]、[[Model Quantization]]、[[Speculative Decoding]]、[[Model Parallelism for Inference]]、[[Disaggregated Inference Serving]] 和 [[KV-Cache]]。

## AI 时代的用户体验

研究 AI 把用户角色从“执行步骤的人”转成“监督自动化的人”之后，交互设计、可用性指标和风险控制方式会如何被重写。

这条知识线从 [[Intent-based Outcome Specification]] 出发，串起 [[Articulation Barrier]]、[[Orchestration Surface]]、[[Intentional Cognitive Friction]]、[[Slow AI]] 与 [[Intent by Discovery]]，也和 [[Long-term Memory for LLMs]]、[[Multi-agent System]] 等系统层能力发生交叉。

## 界面设计词汇 / 设计系统

研究设计师、工程师和产品人员如何用共享术语描述界面质量，把“看起来不对”拆成排版、颜色、图标、布局、动效、可访问性、信息架构、文案、组件和度量问题。

这条知识线从 [[Say precisely what you mean.]] 出发，串起 [[Interface Design Vocabulary]]、[[UI Typography]]、[[UI Color Systems]]、[[UI Iconography]]、[[UI Layout]]、[[UI Motion]]、[[Accessibility in UI Design]]、[[Information Architecture]]、[[UI Copywriting]]、[[Design Systems]]、[[Design Analytics]] 和 [[UI Components]]。

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

## 实时图形渲染中的大气散射

研究如何用 shader 在浏览器和实时 3D 场景中渲染天空、日出日落、地平线雾霭和行星大气层。核心思路是把天空颜色视为光在大气体积中的散射与吸收结果，再用 [[Raymarching]]、深度缓冲和 LUT 优化把物理直觉压缩成可实时运行的后期处理。

这条知识线从 [[On Rendering the Sky, Sunsets, and Planets - The Blog of Maxime Heckel]] 出发，串起 [[Atmospheric Scattering]]、[[Rayleigh Scattering]]、[[Mie Scattering]]、[[Ozone Absorption]]、[[Optical Depth and Transmittance]]、[[Planetary Atmosphere Rendering]] 和 [[LUT-based Atmospheric Scattering]]。

## 现代浏览器内部机制

研究浏览器如何把 URL、HTML、CSS 和 JavaScript 转成安全、可交互、可合成的页面。核心问题包括 [[Browser Networking and Resource Loading]]、[[Browser Rendering Pipeline]]、[[V8 JavaScript Engine]]、[[JavaScript Module Loading]]、[[Browser Multi-Process Architecture]] 和 [[Site Isolation]] 如何协同。

这条知识线从 [[How modern browsers work]] 出发，以 [[Chromium]] 为主线，串起 [[Modern Browser Architecture]]、[[Blink]]、[[Gecko]]、[[WebKit]] 和 [[Browser Engine Comparison]]，也连接 [[Electron]]、[[Native-feel WebView Desktop Apps]] 和浏览器端图形效果主题。

## Web 应用快捷键系统

研究 Web 应用如何在浏览器环境里实现接近桌面应用的快捷键体验，问题链路从 [[Keyboard Event]] 的采集开始，经过 [[Keyboard Layout Mapping]] 的国际化归一化，再落到 [[Keybinding Service]] 的命令分派和冲突裁决。

这条知识线把浏览器输入事件、键盘布局检测、绑定解析和上下文条件系统连成了一条完整实现链路。

涉及：[[Keyboard Shortcut Support in Web Apps]]、[[keyCode]]、[[Keyboard Map API]]、[[Context Key Expression]]、[[VS Code]]、[[node-native-keymap]]。

## 跨平台桌面应用架构

研究复杂桌面应用如何在 Web 技术、native shell、后台运行时和性能核心之间分工。重点问题包括跨平台 UI 复用、系统 API 控制、WebView 渲染行为、IPC 类型边界、文件系统索引和内存基线。

这条知识线从 [[A Technical Deep Dive Into the New Raycast]] 出发，把 [[Raycast]] 2.0 作为案例，串起 [[Hybrid Native WebView Architecture]]、[[Native-feel WebView Desktop Apps]]、[[Typed IPC for Multi-runtime Apps]]、[[Rust File Indexer]] 和 [[Electron]]。它也和 [[Keyboard Shortcut Support in Web Apps]]、[[VS Code]] 形成桌面 Web 技术谱系。

## 六边形网格算法

研究游戏和可视化系统中六边形网格（Hexagonal Grids）的几何、坐标系统、存储和算法实现。核心思路是把六边形地图建模为可做向量运算的坐标系统，再在其上实现距离、线段、移动范围、视野、寻路和屏幕坐标转换。

这条知识线从 [[Red Blob Games Hexagonal Grids]] 和 [[Implementation of Hex Grids]] 出发，串起 [[Hexagonal Grid Geometry]]、[[Hex Coordinate Systems]]、[[Cube Coordinates for Hex Grids]]、[[Axial Coordinates for Hex Grids]]、[[Offset Coordinates for Hex Grids]]、[[Doubled Coordinates for Hex Grids]]、[[Hex Grid Distance]]、[[Hex Grid Line Drawing]]、[[Hex Grid Layout]]、[[Fractional Hex Coordinates]]、[[Hex Map Shapes]]、[[Hex Grid Map Storage]] 和 [[Hex Grid Pathfinding]]。

## 黑客文化 / 开源传统

研究 hacker 一词在软件共同体中的原始含义、学习路径、声望机制和开源历史。核心关注点是能力、态度、贡献和同行认可如何共同形成技术身份。

这条知识线从 [[How To Become A Hacker]] 出发，串起 [[Hacker Culture]]、[[Hacker Attitude]]、[[Basic Hacking Skills]]、[[Hacker vs Cracker]]、[[Hacker Status and Reputation]]、[[Gift Culture in Hacker Culture]]、[[Open Source Software]]、[[Unix-centered Hacker Culture]] 和 [[Free Software Movement]]。

## 身份改变 / 目标系统

研究个人改变如何从表层目标进入身份、感知镜头、反馈回路和每日行动系统。核心问题是一个人如何看见旧身份的代价，建立新的愿景和反愿景，再把生活组织成能持续迭代的目标系统。

这条知识线从 [[How to fix your entire life in 1 day]] 出发，串起 [[Identity-Based Behavior Change]]、[[Goal-Oriented Behavior]]、[[Ego Development Stages]]、[[Cybernetic Intelligence]]、[[Vision and Anti-Vision]]、[[Self-Change Protocol]] 和 [[Life as a Game]]。

## Tailscale 网络加速 / Peer Relay

研究 [[Tailscale]] 在复杂 NAT 和跨地域网络中的路径选择问题。核心问题是 Tailnet 设备如何在 direct 路径、[[DERP Relay]] 兜底路径和 [[Tailscale Peer Relay]] 自有中继路径之间切换，以及 relay 节点位置、UDP 可达性和 [[Tailscale ACL|ACL 授权]]如何影响延迟。

这条知识线从 [[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 出发，串起 [[Tailnet]]、[[NAT Traversal]]、[[WireGuard]]、[[DERP Relay]]、[[Tailscale Peer Relay]] 和 [[Tailscale ACL]]。

## 开源产品信任与自托管

研究开源产品在商业化、价格调整、管理层变化和 API 演进中如何影响用户信任与退出路径。核心问题是用户如何从源码、许可证、承诺文本、第三方兼容实现和自托管能力中判断长期控制权。

这条知识线从 [[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]] 出发，把 [[Bitwarden]] 和 [[Vaultwarden]] 作为案例，串起 [[Open Source Trust Erosion]]、[[Self-hosted Password Management]]、[[API Compatibility Drift]] 和 [[Open Source Fork Safety]]。
