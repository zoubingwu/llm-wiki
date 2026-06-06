---
type: entity
created: 2026-05-20
updated: 2026-05-20
tags:
  - entity
  - networking
  - vpn
  - tailscale
source_count: 1
---

# Tailscale

Tailscale 是基于 [[WireGuard]] 的组网产品，把用户设备组织成一个私有 [[Tailnet]]。它把密钥分发、身份、[[Tailscale ACL|ACL]]、设备发现和路径选择放在控制面，把数据传输尽量保留在设备之间的加密通道中。

## 在当前 wiki 里的相关性

[[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]] 把 Tailscale 作为国内远程访问加速案例：两台国内家宽设备在 [[NAT Traversal]] 失败时落到香港 [[DERP Relay]]，作者通过北京 VPS 上的 [[Tailscale Peer Relay]] 把中继路径拉回国内。

这个案例展示了 Tailscale 路径选择的三个层级：

- direct：设备间直接建立 WireGuard 通道。
- peer-relay：通过自有 Tailnet 节点做 UDP 中继。
- DERP：通过 Tailscale relay 网络做兜底中继。

## 工程边界

Tailscale 的便利性来自控制面集中管理和客户端自动路径选择。运维侧仍需要处理底层网络约束，例如 UDP 端口可达性、云安全组、系统 DNS、[[Tailscale ACL|ACL tag 授权]]和 relay 节点的带宽成本。

## 关联页面

- [[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms]]
- [[Tailscale Peer Relay]]
- [[Tailnet]]
- [[DERP Relay]]
- [[NAT Traversal]]
- [[WireGuard]]
- [[Tailscale ACL]]
