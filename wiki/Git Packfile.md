---
type: concept
created: 2026-08-20
updated: 2026-08-20
tags:
  - concept
  - git
  - storage
  - compression
source_count: 1
---

# Git Packfile

Packfile 是 Git 存储和网络传输的基础二进制格式。没有稳定且公认的中文译名时应保留 **packfile**：它把 blob、tree、commit 等对象压缩到一起；Git push、fetch 和 clone 也通过网络收发 packfile。

## 为什么难以大规模托管

- Git 对象按内容的 SHA-1 寻址，但有向无环图（directed acyclic graph, DAG）的逻辑遍历顺序，与对象在 packfile 中的物理位置没有对应关系。
- packfile 以减小体积为主要目标。对象可能随机分布，且常以另一个对象为基础保存为增量（delta），读取一个对象会产生额外的物理跳转。
- 这种随机读取在本地 NVMe 上可接受，在网络文件系统上却会把一次 Git 操作放大成大量往返；除非缓存整个文件，否则 NFS 或块级复制很难兼顾性能与规模。
- 服务端即便把对象改存分布式键值存储，Git 网络协议仍要求生成 packfile；对象格式与协议格式之间的转换可能让 clone 性能失去优势。

## 压缩与重打包

每次 push 或 fetch 都可能产生新的 packfile。每个 packfile 有自己的索引；数量过多时，查找对象必须检查多个索引。现代 Git 可用多包索引（multi-pack index）和增量几何压缩（incremental geometric compaction）延缓问题，但最终仍需要重打包（repack）。

[[Spokes]] 的每个副本都可能承担重打包的 CPU 成本；[[Continuity (Cnt)]] 只让主节点压缩，再让副本从 S3 下载压缩后的 packfile，以带宽换 CPU。

## 相关页面

- [[Git at any scale]]
- [[Git Repository Hosting]]
- [[Git Reference Transaction]]
- [[Spokes]]
- [[Continuity (Cnt)]]
