---
type: source
created: 2026-05-20
updated: 2026-05-20
tags:
  - source
  - bitwarden
  - open-source
  - self-hosting
source_count: 1
---

# The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes

这篇文章记录 [[Bitwarden]] 在 2026 年前后的几组静默变化：Premium 涨价、CEO 更替、网站承诺文案变化、GRIT 价值观改写，以及这些信号对 [[Vaultwarden]] 和自托管用户的含义。

作者 [[PPB1701]] 的核心判断是：开源产品的信任关系通常通过小幅、分层、低公告度的变化被重新协商，而这些变化会逐渐改变用户对产品、公司和自托管路径的风险判断。

![[Image.png|Bitwarden “Always free” 回归价格表的 Mastodon 线索截图]]

## 关键信号

- 2026 年 3 月，Bitwarden 将 Premium 价格翻倍，并把价格变化放在功能公告里说明。
- 2026 年 2 月，长期 CEO Michael Crandell 转为顾问角色，Michael Sullivan 接任 CEO；文章强调 Sullivan 的履历集中在并购（M&A）、私募股权（Private Equity）整合和退出。
- 2026 年 4 月，CFO Stephen Morrison 离职，前 InVision CEO Michael Shenkman 接任。
- 个人密码管理页面上的 “Always free” 文案曾经消失，文章传播后又重新出现在价格表中。
- Bitwarden 的 GRIT 价值观从 Gratitude、Responsibility、Inclusion、Transparency 改为 Gratitude、Responsibility、Innovation、Trust；旧博客正文和解释段落一度出现互相矛盾的状态。

## 对 Vaultwarden 的风险模型

[[Vaultwarden]] 当前可用，依赖三个条件：Bitwarden 客户端继续开源，服务器 API 保持可实现，官方客户端继续允许连接第三方服务器。

文章把主要风险定位在 [[API Compatibility Drift]]：Bitwarden 可以通过持续演进官方 API，让第三方服务器逐渐落后，最终让兼容性自然破裂。这个风险受到企业自托管收入约束，因为自托管仍是 Bitwarden 面向企业客户销售的功能。

## 可复用知识

- [[Open Source Trust Erosion]]：从公开承诺、价格、领导层和价值观文本的细微变化里观察开源产品信任关系如何变化。
- [[Self-hosted Password Management]]：用户通过自托管密码库降低云服务条款变化带来的平台风险。
- [[Open Source Fork Safety]]：Apache 2.0 客户端许可证、Web vault 和社区分叉能力，为客户端闭源或服务端限制提供后备路径。
- [[Open Source Software]]：开源的价值从代码可见性扩展到治理透明度、承诺稳定性和用户可迁移性。

## 来源

- Source article: `articles/The Quiet Renovation at Bitwarden - ByteHaven - Where I ramble about bytes.md`
