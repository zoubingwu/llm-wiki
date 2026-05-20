---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - networking
  - nat
  - vpn
source_count: 1
---

# NAT Traversal

NAT Traversal 是让位于 NAT 或防火墙后的设备建立点对点连接的一组技术。它的目标是发现双方可达地址与端口，并尽量让加密数据直接在两端之间传输。

## 在 Tailscale 中的位置

[[Tailscale]] 使用 NAT Traversal 尝试为 Tailnet 设备建立 direct [[WireGuard]] 通道。direct 路径可用时，延迟和带宽效率通常最好。direct 路径缺席时，Tailscale 会使用 [[DERP Relay]] 或 [[Tailscale Peer Relay]] 转发流量。

[[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 的案例中，两台国内家宽设备虽然 UDP 可用，但实际连接仍落到香港 DERP。Peer Relay 的价值在于给这类部分失败的路径提供一个更近的中继位置。

## 运维判断

排查 Tailscale 路径时，`tailscale netcheck` 可以观察 UDP 可用性和 NAT 特征，`tailscale status` 与 `tailscale ping` 可以确认当前路径是 direct、DERP relay 还是 peer relay。

## 关联页面

- [[Tailscale]]
- [[Tailnet]]
- [[Tailscale Peer Relay]]
- [[DERP Relay]]
- [[WireGuard]]
