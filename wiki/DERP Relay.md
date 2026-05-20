---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - networking
  - tailscale
  - relay
source_count: 1
---

# DERP Relay

DERP Relay 是 [[Tailscale]] 在设备无法建立 direct 路径时使用的兜底中继机制。它通过 Tailscale 的 relay 网络转发 Tailnet 内的加密流量，让连接在复杂 NAT、企业网络或 UDP 受限环境里保持可用。

## 与 Peer Relay 的关系

[[Tailscale Peer Relay]] 让用户把自有 Tailnet 节点升级为中继节点。DERP Relay 由 Tailscale relay 网络提供，Peer Relay 则由用户自己选择节点位置和 UDP 端口。

[[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 的核心判断是：国内两台设备之间的官方 DERP 路径可能绕到香港，放一台国内 VPS 做 Peer Relay 可以显著缩短物理路径。

## 工程含义

DERP 适合作为通用兜底路径，优点是开箱可用和覆盖面广。对延迟敏感、设备集中在同一地区、且有自有 VPS 的场景，Peer Relay 可以成为更贴近客户端的专用 relay 路径。

## 关联页面

- [[Tailscale]]
- [[Tailscale Peer Relay]]
- [[Tailnet]]
- [[NAT Traversal]]
