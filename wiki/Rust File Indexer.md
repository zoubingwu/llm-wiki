---
type: concept
created: 2026-05-15
updated: 2026-05-15
tags:
  - rust
  - search
  - filesystem
source_count: 1
---

# Rust File Indexer

Rust 文件索引器（Rust File Indexer）是把桌面文件搜索从系统元数据服务迁移到自有跨平台索引的一种实现模式：独立进程直接扫描文件系统、构建搜索索引，并通过文件系统事件保持更新。

## Raycast 2.0 的动机

[[Raycast]] v1 的文件搜索依赖 macOS Spotlight metadata。这个方案覆盖 Spotlight 已索引内容，跨平台路径需要新的索引层。Raycast 2.0 因此用 Rust 从零实现文件索引器。

Rust 适合这条路径的原因包括：

- 扫描和索引大量文件需要稳定的后台性能。
- 可预测内存使用能降低对主应用的影响。
- 免受 GC pause 影响，适合长时间运行的系统级后台任务。
- 同一核心逻辑可以服务多个平台和移动端共享数据层。

## Windows NTFS 扫描

Windows 上按常规方式遍历 NTFS 文件系统难以达到 Raycast 需要的全盘扫描速度。Raycast 为此实现了专用 NTFS scanner，直接读取 Master File Table，把整盘扫描时间从分钟级压到秒级。

## 架构位置

Rust file indexer 是 [[Hybrid Native WebView Architecture]] 中 performance core 的代表。它把性能关键、平台敏感、长期运行的工作从 Web frontend 和 Node backend 中分离出来，同时通过 IPC 与主应用协作。

## 关联页面

- [[A Technical Deep Dive Into the New Raycast]]
- [[Raycast]]
- [[Hybrid Native WebView Architecture]]
