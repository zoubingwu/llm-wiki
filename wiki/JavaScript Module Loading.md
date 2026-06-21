---
type: concept
created: 2026-06-21
updated: 2026-06-21
tags:
  - javascript
  - browser
  - modules
source_count: 1
---

# JavaScript Module Loading

JavaScript 模块加载（JavaScript Module Loading）是浏览器处理 ES modules 的机制。它把 `script type="module"`、static import、dynamic import、module map 和 import maps 组合成一套异步依赖图加载系统。

## 静态模块图

浏览器遇到 `script type="module"` 后，会把入口文件作为 module entry point 获取并解析。解析阶段收集 `import` 语句，递归获取依赖模块，构建 module dependency graph。

模块脚本天然 defer。浏览器会在依赖图获取和解析完成后，按依赖顺序执行模块顶层代码。一个模块记录执行后会进入 module map，后续 import 复用同一个 module record。

## Dynamic import

`import()` 让代码在运行时按需加载模块，返回解析为 module namespace object 的 Promise。浏览器负责获取模块与依赖，[[V8 JavaScript Engine]] 负责编译和执行。

这个机制让应用可以按用户操作、路由或功能边界做代码拆分。

## Import maps

Import maps 是浏览器端模块解析配置。它通过 `script type="importmap"` 或 HTTP header 把裸 specifier 映射成真实 URL，例如把 `"react"` 映射到 CDN 或本地路径。

自 2023 年起，import maps 已进入主要浏览器支持范围。它让轻量应用和本地开发可以直接使用浏览器模块系统，生产环境仍会根据请求数量、缓存策略和部署约束决定是否打包。

## 关联页面

- [[Modern Browser Architecture]]
- [[Browser Networking and Resource Loading]]
- [[V8 JavaScript Engine]]
- [[Chromium]]
