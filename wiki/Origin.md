---
type: entity
created: 2026-08-20
updated: 2026-08-20
tags:
  - entity
  - git
  - hosting
  - cursor
source_count: 1
---

# Origin

Origin 是 [[Cursor]] 在 [[Git at any scale]] 中介绍的 Git 托管平台。其存储底座 [[Continuity (Cnt)]] 以 S3 中的预写日志（write-ahead log, WAL）作为事实来源，把本地 NVMe 上的普通 Git 仓库当作可重建热缓存。

## 产品定位

Cursor 将 Origin 定位为现有版本控制基础设施的迁移出口（off-ramp），目标是提高可靠性、性能和规模，并尽量降低迁移成本。文章披露的系统能力包括：

- push 在确认前持久化并线性化；
- clone、fetch 和仓库上层 RPC 看到完全一致的视图；
- 大型 monorepo 可增加大量读副本，低流量小仓库可缩到一个或零个常驻副本；
- 通过复用普通 Git 仓库和上游工具减少私有格式带来的兼容风险。

这些是 Cursor 官方文章给出的设计目标与测试结果，不等同于独立的生产基准或长期可用性验证。

## 相关页面

- [[Cursor]]
- [[Git at any scale]]
- [[Git Repository Hosting]]
- [[Continuity (Cnt)]]
- [[Spokes]]
