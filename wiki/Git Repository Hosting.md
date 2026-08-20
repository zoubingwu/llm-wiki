---
type: overview
created: 2026-08-20
updated: 2026-08-20
tags:
  - overview
  - git
  - distributed-systems
  - storage
source_count: 1
---

# Git Repository Hosting

Git 存储库托管（Git repository hosting）把为单机和分布式开发设计的 Git，改造成集中式、高可用、可水平扩展的服务。难点不在于给磁盘仓库加一个 HTTP 服务，而在于同时满足 Git 客户端协议、[[Git Packfile|packfile]] 随机访问、本地磁盘性能、推送持久性和读后写一致性。

## 三条扩展路线

[[Git at any scale]] 将历史方案归纳为三类，复杂度依次增加：

1. **分发文件系统**：NFS、GFS、DRBD 等方案试图不改应用，只复制文件或磁盘块；但 Git 对锁、同步和随机读取的本地文件系统假设，加上 packfile 内无序、delta 链式访问，使网络往返成本过高。
2. **分发 packfile**：[[Spokes]] 保留本地 NVMe 上的普通 Git 仓库，把 packfile 扇出到副本，再以三阶段提交（three-phase commit, 3PC）同步较小的[[Git Reference Transaction|引用事务]]。它提供强一致性，但副本数越多，推送越受最慢节点约束。
3. **分发 Git 对象或操作**：把 SHA-1 对象映射到分布式键值存储看似自然，但遍历 Git 有向无环图（directed acyclic graph, DAG）需要顺序网络往返；而 Git 网络协议仍要求生成和传输 packfile，服务端对象存储不能消除转换成本。

## 设计约束

- **本地普通 Git 仓库仍有价值**：它能直接复用上游 Git 的协议实现、压缩和性能优化，避免维护私有 Git 分支或存储格式。
- **最终一致性通常不够**：push 后立即 fetch 读不到提交，或部分 CI runner 克隆不到目标提交，会破坏工具行为和用户预期。
- **复制与压缩相互影响**：每次 push/fetch 都可能增加 packfile；文件越多，索引查询与重打包（repack）成本越高。复制系统必须决定是在每个副本重复压缩，还是复制压缩结果。
- **副本下限和上限都重要**：大型 monorepo 需要很多读副本，agent 创建的海量低流量小仓库则可能不值得常驻多个副本。

## Spokes 与 Continuity

[[Spokes]] 把磁盘仓库副本当作事实来源，以共识保持副本同步；[[Continuity (Cnt)]] 则把 S3 中的预写日志（write-ahead log, WAL）当作事实来源，让本地仓库退化为可重建热缓存。后者用对象存储持久化和条件读取守住一致性，并让只读吞吐量随副本数线性增长，同时避免增加副本拖慢推送。

## 相关页面

- [[Git Packfile]]
- [[Git Reference Transaction]]
- [[Spokes]]
- [[Continuity (Cnt)]]
- [[Origin]]
- [[GitHub]]
