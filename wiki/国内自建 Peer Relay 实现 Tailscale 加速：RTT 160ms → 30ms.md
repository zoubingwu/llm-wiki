---
type: source
created: 2026-05-20
updated: 2026-05-20
tags:
  - source
  - networking
  - tailscale
  - peer-relay
source_count: 1
---

# 国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms

这篇文章记录一次用 [[Tailscale Peer Relay]] 加速国内 [[Tailnet]] 设备互连的实践：作者把阿里云北京 VPS 加入 [[Tailscale]] 网络，并让它承担 Peer Relay 角色，把两台国内设备之间原本经香港 [[DERP Relay]] 兜底的链路切到北京 UDP 中继。

源文见：[国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms](../articles/%E5%9B%BD%E5%86%85%E8%87%AA%E5%BB%BA%20Peer%20Relay%20%E5%AE%9E%E7%8E%B0%20Tailscale%20%E5%8A%A0%E9%80%9F%EF%BC%9ARTT%20160ms%20%E2%86%92%2030ms.md)。

## 核心贡献

- 给出一个国内 Tailscale 加速场景：两台大陆家宽设备的 [[NAT Traversal]] 部分失败时，连接会落到香港 DERP，RTT 约 160ms。
- 说明 [[Tailscale Peer Relay]] 的部署形态：复用一台已有 Tailscale 节点，开放一个 UDP relay 端口，用原生 [[WireGuard]] UDP 通道转发 Tailnet 内部流量。
- 展示最小配置链路：VPS 安装 Tailscale，ACL 添加 `tag:relay` 与 `tailscale.com/cap/relay` grant，节点使用 `--advertise-tags=tag:relay` 加入 Tailnet，再设置 `tailscale set --relay-server-port=40000`。
- 记录实测结果：`tailscale ping` 从 `relay "hkg"` 切到 `peer-relay 203.0.113.42:40000:vni:1` 后，RTT 降到 29-54ms。

## 运维要点

Peer Relay 的核心依赖是 UDP 可达性和 Tailnet ACL 授权。文章中放行了 UDP 40000 作为 relay 端口，并保留 UDP 41641 作为 tailscaled 默认 NAT 打洞端口。

VPS 加入 Tailnet 时，作者显式设置 `--accept-routes=false` 和 `--accept-dns=false`，让该节点承担 relay 角色，同时保持原有业务服务的路由与 DNS 行为稳定。

## 常见故障

- `tagOwners` 在个人 Free tailnet 中使用明确邮箱最稳定，文章里的 `autogroup:admin` 示例触发了 tag 授权失败。
- ACL 需要先包含 `tagOwners`，再执行 `tailscale up --advertise-tags=tag:relay`。
- `tailscale ping` 末尾的 `direct connection not established` 表示 P2P 打洞路径缺席，前面的 `via peer-relay(...)` 仍然说明中继路径健康。
- VPS 上运行生产服务时，DNS 需要提前固定到稳定上游，避免 tailscaled 与 `systemd-resolved` 的配置切换影响业务域名解析。

## 关联页面

- [[Tailscale]]
- [[Tailscale Peer Relay]]
- [[DERP Relay]]
- [[Tailnet]]
- [[NAT Traversal]]
- [[WireGuard]]
