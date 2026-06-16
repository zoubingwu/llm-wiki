---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - motion
source_count: 1
---

# UI Motion

界面动效（UI Motion）通过速度、时长、方向和编排表达状态变化。它的目标是帮助用户理解界面发生了什么，并让反馈具有合适的物理感。

## 缓动与时长

缓动（Easing）定义动画如何加速或减速。ease-out 适合进入屏幕的元素，ease-in 适合离开屏幕的元素，ease-in-out 适合同一平面内的位置迁移。hover 过渡常见时长约 150ms；接近或超过 400ms 的操作反馈会显得迟缓。

## 编排

错峰（Stagger）让列表项以小间隔依次出现，常见间隔约 40ms。编排（Choreography）把多个元素的运动组织成有方向的视觉叙事，避免同时、异速、无关系地移动。

## 反馈

运动作为反馈（Motion as Feedback）包括按钮按压、非法输入 shake、成功 checkmark 等。用户动作后的即时运动能确认系统已经接收并处理了输入。

## 空间关系

共享轴过渡（Shared Axis Transition）让前进、返回和层级跳转具有空间方向。进入与退出不对称（Enter vs Exit Asymmetry）把到达和离开分别建模成不同的速度曲线。

## 性能与可访问性

过渡属性（Transition Property）应优先使用 opacity 和 transform，它们通常能走 GPU compositing。大幅运动需要尊重 reduced motion 偏好，skeleton shimmer 这类持续动画也属于这个范围。

## 关联页面

- [[Spring Animation]]
- [[Damping in Spring Animation]]
- [[Spring Parameters in Framer Motion]]
- [[Interface Design Vocabulary]]
- [[Say precisely what you mean.]]
