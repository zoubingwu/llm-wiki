---
type: source
created: 2026-08-19
updated: 2026-08-20
tags:
  - source
  - git
  - distributed-systems
  - github
  - cursor
source_count: 1
---

# Git at any scale

[[Cursor]] 官方博客文章（作者 [[Vicent Martí]]，2026-08-18），全面讲解了大规模 [[Git Repository Hosting|Git 存储库托管]]的系统设计演化：从 [[GitHub]] 早期的文件系统分发尝试，到 [[Spokes]] 成为行业标准，再到 Cursor 自研的 [[Continuity (Cnt)]] 系统及其产品化平台 [[Origin]]。

源文见：[Git at any scale](../articles/Git%20at%20any%20scale.md)。

## 核心论点

1. **Git 的分布式设计让集中托管变得困难**：服务器仓库没有专用格式，而 [[Git Packfile|packfile]] 的随机读模式让分布式文件系统方案（NFS、GFS、DRBD）全部失败。
2. **三种可选路线**（复杂度递增）：分发文件系统、分发 packfile、分发 Git 本身。对象级分发（Google 的 JGit + DHT）也因 Git 协议要求在网络层传输 packfile 而失败。
3. **[[Spokes]] 是行业标准解法**：应用级复制 + 3PC 协调，2013 年起长期服务大规模 Git 托管，但其水平可扩展性在 2026 年的 monorepo 与海量 agent 小仓库场景下成为瓶颈。
4. **[[Continuity (Cnt)]] 是 Cursor 的替代设计**：WAL-first，S3 对象存储作为唯一事实来源，本地 NVMe 上的普通 Git 仓库只是可随时物化的热缓存；只读吞吐量随副本线性扩展，增加副本不会降低 push 吞吐。

## 关键事实

- Git 对象以 SHA-1 为键，但 DAG 遍历要求顺序的随机访问，无法直接映射到分布式键值存储。
- [[Git Packfile|Packfile]] 是 Git 存储与网络传输的基本单元；每次 push/fetch 都可能产生新 packfile，需要定期 repack（重打包）。
- Spokes 的 push 由 packfile（可并行扇出）与[[Git Reference Transaction|引用事务（reference transaction）]]两部分组成，后者通过 3PC 协调。
- Continuity 的单仓库测试：S3 Standard 下最高约 120 pushes/s，S3 Express One Zone 下超过 300 pushes/s；100 副本压力测试中只读吞吐线性扩展。
- 复制通过 gossip UDP 传播元数据，并用 S3 ETag 条件 GET 校验读取（304 表示最新；平均 <10ms，纯元数据操作）。

## 相关页面

- [[Git Repository Hosting]] — 大规模 Git 托管的方案与约束总览
- [[Git Packfile]] — Git 存储与网络协议的基础格式
- [[Git Reference Transaction]] — push 的可见性发布边界
- [[Spokes]] — 文章对 GitHub 经典复制架构的分析
- [[Continuity (Cnt)]] — Cursor 的 WAL-first Git 存储系统
- [[GitHub]] — Spokes 的开发方与早期架构案例
- [[Cursor]] — Continuity 与 Origin 所属的产品与团队
- [[Origin]] — Continuity 产品化后的 Git 托管平台
- [[Vicent Martí]] — 文章作者