---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - networking
  - tailscale
  - peer-relay
source_count: 1
---

# Tailscale Peer Relay

Tailscale Peer Relay 是 [[Tailscale]] 1.86 引入的 Tailnet 内部中继能力。它让一个已有 Tailscale 节点开放 UDP relay 端口，用原生 [[WireGuard]] UDP 通道帮助其他 Tailnet 设备转发流量。

## 解决的问题

[[NAT Traversal]] 成功时，Tailscale 设备之间可以直接通信。打洞路径缺席时，连接会进入 relay 路径。传统兜底路径通常是 [[DERP Relay]]，在国内设备访问境外 DERP 节点时容易产生绕路和高延迟。

[[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 的案例中，作者在北京 VPS 上启用 Peer Relay，把两台国内设备的路径从香港 DERP 切到北京 UDP 中继，RTT 从约 160ms 降到 29-54ms。

## 部署模型

Peer Relay 的部署模型很轻：

- relay 节点先作为普通 Tailscale 设备加入 Tailnet。
- ACL 给 `tag:relay` 授权 `tailscale.com/cap/relay`。
- relay 节点使用 `--advertise-tags=tag:relay` 声明角色。
- `tailscale set --relay-server-port=<udp-port>` 开启 UDP relay 端口。

这个模型复用 tailscaled 进程和 Tailnet 身份系统，适合已经有国内 VPS 的个人或小团队把 relay 节点放在物理上更接近客户端的位置。

## 运维关注点

Peer Relay 的质量取决于 UDP 可达性、relay 节点位置、VPS 出入带宽和 Tailnet ACL。它承载的是 Tailnet 内部设备之间的转发流量，带宽成本会随屏幕共享、文件传输和长期连接增加。

## 关联页面

- [[Tailscale]]
- [[Tailnet]]
- [[DERP Relay]]
- [[NAT Traversal]]
- [[WireGuard]]
