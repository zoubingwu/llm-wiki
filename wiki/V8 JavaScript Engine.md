---
type: entity
created: 2026-06-21
updated: 2026-06-21
tags:
  - javascript
  - browser
  - runtime
source_count: 1
---

# V8 JavaScript Engine

V8 JavaScript Engine 是 [[Chromium]] 中执行 JavaScript 和 WebAssembly 的引擎。它和 [[Blink]] 通过 bindings 协作：V8 负责语言运行时，DOM、fetch、alert、事件等 Web API 由浏览器实现并暴露给 JavaScript。

## 执行管线

[[How modern browsers work]] 将 V8 的现代执行流程拆成几层：

- 后台解析与编译：V8 可以在后台线程上解析和编译脚本，减少主线程上等待编译的时间。
- parser / preparser：先验证语法并跳过函数体，函数首次执行时再完成 full parse 和编译。
- Ignition：把 JavaScript 编译成紧凑 bytecode 并通过解释器快速启动执行。
- Sparkplug：基线 JIT，把 bytecode 快速转成机器码。
- Maglev：中层优化 JIT，使用类型反馈生成更快代码。
- TurboFan / Turboshaft：高阶优化编译器，服务热函数和循环。

## 类型反馈与去优化

JavaScript 的动态类型让 V8 依赖 inline cache 和 type feedback 建立优化假设。当调用模式变化时，V8 会执行 deoptimization，回到较低层级或按新假设重新优化。

## 内存管理

V8 的 Orinoco GC 是分代、增量、并发和并行的垃圾回收系统。Young generation 处理短生命周期对象，old generation 处理长期存活对象。增量与并发回收减少长暂停，DevTools Memory panel 可以观察 heap 和保留对象。

## 关联页面

- [[Modern Browser Architecture]]
- [[Browser Rendering Pipeline]]
- [[JavaScript Module Loading]]
- [[Chromium]]
- [[Blink]]
- [[Electron]]
