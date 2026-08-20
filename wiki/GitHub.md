---
type: entity
created: 2026-08-20
updated: 2026-08-20
tags:
  - entity
  - git
  - hosting
  - developer-tools
source_count: 1
---

# GitHub

GitHub 是 2008 年创立的集中式 Git 托管与软件协作平台。[[Git at any scale]] 以它的早期基础设施演进说明：Web 应用本身可以通过增加实例扩展，但依赖本地磁盘仓库时，存储的性能、可用性和副本一致性会成为独立瓶颈。

## Git 存储演进

GitHub 先后尝试 NFS、GFS、DRBD 等文件系统或块级复制方案，但 [[Git Packfile|packfile]] 的随机读取和 delta 访问模式让网络文件系统难以兼顾性能与运维。之后，团队让仓库驻留在专用文件服务器上，通过 RPC 远程执行 Git 操作；这提高了整体容量，却仍让单个仓库受限于单机。

约 2013 年，GitHub 开发 [[Spokes]]，在应用层复制普通 Git 仓库，并用 packfile 扇出和引用事务共识保持副本强一致。该架构后来成为大规模 [[Git Repository Hosting|Git 存储库托管]]的重要范式。

## 相关页面

- [[Git at any scale]]
- [[Git Repository Hosting]]
- [[Git Packfile]]
- [[Git Reference Transaction]]
- [[Spokes]]
