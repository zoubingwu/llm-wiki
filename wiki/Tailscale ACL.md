---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - networking
  - tailscale
  - access-control
source_count: 1
---

# Tailscale ACL

Tailscale ACL 是 [[Tailscale]] 控制面中的访问控制配置，用来描述 [[Tailnet]] 内哪些用户、设备、tag 和服务能力可以访问哪些目标。它同时约束普通网络访问和特定能力授权。

## 在 Peer Relay 中的角色

[[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 的部署链路依赖 ACL 授权：

- `tagOwners` 定义谁可以给节点打上 `tag:relay`。
- relay 节点用 `tailscale up --advertise-tags=tag:relay` 声明角色。
- `grants` 给 `tag:relay` 授权 `tailscale.com/cap/relay`，让该节点可以承担 [[Tailscale Peer Relay]]。

这个配置把 relay 能力绑定到 Tailnet 身份系统中，避免把 UDP relay 端口变成脱离 Tailscale 控制面的开放代理。

## 运维含义

Peer Relay 的网络质量取决于 UDP 可达性、节点位置和带宽，安全边界取决于 Tailscale ACL。排查时需要同时看 ACL 是否允许 relay capability、节点是否成功带 tag 加入 Tailnet，以及 `tailscale ping` 是否显示 `via peer-relay(...)`。

## 关联页面

- [[Tailscale]]
- [[Tailnet]]
- [[Tailscale Peer Relay]]
- [[DERP Relay]]
- [[NAT Traversal]]
