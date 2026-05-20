---
type: concept
created: 2026-05-20
updated: 2026-05-20
tags:
  - self-hosting
  - password-manager
  - open-source
source_count: 1
---

# Self-hosted Password Management

自托管密码管理（Self-hosted Password Management）指用户在自己的服务器或家庭基础设施上运行密码库服务端，把密码数据、同步和备份控制权从云服务商转移到自己管理的环境中。

在 [[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]] 中，作者使用 [[Vaultwarden]] 替代 [[Bitwarden]] 云账户，把自托管作为应对价格、管理层和承诺变化的控制权策略。

## 价值

- 用户掌握密码库数据位置、备份策略和服务生命周期。
- 云服务条款变化、价格变化和收购风险对个人密码库的影响下降。
- 兼容客户端可以保留熟悉的使用体验。

## 风险

- 自托管用户需要维护服务器、备份、安全更新和可用性。
- 第三方服务端依赖上游客户端与 API 的长期兼容。
- 移动端自动填充、浏览器扩展和同步体验可能受上游策略影响。

## 与开源生态的关系

自托管密码管理把 [[Open Source Software]] 的价值从“源码可见”推进到“服务可替换”。当上游产品出现 [[Open Source Trust Erosion]] 时，自托管和 [[Open Source Fork Safety]] 会成为用户评估退出路径的核心依据。

## 来源

- [[The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes]]
