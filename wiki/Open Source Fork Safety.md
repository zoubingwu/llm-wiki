---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - open-source
  - fork
  - licensing
source_count: 1
---

# Open Source Fork Safety

开源分叉安全网（Open Source Fork Safety）指用户和社区在上游产品改变策略时，依靠开源许可证、可构建源码、数据可迁移性和替代客户端，维持继续使用或迁移的能力。

[[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]] 把这个安全网用于 [[Bitwarden]] 和 [[Vaultwarden]]：Bitwarden 客户端使用 Apache 2.0 许可证，社区理论上可以在客户端策略收紧时分叉客户端，并通过重新品牌化避开商标边界。

## 关键条件

- 客户端源码许可证允许修改和再分发。
- 构建流程、依赖和发布资产能被社区复现。
- 用户数据可以导出或继续被自托管服务读取。
- Web 端入口可以在桌面或移动客户端受影响时维持临时可用性。
- 新分叉能处理商标、名称、图标和分发渠道。

## 限制

分叉安全网降低灾难性锁定风险，但它通常会带来体验退化、自动填充延迟恢复、应用商店分发成本和社区维护负担。它更像应急能力，而非日常产品治理的替代品。

## 来源

- [[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]]
