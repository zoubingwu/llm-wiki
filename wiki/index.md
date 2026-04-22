# Wiki Index

## 概念 Pages
- [[Overview]] — 当前知识库总览，串联上下文工程、AI UX 与 LLM Wiki 模式
- [[Context Engineering]] — 设计和管理 LLM 上下文窗口的四种策略（Write、Select、Compress、Isolate）
- [[Context Rot]] — 输入长度增加导致 LLM 性能断崖式下降
- [[Attention Mechanism]] — 注意力机制的工作原理、计算代价和注意力分配不均
- [[Transformer]] — 以注意力机制替代 RNN/CNN 的基础序列建模架构
- [[Self-Attention]] — 让序列中每个位置直接读取其他位置信息的机制
- [[Scaled Dot-Product Attention]] — Transformer 中标准的注意力计算形式
- [[Multi-Head Attention]] — 并行关注不同表示子空间的注意力机制
- [[Positional Encoding]] — 为 Transformer 注入顺序信息的位置表示
- [[Context Window]] — 模型单次交互能看到的词元总数，有效长度远小于营销值
- [[Lost in the Middle Problem]] — LLM 对输入中间部分关注度不足的现象
- [[Retrieval-Augmented Generation (RAG)]] — 检索增强生成，只拉取相关信息注入上下文
- [[Scratchpads]] — 智能体长任务中将中间步骤写入外部存储
- [[Long-term Memory for LLMs]] — LLM 跨会话持久化信息
- [[Multi-agent System]] — 将任务分配给多个专业化智能体，各自拥有干净的上下文
- [[LLM Wiki Pattern]] — 由 LLM 构建和维护的持久化知识库，知识编译一次后持续更新
- [[KV-Cache]] — 键值缓存对 AI 智能体性能至关重要，直接影响延迟和成本
- [[Agent Loop]] — AI 智能体的标准循环流程，上下文增长与输出失衡
- [[State Machine for Agents]] — 用状态机管理工具可用性，通过词元屏蔽保持上下文稳定
- [[Recitation for Attention Manipulation]] — 通过重复读写（todo.md）将目标保持在上下文末尾，避免迷失在中间
- [[File System as Context]] — 将文件系统视为终极上下文，作为无限、持久的外部内存
- [[Keep Errors in Context]] — 保留错误痕迹让模型自适应更新
- [[Few-Shot Prompting in Agents]] — 少样本提示在 Agent 系统中的陷阱
- [[Stochastic Graduate Descent]] — “随机研究生梯度下降”，Manus 团队对实验式迭代方法的戏称
- [[State Space Model (SSM)]] — 一类可替代 Transformer 的序列建模路线
- [[Neural Turing Machines]] — 将神经网络与外部可读写记忆结合的模型设计
- [[Masking Tool Logits]] — 通过屏蔽工具相关词元来约束动作选择
- [[Intent-based Outcome Specification]] — 用户描述结果、约束与委派边界，系统负责规划执行
- [[Articulation Barrier]] — 用户难以把真实意图完整表达给 AI 的可用性障碍
- [[Orchestration Surface]] — 意图与执行之间的协商、审计与回执层
- [[Intentional Cognitive Friction]] — 高风险任务中按风险校准的减速与确认机制
- [[Slow AI]] — 面向长时运行智能体任务的交互模式
- [[Intent by Discovery]] — 通过探索潜在方案空间逐步形成意图的长期 UX 模型
- [[Audio Visualization]] — 将音频频率分量映射成动态图形的技术
- [[Sound Wave]] — 描述声音振动随时间变化的波形表示
- [[Frequency and Amplitude in Sound]] — 声音的频率与振幅分别对应音高与响度
- [[Pure Tone]] — 只含单一频率的正弦波声音
- [[Audio Sampling]] — 将连续声音离散化为样本序列
- [[Sampling Rate and Bit Depth]] — 数字音频的两个核心参数
- [[Fourier Transform]] — 将信号从时域转换到频域的方法
- [[Time Domain and Frequency Domain]] — 观察信号的两种视角
- [[FFT and rFFT]] — 傅里叶变换的常用快速算法
- [[Time Smoothing]] — 让频谱动画更平稳的帧间平滑方法
- [[Web Audio API]] — 浏览器中的音频解码与处理接口
- [[Window Function]] — FFT 前常见的样本窗口预处理
- [[Spring Animation]] — 使用弹簧物理模型驱动动画收敛的方式
- [[Hooke's Law]] — 弹簧恢复力与位移成正比的基本定律
- [[Harmonic Oscillator]] — 偏离平衡后受到恢复力的振荡系统
- [[Damping in Spring Animation]] — 让弹簧动画逐渐停下的阻尼机制
- [[Spring Parameters in Framer Motion]] — mass、stiffness、damping 三个核心参数
- [[Liquid Glass Effect]] — 通过折射位移和边缘高光近似实现玻璃 UI 的视觉效果
- [[Refraction]] — 光线跨介质传播时改变方向的现象，也是液态玻璃位移建模的基础
- [[SVG Displacement Map]] — 用图像通道编码像素位移并交给 `<feDisplacementMap />` 执行
- [[Specular Highlight]] — 材质表面的明亮反光区域，帮助玻璃效果建立厚度感

## 实体
- [[ByteByteGo]] — 技术博客，发布了 Context Engineering 指南
- [[Karpathy]] — Andrej Karpathy，提出 context engineering 概念
- [[Chroma]] — AI 公司，2025 年 Context Rot 研究的发布者
- [[Anthropic]] — AI 公司，多智能体研究系统的开发方
- [[Cognition]] — Devin 编码智能体的开发商
- [[Manus]] — AI 智能体项目，被 Meta 收购，提供了上下文工程实战经验
- [[qmd]] — 面向 Markdown wiki 的本地搜索工具
- [[Framer Motion]] — React 动画库，支持弹簧动画
- [[Maxime Heckel]] — 撰写前端动画与交互原理文章的作者
- [[Jakob Nielsen]] — 可用性领域先驱，提出 AI 时代 UX 需要重写评估指标与交互范式

## 源摘要
- [[A Guide to Context Engineering for LLMs]] — ByteByteGo 关于上下文工程的全面指南（2025-12-16）
- [[llm-wiki]] — karpathy 关于 LLM Wiki 模式的原始概念文件（2026-04-04）
- [[Context Engineering for AI Agents Lessons from Building Manus]] — Manus 团队的实战经验（2025-07-18）
- [[音频可视化：采样、频率和傅里叶变换]] — 从声音波形、采样到频谱可视化的实现链路（2021-08-06）
- [[The physics behind spring animations - The Blog of Maxime Heckel]] — 解释弹簧动画背后的物理模型与 Framer Motion 参数（2020-06-23）
- [[Attention Is All You Need]] — 提出 Transformer 架构的经典论文（2017-06-12）
- [[Liquid Glass in the Browser Refraction with CSS and SVG]] — 用折射建模和 SVG 位移贴图近似实现 Liquid Glass（2025-10-04）
- [[Intent by Discovery Designing the AI User Experience]] — Jakob Nielsen 关于 AI UX 范式转移与发现式交互的文章（2026-03-26）

## 分析 / 对比
（暂无，后续 query 中产生的分析将归档于此）
