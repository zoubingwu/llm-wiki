---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - networking
  - vpn
  - wireguard
source_count: 1
---

# WireGuard

WireGuard 是一个现代 VPN 协议与实现，强调小型代码库、清晰密码学设计和基于 UDP 的加密隧道。[[Tailscale]] 使用 WireGuard 作为数据面基础，再在其上提供身份、控制面、ACL、设备发现和路径选择。

## 与 Tailscale 的关系

Tailscale 把 WireGuard 的点对点加密通道包装成更易运维的 Tailnet。用户通常管理 Tailscale 设备、tag、ACL 和路由角色，而 WireGuard 密钥分发与 peer 配置由 Tailscale 控制面自动处理。

在 [[Tailscale Peer Relay]] 中，relay 节点仍然服务于 Tailnet 内的加密流量转发。[[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 强调 Peer Relay 使用原生 WireGuard UDP 通道，相比 HTTPS/WebSocket 中继减少了额外协议层。

## 关联页面

- [[Tailscale]]
- [[Tailnet]]
- [[Tailscale Peer Relay]]
- [[NAT Traversal]]
