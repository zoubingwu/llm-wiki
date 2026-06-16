---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - LLM
  - inference
  - optimization
source_count: 1
---

# Model Quantization

模型量化（Model Quantization）是用更低精度的数字格式存储模型权重的优化技术。现代模型常以 16-bit floating-point 训练，量化会把部分权重压缩到 8-bit 或 4-bit 表示，以减少显存占用和数据移动。

## 对推理阶段的影响

量化同时影响 [[LLM Inference Phases|prefill 和 decode]]：

- prefill 受益于现代 GPU 上更快的低精度数学运算。
- decode 受益于更小的权重体积，因为每次前向传播需要从内存读取的数据更少。

[[A Guide to AI Inference Engineering]] 提到，典型降精度步骤大约能带来 30% 到 50% 的性能提升，具体收益取决于模型和量化方法。

## 质量风险

模型不同部分对量化误差的敏感度不同。线性权重通常更容易量化，activation 更敏感，[[KV-Cache]] 更敏感，attention layers 最敏感。注意力层中的小误差会沿词元序列累积，长响应中可能放大成可见的质量下降。

生产系统通常会保留 attention 的较高精度，再对其他部分做更激进的压缩。

## 相关概念

- [[AI Inference Engineering]]
- [[Attention Mechanism]]
- [[KV-Cache]]
- [[Transformer]]
