---
type: concept
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - components
source_count: 1
---

# UI Components

界面组件（UI Components）是产品界面的基础构件。每个组件都应有清晰语义、状态、焦点行为、布局规则和可访问性约束。

## 动作组件

Button 是主要动作触发器，需要 default、hover、active、focus、disabled 和 loading 状态。CTA 文案应直接命名动作。同一视图中的 primary action 需要保持唯一主导地位。

## 输入组件

Input、Textarea、Select、Checkbox、Radio Group、Switch、Slider 和 Combobox 都是输入组件。它们需要持久 label、清晰状态、键盘支持和 label association。Switch 暗示即时生效；Radio Group 表示一组互斥选项。

## 浮层组件

Modal / Dialog 会打断当前流程，需要 focus trap 和背景 inert。Sheet、Drawer、Popover、Tooltip 都是浮层变体：Popover 可承载交互内容，Tooltip 只承担短解释。

## 导航组件

Navigation Menu、Sidebar、Breadcrumb、Tabs、Accordion、Stepper、Carousel 和 Pagination 负责移动、分组或分步。Tabs 适合同一空间中的相关视图；Breadcrumb 适合层级深处的返回路径。

## 反馈组件

Toast、Progress、Skeleton、Spinner、Empty State 和 Error State 说明系统状态。Skeleton 能在内容加载前保留形状；Spinner 适合短时动作等待。Empty State 应解释原因并给出第一动作。

## 数据与内容组件

Card、Avatar、Badge、Tag、Data Table、Separator 等组件组织内容和状态。Data Table 中数字应右对齐并使用 tabular nums；Badge 依附于对象，Tag 通常可独立选择或移除。

## 关联页面

- [[Design Systems]]
- [[Accessibility in UI Design]]
- [[UI Copywriting]]
- [[UI Layout]]
- [[Interface Design Vocabulary]]
- [[Say precisely what you mean.]]
