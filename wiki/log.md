# Wiki Log

Append-only 变更记录，最新在底部。

## [2026-04-08] ingest | A Guide to Context Engineering for LLMs
- 录入了 ByteByteGo 的上下文工程指南
- 创建了以下页面：
  - `Context Engineering.md` — 四种策略的完整概述
  - `Context Rot.md` — 上下文腐化现象
  - `Attention Mechanism.md` — 注意力机制原理
  - `Context Window.md` — 上下文窗口概念
  - `Lost in the Middle Problem.md` — 注意力分布不均问题
  - `Retrieval-Augmented Generation (RAG).md` — RAG 概念及其在 wiki 中的角色
  - `Scratchpads.md` — 外部存储中间步骤
  - `Long-term Memory for LLMs.md` — 跨会话持久化
  - `Multi-agent System.md` — 多智能体隔离策略
  - `ByteByteGo.md` — 源机构实体
  - `Karpathy.md` — Andrej Karpathy 实体
  - `Chroma.md` — Context Rot 研究发布者
  - `Anthropic.md` — 多智能体系统开发方
  - `Overview.md` — 知识库总览

## [2026-04-08] ingest | llm-wiki
- 录入了 karpathy 的 LLM Wiki 模式概念文件
- 创建了以下页面：
  - `LLM Wiki Pattern.md` — 完整的 LLM Wiki 模式概述
- 更新了以下页面（关联了 RAG 和 wiki 的关系）：
  - `Retrieval-Augmented Generation (RAG).md` — 补充了 RAG 与 wiki 模式的对比
  - `index.md` — 全量更新

## [2026-04-09] ingest | Context Engineering for AI Agents Lessons from Building Manus
- 录入了 Manus 团队的实战经验文章
- 创建了以下页面：
  - `Manus.md` — 实体页，总结六个核心原则
  - `KV-Cache.md` — KV-Cache 对 AI 智能体的重要性
  - `Agent Loop.md` — 智能体循环流程与挑战
  - `State Machine for Agents.md` — 状态机管理工具可用性
  - `Recitation for Attention Manipulation.md` — 通过重复读写操纵注意力
  - `File System as Context.md` — 文件系统作为终极上下文
  - `Keep Errors in Context.md` — 保留错误痕迹让模型自适应
  - `Few-Shot Prompting in Agents.md` — 少样本提示的陷阱
  - `Stochastic Graduate Descent.md` — “随机研究生梯度下降”，Manus 团队对实验迭代过程的戏称
- 更新了以下页面：
  - `index.md` — 新增 9 个概念和 1 个实体
  - `Context Engineering.md` — 补充了实战案例链接

## [2026-04-09] lint
- 修复了 wiki 中 4 个缺失的链接目标页面：
  - `State Space Model (SSM).md`
  - `Neural Turing Machines.md`
  - `qmd.md`
  - `Masking Tool Logits.md`
- 修复了多处弱交叉引用：
  - `Manus.md` — 补充对 `File System as Context`、`Keep Errors in Context`、`Few-Shot Prompting in Agents`、`Stochastic Graduate Descent` 等页面的入链
  - `Multi-agent System.md`、`Scratchpads.md`、`Context Engineering.md` — 补充对 `Anthropic`、`Karpathy`、`ByteByteGo` 的交叉引用
  - `index.md` — 补充 `Overview` 以及新建页面入口

## [2026-04-09] ingest | 音频可视化：采样、频率和傅里叶变换
- 录入了一篇关于声音波形、采样、傅里叶变换与 Web 音频可视化的中文技术文章
- 创建了以下页面：
  - `Audio Visualization.md` — 音频可视化的整体实现思路
  - `Sound Wave.md` — 声波与波形表示
  - `Frequency and Amplitude in Sound.md` — 频率与振幅在声音中的含义
  - `Pure Tone.md` — 纯音概念
  - `Audio Sampling.md` — 音频采样的基本过程
  - `Sampling Rate and Bit Depth.md` — 采样率与采样深度
  - `Fourier Transform.md` — 傅里叶变换的作用
  - `Time Domain and Frequency Domain.md` — 时域与频域的区别
  - `FFT and rFFT.md` — FFT 与 rFFT 的计算角色
  - `Time Smoothing.md` — 音频频谱可视化中的时间平滑
  - `Web Audio API.md` — 浏览器端音频处理接口
  - `Window Function.md` — FFT 前的窗函数预处理
- 更新了以下页面：
  - `Overview.md` — 新增“音频信号处理与音频可视化”主题
  - `index.md` — 新增 12 个概念和 1 条源摘要

## [2026-04-09] ingest | The physics behind spring animations - The Blog of Maxime Heckel
- 录入了一篇关于弹簧动画、阻尼和 Framer Motion 参数的英文文章，并修正了其中可见的中文机器翻译问题
- 创建了以下页面：
  - `Spring Animation.md` — 弹簧动画的整体概念
  - `Hooke's Law.md` — 胡克定律
  - `Harmonic Oscillator.md` — 简谐振子
  - `Damping in Spring Animation.md` — 弹簧动画中的阻尼
  - `Spring Parameters in Framer Motion.md` — mass、stiffness、damping 三个参数
  - `Framer Motion.md` — 动画库实体页
  - `Maxime Heckel.md` — 作者实体页
- 更新了以下页面：
  - `Overview.md` — 新增“前端动画中的物理模型”主题
  - `index.md` — 新增 5 个概念、2 个实体和 1 条源摘要

## [2026-04-09] ingest | Attention Is All You Need
- 录入了 Transformer 的原始论文，并按英文原文校正了中文机翻中的明显术语错误
- 创建了以下页面：
  - `Attention Is All You Need.md` — 源摘要页，记录论文贡献和机翻校对点
  - `Transformer.md` — Transformer 架构总览
  - `Self-Attention.md` — 自注意力机制
  - `Scaled Dot-Product Attention.md` — 缩放点积注意力
  - `Multi-Head Attention.md` — 多头注意力
  - `Positional Encoding.md` — 位置编码
- 更新了以下页面：
  - `Attention Mechanism.md` — 补充 Transformer 路线下的注意力实现结构
  - `Overview.md` — 新增“Transformer 架构与注意力机制”主题
  - `index.md` — 新增 5 个概念和 1 条源摘要

## [2026-04-11] ingest | Liquid Glass in the Browser Refraction with CSS and SVG
- 录入了一篇关于浏览器端 Liquid Glass 效果实现的英文文章，并按英文原文修正了其中明显损坏的中文机翻
- 创建了以下页面：
  - `Liquid Glass in the Browser Refraction with CSS and SVG.md` — 源摘要页，记录实现链路、限制与机翻校对点
  - `Liquid Glass Effect.md` — 液态玻璃视觉效果的整体概念
  - `Refraction.md` — 折射在 UI 位移建模中的作用
  - `SVG Displacement Map.md` — 浏览器中位移贴图的编码方式与约束
  - `Specular Highlight.md` — 镜面高光在玻璃材质感中的角色
- 更新了以下页面：
  - `Overview.md` — 新增“浏览器中的折射玻璃效果”主题
  - `index.md` — 新增 4 个概念和 1 条源摘要

## [2026-04-22] ingest | Intent by Discovery: Designing the AI User Experience
- 录入了 Jakob Nielsen 关于 AI UX 范式转移的文章，建立了从意图表达、编排层、风险校准到发现式交互的一组页面
- 创建了以下页面：
  - `Intent by Discovery Designing the AI User Experience.md` — 源摘要页，记录文章论点与中文校对点
  - `Intent-based Outcome Specification.md` — 基于意图的结果规范
  - `Articulation Barrier.md` — 表达障碍
  - `Orchestration Surface.md` — 编排界面
  - `Intentional Cognitive Friction.md` — 有意认知摩擦
  - `Slow AI.md` — 长时运行 AI 的交互模式
  - `Intent by Discovery.md` — 通过探索形成意图的长期 UX 模式
  - `Jakob Nielsen.md` — 作者实体页
- 更新了以下页面：
  - `Long-term Memory for LLMs.md` — 补充可见、可编辑用户模型的 UX 视角
  - `Multi-agent System.md` — 补充编排层与协作意图的 UX 约束
  - `Overview.md` — 新增“AI 时代的用户体验”主题
  - `index.md` — 新增 6 个概念、1 个实体和 1 条源摘要
- 校对了以下源文件：
  - `articles/Intent by Discovery Designing the AI User Experience.md` — 修正标题粘连、关键术语和文末漏译

## [2026-04-22] lint | source page 结构补齐
- 补齐了 5 个此前只在 `index.md` 和少量页面中被链接、但缺少目标文件的 source page：
  - `A Guide to Context Engineering for LLMs.md`
  - `Context Engineering for AI Agents Lessons from Building Manus.md`
  - `llm-wiki.md`
  - `The physics behind spring animations - The Blog of Maxime Heckel.md`
  - `音频可视化：采样、频率和傅里叶变换.md`
- 更新了以下页面以补强入链：
  - `Manus.md`
  - `Maxime Heckel.md`
  - `LLM Wiki Pattern.md`

## [2026-04-23] ingest | Web 应用快捷键支持系列
- 录入了 Peng Lyu 关于 Web 应用快捷键支持的三篇系列文章，建立了从 `Keyboard Event`、布局映射到 `Keybinding Service` 的完整主题线
- 创建了以下页面：
  - `Keyboard Shortcut Support in Web Apps.md` — Web 快捷键系统总览
  - `Keyboard Event.md` — 浏览器键盘事件与主派发时机
  - `keyCode.md` — 废弃属性的歧义和替代方案
  - `Keyboard Layout Mapping.md` — 国际化键盘布局归一化
  - `Keyboard Map API.md` — 浏览器侧布局映射提案
  - `Keybinding Service.md` — 快捷键到命令的查找与冲突裁决
  - `Context Key Expression.md` — `when` 条件表达式
  - `Peng Lyu.md` — 系列作者实体页
  - `VS Code.md` — 案例应用实体页
  - `node-native-keymap.md` — 键盘布局模块实体页
  - `Web 应用快捷键支持（一）：正确处理 Keyboard Event.md` — 第一篇源摘要页
  - `Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap.md` — 第二篇源摘要页
  - `Web 应用快捷键支持（三）：VS Code 快捷键服务的实现.md` — 第三篇源摘要页
- 更新了以下页面：
  - `Overview.md` — 新增“Web 应用快捷键系统”主题
  - `index.md` — 新增 7 个概念、3 个实体和 3 条源摘要
- 校对了以下源文件：
  - `articles/Web 应用快捷键支持（一）：正确处理 Keyboard Event.md` — 修正明显笔误
  - `articles/Web 应用快捷键支持（二）：codekey 的缺点和 Node native keymap.md` — 修正示例代码排版和错字
  - `articles/Web 应用快捷键支持（三）：VS Code 快捷键服务的实现.md` — 修正代码示例排版和错字

## [2026-04-26] ingest | Red Blob Games: Hexagonal Grids
- 录入了 Amit J. Patel 关于六边形网格几何、坐标系统、距离、线段、存储和寻路算法的英文指南
- 创建了以下页面：
  - `Red Blob Games Hexagonal Grids.md` — 源摘要页，记录文章的坐标系统选择和算法链路
  - `Amit J. Patel.md` — 作者实体页
  - `Hexagonal Grid Geometry.md` — 六边形几何、朝向、间距和角点计算
  - `Hex Coordinate Systems.md` — offset、cube、axial、doubled 坐标系统总览
  - `Cube Coordinates for Hex Grids.md` — cube 坐标和 `q + r + s = 0` 约束
  - `Axial Coordinates for Hex Grids.md` — axial 坐标及其与 cube 的关系
  - `Offset Coordinates for Hex Grids.md` — odd/even row/column offset 坐标
  - `Doubled Coordinates for Hex Grids.md` — double-width 和 double-height 坐标
  - `Hex Grid Distance.md` — 六边形网格距离公式
  - `Hex Grid Line Drawing.md` — 插值采样与 `cube_round`
  - `Hex Grid Map Storage.md` — 数组、哈希表和压缩行存储
  - `Hex Grid Pathfinding.md` — 六边形地图上的图搜索接口
- 更新了以下页面：
  - `Overview.md` — 新增“六边形网格算法”主题
  - `index.md` — 新增 10 个概念、1 个实体和 1 条源摘要
- 源文件为英文原文，未包含中文机翻校对项
