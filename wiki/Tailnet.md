---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - networking
  - tailscale
  - vpn
source_count: 1
---

# Tailnet

Tailnet 是 [[Tailscale]] 中属于同一组织或账号的私有设备网络。一个 Tailnet 内的设备拥有 Tailscale 分配的地址、身份和 [[Tailscale ACL|ACL]] 约束，并通过 direct、[[Tailscale Peer Relay]] 或 [[DERP Relay]] 路径建立加密连接。

## 角色

Tailnet 把分散设备抽象成一个逻辑局域网。设备可以是笔记本、手机、家用服务器、云 VPS、子网路由器或 relay 节点。

[[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 中，Mac mini、MacBook Pro 和阿里云北京 VPS 属于同一个 Tailnet。VPS 通过 `tag:relay` 被授权为 Peer Relay 节点，帮助其他 Tailnet 设备转发流量。

## 关键机制

- 身份与 [[Tailscale ACL|ACL]]：控制哪些设备、用户、tag 可以访问哪些目标。
- 路径选择：优先 direct，必要时进入 relay 路径。
- 节点角色：同一 Tailnet 内的节点可以承担普通客户端、exit node、subnet router 或 peer relay 等角色。

## 关联页面

- [[Tailscale]]
- [[Tailscale Peer Relay]]
- [[DERP Relay]]
- [[NAT Traversal]]
- [[WireGuard]]
- [[Tailscale ACL]]
