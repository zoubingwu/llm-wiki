---
type: concept
created: 2026-04-09
updated: 2026-04-09
tags:
  - 物理
  - 弹簧
  - 数学
source_count: 1
---

# Hooke's Law

胡克定律（Hooke's Law）描述了弹簧受力与位移之间的关系，其经典形式为：

```text
F = -k*x
```

其中：

- `F` 是弹簧施加的力
- `k` 是刚度（stiffness）
- `x` 是相对平衡位置的位移

负号表示这个力总是把系统拉回平衡位置。

## 在弹簧动画中的意义

[[Spring Animation]] 的回弹行为通常直接来自这条定律：位移越大，恢复力越大，物体越倾向于被拉回目标位置。

## 与其他量的关系

结合牛顿第二定律：

```text
F = m*a
```

可以进一步得到系统加速度与位移、质量之间的关系，这也是前端弹簧动画数值模拟的基础。

## 相关概念

- [[Spring Animation]]
- [[Harmonic Oscillator]]
- [[Spring Parameters in Framer Motion]]
