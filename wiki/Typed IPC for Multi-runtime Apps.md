---
type: concept
created: 2026-05-15
updated: 2026-05-15
tags:
  - architecture
  - ipc
  - types
source_count: 1
---

# Typed IPC for Multi-runtime Apps

多运行时类型化 IPC（Typed IPC for Multi-runtime Apps）是一种接口治理方式：把跨进程、跨语言或跨运行时通信接口集中声明，再为各端生成 typed clients，让编译器提前发现协议漂移。

## Raycast 2.0 的场景

[[Raycast]] 2.0 同时运行 Swift/C# host app、WebView frontend、Node backend 和 Rust core。它们之间使用平台 message handlers 与 stdio transport 通信。

文章强调接口声明集中在一个地方，并为每一侧生成 typed clients。这让四个运行时之间的调用拥有 compile-time guarantees，降低了手写 IPC 字符串、payload shape 和错误处理分散带来的维护成本。

## 解决的问题

Typed IPC 的核心价值是把“远程调用协议”变成可检查的本地 API：

- 请求和响应结构集中定义。
- 多语言客户端由 schema 生成。
- 接口变更会通过类型检查暴露给调用方。
- native shell、WebView、Node 和 Rust 的边界更清晰。

## 设计取舍

Typed IPC 会引入 schema、codegen 和生成物同步流程。它适合边界稳定、调用频繁、运行时数量多的应用。对于 Raycast 这类四层架构，类型化边界是控制复杂度的关键工程手段。

## 关联页面

- [[A Technical Deep Dive Into the New Raycast]]
- [[Raycast]]
- [[Hybrid Native WebView Architecture]]

