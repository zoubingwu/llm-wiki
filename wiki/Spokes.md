---
type: concept
created: 2026-08-19
updated: 2026-08-20
tags:
  - concept
  - git
  - distributed-systems
  - github
  - consensus
source_count: 1
---

# Spokes

Spokes 是 [[GitHub]] 于 2013 年前后开发的 Git 存储复制架构（应用级复制，application-level replication for Git repositories）。[[Git at any scale]] 称其变体已成为 Git 托管行业的主流方案。核心思路是**不分发 Git 本身、不分发文件系统，而是在 [[Git Packfile|packfile]] 层面复制数据**。

## 三个基本选择

1. 在 **packfile 级别**工作，不改造 Git 本身。
2. 把数据以**真实 Git 存储库**形式存放在本地 NVMe 磁盘上（没有自己的私有格式，直接复用上游 Git 客户端）。
3. 复制 Git 数据但**保持所有副本完全一致**（强一致，而非最终一致）。

其中第 3 点尤为关键：Git 客户端对最终一致性（eventual consistency）极不友好——push 后立即 fetch 读不到、CI runner 克隆后找不到提交都会造成严重问题。因此 Spokes 用极高的复杂度换取严格一致。

## 推送协议：packfile + [[Git Reference Transaction|引用事务（reference transaction）]]

一次 Git push 有两个组成部分：

- **[[Git Packfile|packfile]]**：包含所有被推送的对象（blob / tree / commit），可先并行扇出（fan-out）到所有副本；原子发布由随后的引用事务负责。
- **[[Git Reference Transaction|引用事务（reference transaction）]]**：通过更新一个或多个引用（如分支指针）真正发布改动。Spokes 用 **3PC（三阶段提交，three-phase commit）** 协调这段较小的数据；按来源文章的描述，只有多数节点确认后推送才被接受。

推送的提交在引用更新前不可见（即不可达，unreachable），这使 packfile 的并行分发与引用事务的同步发布成为可能。

## 已知缺陷

- **3PC 的水平可扩展性受限**：每一步延迟受集群中最慢服务器约束，副本越多推送吞吐量越差；每仓库固定 ≥3 副本（没有 quorum 就不能接受推送）。2026 年的场景下，巨大的企业 monorepo 需要更多副本扛 CI 流量，而 agent 生成的海量小仓库又"养不起"3 个闲置副本——下限太高，上限太低。
- **运维困难（pets, not cattle）**：磁盘上的仓库始终是事实来源，需要外部数据库维护巨大的路由表 + 每个仓库的校验和，损坏/丢失检测和修复必须极快。

## 相关页面

- [[Git at any scale]] — 来源文章
- [[Git Repository Hosting]] — 大规模 Git 托管架构总览
- [[Git Packfile]] — 被复制的数据单元
- [[Git Reference Transaction]] — 3PC 协调的可见性边界
- [[GitHub]] — Spokes 的开发方
- [[Continuity (Cnt)]] — Cursor 针对 Spokes 缺陷的 WAL-first 替代设计
- [[Cursor]] — Continuity 所属的产品与团队