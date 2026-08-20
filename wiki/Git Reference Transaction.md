---
type: concept
created: 2026-08-20
updated: 2026-08-20
tags:
  - concept
  - git
  - transaction
  - consistency
source_count: 1
---

# Git Reference Transaction

Git 引用事务（reference transaction）更新一个或多个引用（ref），例如让分支名指向新提交。一次 push 的对象可以已经写入[[Git Packfile|packfile]]，但在相应引用更新前，新提交仍不可达（unreachable），不会对正常读取可见。

## 事务边界

Git 可以为引用事务执行以下步骤：

1. 获取引用锁；
2. 验证引用的旧值符合预期；
3. 准备更新并保持锁；
4. 收到提交（commit）或中止（abort）命令后结束事务。

引用更新远小于包含实际对象的 packfile，因此分布式 Git 托管系统可以并行传输大块对象数据，只同步这个较小的发布边界。

## 在两种架构中的作用

- [[Spokes]] 先把 packfile 扇出到所有副本，再以三阶段提交（three-phase commit, 3PC）协调各副本上的引用事务；引用提交后，push 才对读取可见。
- [[Continuity (Cnt)]] 先把 push 持久化为 S3 中的预写日志（write-ahead log, WAL）记录，再在一个本地仓库成功准备引用事务，并以原子比较并交换（compare-and-swap, CAS）更新 WAL 索引。这样避免副本共识，同时让 push 线性化（linearizable）。

## 相关页面

- [[Git at any scale]]
- [[Git Repository Hosting]]
- [[Git Packfile]]
- [[Spokes]]
- [[Continuity (Cnt)]]
