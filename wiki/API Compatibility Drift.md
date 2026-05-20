---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - api
  - compatibility
  - open-source
source_count: 1
---

# API Compatibility Drift

API 兼容性漂移（API Compatibility Drift）指上游产品持续演进服务端协议、客户端调用和功能契约后，第三方兼容实现逐渐跟进困难，最终出现功能缺口或互操作性破裂。

在 [[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]] 中，这个风险用于解释 [[Vaultwarden]] 和 [[Bitwarden]] 的关系：Vaultwarden 可以实现当前 Bitwarden server API，但长期兼容性取决于 Bitwarden 是否继续让 API 保持公开、稳定和第三方可实现。

## 漂移方式

- 新客户端功能依赖官方服务端私有行为。
- 同步、登录、附件、组织或企业功能逐步加入难以复制的前提。
- 客户端开始假设官方服务端能力，第三方服务端只能部分兼容。
- 上游协议变化缺少面向第三方实现的稳定承诺。

## 用户影响

API 漂移会把用户从“可以自托管兼容服务”推向“只能使用官方服务端体验完整功能”。在密码管理器场景下，这直接影响 [[Self-hosted Password Management]] 的可持续性。

## 来源

- [[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]]
