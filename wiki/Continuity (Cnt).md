---
type: concept
created: 2026-08-19
updated: 2026-08-20
tags:
  - concept
  - git
  - distributed-systems
  - cursor
  - wal
source_count: 1
---

# Continuity (Cnt)

Continuity（简称 Cnt）是 [[Cursor]] 开发的 Git 存储系统：采用 **WAL-first 设计**，把 S3 兼容对象存储当作唯一事实来源（source of truth），本地 NVMe 上的普通 Git 存储库只是可随时物化的热缓存。它保留 [[Spokes]] 的本地真实 Git 仓库与上游工具兼容性，同时规避 3PC 协调和固定三副本带来的扩展限制。

## 核心机制

- **预写日志（write-ahead log, WAL）**：每次推送作为一条独立 WAL 对象存进 S3。**推送在完整持久化之前绝不确认**；只有[[Git Reference Transaction|引用事务]]在本地副本上成功准备，并在 WAL 索引文件中写入该记录的指针后，推送才可见。索引更新通过原子 CAS 序列化，使 push 线性化（linearizable）。
- **本地即缓存**：服务节点无需持久化仓库放置状态，也不依赖外部关系数据库。仓库不在本地时从 WAL 物化（materialize）；空闲副本会被垃圾回收，下次 fetch 再从 WAL 重建。
- **路由与主节点**：用**会合哈希（rendezvous hashing）**把仓库 ID 映射到节点列表；任何服务器都可当主节点，WAL 更新由 S3 上的原子 **CAS**（compare-and-swap）操作保证安全；正常情况下取会合哈希排名第一的节点做主以保证效率。
- **复制**：乐观复制（optimistic replication），通过 gossip UDP 包在集群中传播元数据；每个副本记住自己追到的 WAL 索引版本的 **ETag**，读操作对 S3 做条件 GET——304（平均 <10ms，纯元数据操作）表示已最新可直接服务，200 则先补齐进度。
- **压缩（compaction）摊销**：只有主节点 repack（同时作用于磁盘仓库和 WAL），副本不重新打包，只从 S3 下载已压缩好的 [[Git Packfile|packfile]]——用带宽换 CPU，避免 Spokes 多节点并发 repack 导致故障转移。

## 规模数据

- 单仓库、100 个副本的压力测试：只读吞吐线性扩展，推送吞吐无回退。
- 单仓库测试中，S3 Standard 最高约 120 pushes/s；S3 Express One Zone 超过 300 pushes/s（瓶颈已转向本地 Git 压缩速度）。
- monorepo 可铺数百副本扛 CI 流量；agent 创建的海量小仓库单副本即可，甚至零副本（按需物化）。

## 与 Spokes 的对比

| 维度 | Spokes | Continuity |
| --- | --- | --- |
| 事实来源 | 磁盘上的多个仓库副本（需共识） | S3 中的 WAL |
| 推送确认 | 3PC 多数派确认 | S3 持久化 + 本地引用事务 prepare + CAS 发布 WAL 索引 |
| 水平扩展 | 受 3PC 限制，副本越多越慢 | 任意副本数，只读吞吐线性扩展 |
| 运维 | 路由表 + 校验和维护，仓库副本是 pets | 服务节点无放置状态，本地仓库是可重建缓存 |
| 一致性 | 强一致 | push 线性化；读取经 S3 校验后强一致 |

## 相关页面

- [[Git at any scale]] — 来源文章
- [[Git Repository Hosting]] — 大规模 Git 托管架构总览
- [[Git Packfile]] — 存储、复制与压缩的数据单元
- [[Git Reference Transaction]] — push 线性化前的本地准备边界
- [[Spokes]] — 被对比的 GitHub 架构
- [[Cursor]] — Continuity 所属的产品与团队
- [[Origin]] — Continuity 的产品化平台
- [[Cloud Agent Runtime]] — 大量按需创建、闲置后回收仓库的运行场景
- [[Agent Sandbox]] — agent 执行任务时使用临时仓库的隔离环境