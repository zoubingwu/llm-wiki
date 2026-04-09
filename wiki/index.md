# Wiki Index

## 概念 Pages
- [[Overview]] — 当前知识库总览，串联上下文工程与 LLM Wiki 模式
- [[Context Engineering]] — 设计和管理 LLM 上下文窗口的四种策略（Write、Select、Compress、Isolate）
- [[Context Rot]] — 输入长度增加导致 LLM 性能断崖式下降
- [[Attention Mechanism]] — 注意力机制的工作原理、计算代价和注意力分配不均
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

## 实体
- [[ByteByteGo]] — 技术博客，发布了 Context Engineering 指南
- [[Karpathy]] — Andrej Karpathy，提出 context engineering 概念
- [[Chroma]] — AI 公司，2025 年 Context Rot 研究的发布者
- [[Anthropic]] — AI 公司，多智能体研究系统的开发方
- [[Cognition]] — Devin 编码智能体的开发商
- [[Manus]] — AI 智能体项目，被 Meta 收购，提供了上下文工程实战经验
- [[qmd]] — 面向 Markdown wiki 的本地搜索工具

## 源摘要
- [[A Guide to Context Engineering for LLMs]] — ByteByteGo 关于上下文工程的全面指南（2025-12-16）
- [[llm-wiki]] — karpathy 关于 LLM Wiki 模式的原始概念文件（2026-04-04）
- [[Context Engineering for AI Agents Lessons from Building Manus]] — Manus 团队的实战经验（2025-07-18）
- [[音频可视化：采样、频率和傅里叶变换]] — 从声音波形、采样到频谱可视化的实现链路（2021-08-06）

## 分析 / 对比
（暂无，后续 query 中产生的分析将归档于此）
