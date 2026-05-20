---
type: entity
created: 2026-05-20
updated: 2026-05-20
tags:
  - password-manager
  - self-hosting
  - open-source
source_count: 1
---

# Vaultwarden

Vaultwarden 是一个实现 Bitwarden server API 的自托管密码管理服务端。它让用户可以在自己的基础设施上运行密码库，同时继续使用兼容的 Bitwarden 客户端。

## 依赖条件

[[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]] 指出，Vaultwarden 的长期可用性依赖三件事：

- [[Bitwarden]] 客户端继续开源。
- Bitwarden server API 继续保持公开且可实现。
- 官方客户端继续允许连接第三方服务器。

## 风险面

Vaultwarden 的主要风险来自 [[API Compatibility Drift]]。Bitwarden 可以持续演进官方服务端和客户端之间的协议，让第三方实现逐渐落后。这个过程可以表现为兼容性自然衰退，用户感知到的是功能缺失、同步异常或客户端限制。

企业自托管收入是一个现实约束。Bitwarden 向企业销售官方自托管服务端，这让“支持自托管”本身具有商业价值；Vaultwarden 则处在一个被社区使用、商业上未被正式背书的位置。

## 安全网

文章认为 [[Open Source Fork Safety]] 来自 Bitwarden 客户端的 Apache 2.0 许可证、Web vault 的浏览器可用性，以及社区在客户端闭源或限制第三方服务端时发起分叉的能力。

## 来源

- [[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]]
