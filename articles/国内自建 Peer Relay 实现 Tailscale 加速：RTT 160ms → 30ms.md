---
title: "国内自建 Peer Relay 实现 Tailscale 加速：RTT 160ms → 30ms"
source: "https://5km.studio/blog/tailscale-peer-relay"
author:
  - "十里"
published: 2026-04-23
created: 2026-05-20
description: "两个月前开始用 Tailscale 连家里的机器，虚拟局域网很好用，唯一的痛点是节点都在境外，速度一言难尽。国内大多数文章还在教\"自建 DERP\"，但去年 Tailscale 1.86 推出的 Peer Relay 其实是更轻量的路径——不用证书、不用 HTTPS 反代、不动 iptables。这篇记录一次真实落地，附四个坑。"
tags:
  - "articles"
---
两个月前开始用 Tailscale 连家里的机器，虚拟局域网很好用，唯一的痛点是节点都在境外，速度一言难尽。国内大多数文章还在教"自建 DERP"，但去年 Tailscale 1.86 推出的 Peer Relay 其实是更轻量的路径——不用证书、不用 HTTPS 反代、不动 iptables。这篇记录一次真实落地，附四个坑。

7,465次点击 10分钟阅读

## 速览

- Tailscale 1.86 推出的 **Peer Relay** 允许你在任意自有节点上开一条原生 WireGuard UDP 中继通道，替代传统 DERP 的 HTTPS+WebSocket。
- 把一台阿里云北京 VPS 升级为 Peer Relay 节点后，国内两台 Tailnet 设备之间的 `tailscale ping` RTT 从 **~160ms 直接降到 30ms 左右** ，屏幕共享、SSH、Remote-SSH 全部达到局域网体感。
- 整套配置只需 3 步：装 Tailscale、改 ACL 加 `tag:relay` 、 `tailscale set --relay-server-port=40000` 。 **不用自建 DERP** ，不用 HTTPS 证书，不动 iptables，不影响 VPS 上原有的 Nginx/frps/Docker 服务。

国内关于 Tailscale 的文章绝大多数停留在 **自建 DERP** 的路径上：要弄证书、要改 DNS、要配 `derpmap` 、还得自己维护一套 HTTPS 反代。Peer Relay 出现之后，这一套在"只为了国内两台机器互连加速"的场景下完全没必要了。这篇文章记录一次 15 分钟部署、效果立竿见影的真实落地。

## 背景：连接为什么走了香港 DERP

我的 Tailnet 里两台常用设备：

- **Mac mini** （家宽 A，100.64.1.10）
- **MacBook Pro** （100.64.1.20）

两端都是大陆 IP，都在家宽后面， `tailscale netcheck` 显示 UDP 可用、 `MappingVariesByDestIP: false` ，打洞条件并不差。但现实是连接一直显示：

```
active; relay "hkg"
```

—— 走了 Tailscale 官方在香港的 DERP。单程 RTT 大约 160ms，屏幕共享卡、SSH 敲键盘有明显的"空一下"的感觉。

原因不复杂： **Tailscale 官方 DERP 节点里离中国大陆最近的就是香港** 。两台在国内的设备只要有任意一端的 NAT 打洞失败（或部分失败），就会兜底到 Hong Kong DERP，整条链路绕一圈回来。

过去大家的办法是 **自建 DERP** ：在国内 VPS 上跑 `derper` 、配 HTTPS 证书、改客户端的 `derpmap` 。能用，但成本不低——HTTPS 握手本身就比纯 UDP 慢，而且维护一套 derpmap 很容易忘。

## Peer Relay 是什么

2025 年 10 月发布的 Tailscale 1.86 引入了 **Peer Relay** 能力（ [官方公告](https://tailscale.com/blog/peer-relays) ）。简单讲：

重点是：Peer Relay 是对 **现有节点能力的升级** ，不是一个独立的"中继服务器"。我的阿里云北京 VPS 上本来就跑着 frps、Caddy、一堆 Docker 容器，给它多开一个 UDP 端口做 Peer Relay 完全零影响。

## 环境与目标

- **新角色** ：阿里云北京 VPS（ `203.0.113.42`, Ubuntu 22.04, 1.7G 内存），本来跑 frps、Caddy、Docker 服务。
- **目标** ：Mac mini ↔ MacBook Pro 从 `relay hkg` 切到 `peer-relay aliyun-beijing` ，让 RTT 降到 50ms 以内。
- **不改** ：原有 frps `:7000/:221` 、Caddy `:80/:443` 、Docker 服务一律保留。

Peer Relay 最低版本要求是 Tailscale 1.86；Mac mini 上是 1.96.5，阿里云 apt 装的是 1.96.4，都满足。

## 部署步骤

### Step 1：放行 UDP 端口

Peer Relay 要求 VPS 的 UDP 端口对外可达。我用到两个端口：

- **UDP 40000** —— Peer Relay 中继端口（自选，范围任意）
- **UDP 41641** —— Tailscale daemon 默认 NAT 打洞端口

阿里云经典网络的安全组默认就放行所有 UDP（不同网络形态请按你的情况设置），VPC 用户记得在安全组里加入方向规则，源 `0.0.0.0/0` 。宿主机如果启用 `ufw` ，也要 `ufw allow 40000/udp && ufw allow 41641/udp` 。

### Step 2：在 VPS 上装 Tailscale

```sh
curl -fsSL https://tailscale.com/install.sh | sh
tailscale version    # 确认 >= 1.86
systemctl is-active tailscaled
```

Ubuntu 源里的包会自动配置 systemd unit `tailscaled.service` ，开箱即用。

### Step 3：写 ACL，加 tag:relay

打开 `https://login.tailscale.com/admin/acls` ，在 JSON editor 中合并以下两段（保留你原有的其他配置）：

```json
{
    "tagOwners": {
        "tag:relay": ["your-email@example.com"]
    },
    "grants": [
        {"src": ["*"], "dst": ["*"], "ip": ["*"]},
        {
            "src": ["*"],
            "dst": ["tag:relay"],
            "app": {
                "tailscale.com/cap/relay": [{}]
            }
        }
    ]
}
```

几个关键点：

1. **`tagOwners` 必须显式列出邮箱** 。我第一次写成 `["autogroup:admin"]` ，在 Free tailnet 上被拒，提示 `requested tags [tag:relay] are invalid or not permitted` 。改成邮箱就好了。
2. **`grants` 中新增的 `tailscale.com/cap/relay` 授权** 是 Peer Relay 的必要条件——没有它即便节点开了端口，其他节点也不会把它当 Relay 用。
3. 原有 `"grants": [{"src": ["*"], "dst": ["*"], "ip": ["*"]}]` 的 allow-all 规则保留即可，不会和新增的 Relay grant 冲突。

保存后控制面立即生效，不需要重启任何客户端。

### Step 4：VPS 加入 Tailnet 并声明 tag

```sh
tailscale up \
    --hostname=aliyun-beijing \
    --accept-routes=false \
    --accept-dns=false \
    --advertise-tags=tag:relay
```

参数说明：

- `--hostname=aliyun-beijing` —— 给控制面显示一个更有辨识度的名字。
- `--accept-routes=false` —— VPS 只做 Relay，不接受其他节点广播的子网路由，避免它变成转发器。
- `--accept-dns=false` —— **这条非常重要** 。不让 Tailscale 接管 VPS 的 DNS 配置，否则可能影响 Caddy、Docker 容器内的 DNS 解析。
- `--advertise-tags=tag:relay` —— 声明本节点为 Relay 角色，配合 Step 3 的 ACL 生效。

命令会打印一个 `https://login.tailscale.com/a/xxxx` 授权 URL，在浏览器打开登录账号同意即可。

### Step 5：打开 Peer Relay 端口

```sh
tailscale set --relay-server-port=40000
```

一次性设置，tailscaled 重启后自动保留。验证端口确实在监听：

```sh
ss -ulnp | grep 40000
# UNCONN 0 0 0.0.0.0:40000 0.0.0.0:* users:(("tailscaled",...))
```

### Step 6：验证

在 Mac mini 上看连接类型：

```sh
tailscale status
```

预期看到对端设备那一行变成：

```
100.64.1.20  macbook-pro  active; peer-relay 203.0.113.42:40000:vni:1, tx 6588 rx 6292
```

`peer-relay ...:40000:vni:1` 就是 Peer Relay 生效的标志。再测一次延迟：

```sh
tailscale ping --c=5 100.64.1.20
```

我这边的实测：

```
pong from macbook-pro via peer-relay(203.0.113.42:40000:vni:1) in 54ms
pong from macbook-pro via peer-relay(203.0.113.42:40000:vni:1) in 29ms
pong from macbook-pro via peer-relay(203.0.113.42:40000:vni:1) in 30ms
pong from macbook-pro via peer-relay(203.0.113.42:40000:vni:1) in 36ms
pong from macbook-pro via peer-relay(203.0.113.42:40000:vni:1) in 29ms
```

**从 ~160ms 降到 29-54ms** ，比预期（80-120ms）还好不少。

## 部署前后对比

部署完成后我直接连 Mac mini 的屏幕共享，鼠标和窗口的响应和在家里内网直连几乎没差别。

## 四个坑

### 坑 1：autogroup:admin 在 Free tailnet 里不一定好使

按官方示例写 `"tagOwners": {"tag:relay": ["autogroup:admin"]}` ，在个人 Free 账号上授权时会吃到：

```
Authorization failed: requested tags [tag:relay] are invalid or not permitted
```

最稳妥的办法就是直接写邮箱： `["your-email@example.com"]` 。

### 坑 2：顺序坑 —— ACL 没写好就 tailscale up --advertise-tags

如果 ACL 还没加 `tagOwners` 就跑 `tailscale up --advertise-tags=tag:relay` ，授权会被直接拒。正确顺序： **先改 ACL、再 `tailscale up`** 。如果已经登录失败，改完 ACL 后重新执行同一条 `tailscale up` 即可，不用 logout。

### 坑 3：direct connection not established 的警告不是错

`tailscale ping` 结尾偶尔会打印：

```
2026/04/15 00:40:40 direct connection not established
```

这只是告诉你"P2P 打洞没成功，走的是 Relay 兜底"。只要前面每一行 pong 都显示 `via peer-relay(...)` ，说明中继通路是健康的。等哪次打洞真的成功了，你会看到 `via direct` —— 那是最优路径，延迟会再降一档。

### 坑 4：tailscaled 接管 DNS 会让国内域名解析抖动

即使 Step 4 带上了 `--accept-dns=false` ， `tailscaled` 启动时仍可能托管 `/etc/resolv.conf` ，把上游 DNS 改到 MagicDNS 内部地址（ `100.100.2.136` / `100.100.2.138` ）。这两个地址在国内链路并不稳定， `systemd-resolved` 会反复降级切换，调用国内域名的服务就开始偶发 `i/o timeout` 、 `lookup xxx: no such host` 。

三个措施同时上：

1. `/etc/systemd/resolved.conf` 写 `DNS=223.5.5.5 119.29.29.29` ，给系统一个稳定兜底。
2. `ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf` ，切回 stub 模式，不让 tailscaled 再覆盖。
3. 保留 `--accept-dns=false` 。

VPS 上已经跑着业务的话，装 Tailscale **之前** 就把这一层定好，别等业务报错才回头排查。

## Peer Relay 不是什么

以下是常见误解：

- **不是 Exit Node** ：开了 Peer Relay 之后你的其他 Tailnet 设备不会自动从这台 VPS 出网。它只是在 Tailnet 设备之间做中继。想要流量从这台 VPS 出去，需要另外再 `--advertise-exit-node` 。
- **不是 Subnet Router** ：同上，不做子网路由。
- **不占带宽太吓人** ：国内两台设备互发 1Gbps 的话理论上 Relay 也要过 1Gbps，但日常使用的 SSH/屏幕共享/scp 小文件场景，一个月往往不过几个 GB，对 VPS 流量包的压力可以忽略。
- **不冲突现有服务** ：Peer Relay 用 UDP，frps/Nginx/Caddy 用 TCP 的 `:80/:443/:7000` 等，协议+端口都不一样。Tailscale 也不会改写系统路由表。

## 回滚

如果出问题要全身而退：

```sh
tailscale down
tailscale logout
apt remove tailscale
```

`/var/lib/tailscale` 留下一点状态文件，手动 `rm -rf` 即可。宿主机的 Nginx/frps/Docker 完全不受影响。

## 总结

Peer Relay 真正改变了 **想给国内 Tailnet 加速** 这个场景的部署成本：

- 从"装 derper + 申请证书 + 维护 derpmap + 改客户端"变成"装 Tailscale + 改 ACL 加一个 grant + 一条 `tailscale set` 命令"。
- 从"HTTPS+WebSocket 的 TCP 中继"变成"原生 WireGuard UDP"。
- 从"多一个需要维护的 Go 服务"变成"复用已有 tailscaled"。

如果你也有一台 **国内 VPS** 和 **两台以上在国内的 Tailnet 设备** ，强烈建议升级到最新版之后直接用 Peer Relay，而不是继续折腾自建 DERP。15 分钟的事，收益是"让远程访问体感和局域网一致"。