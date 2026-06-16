---
type: overview
created: 2026-06-16
updated: 2026-06-16
tags:
  - design
  - ui
  - vocabulary
source_count: 1
---

# Interface Design Vocabulary

界面设计词汇（Interface Design Vocabulary）是一套用于命名界面质量问题的共享语言。它把视觉、交互、内容、可访问性和度量中的细节转成可以讨论、评审和交付的术语。

## 为什么重要

界面质量经常败在模糊反馈上，例如“更高级一点”“更顺一点”“这里怪怪的”。准确词汇能把问题定位到具体层面：

- [[UI Typography]] 解释文字为什么难读、层级为什么弱、数字为什么跳动
- [[UI Color Systems]] 解释颜色为什么刺眼、暗色模式为什么失衡、token 为什么失效
- [[UI Iconography]] 解释图标为什么不稳、状态为什么难学、隐喻为什么失准
- [[UI Layout]] 解释内容为什么拥挤、响应式为什么破、层叠为什么乱
- [[UI Motion]] 解释动效为什么拖、反馈为什么弱、过渡为什么令人迷失
- [[Accessibility in UI Design]] 解释键盘、屏幕阅读器、焦点和颜色状态的可用性问题
- [[Information Architecture]] 解释导航、标签、层级和查找路径
- [[UI Copywriting]] 解释按钮、错误、帮助、成功和破坏性操作里的文字质量
- [[Design Systems]] 解释 token、变量、组件、视觉语言和交付边界
- [[Design Analytics]] 解释设计决策如何通过行为数据观察
- [[UI Components]] 解释按钮、输入、浮层、导航、反馈和数据展示的基础组件语义

## 使用场景

### 设计评审

术语让评审从主观偏好转向具体问题。例如可以直接讨论 tracking、line length、contrast ratio、focus trap、error state 或 truncation strategy。

### 工程交付

术语把设计意图转成实现对象：semantic token、tabular nums、aspect-ratio、safe area、DOM order、label association、transition property 等都能直接落到代码或组件规范里。

### 设计系统维护

当组件库、Figma 文件和代码库共享同一套词汇，设计系统（Design System）里的 token、组件状态、文案规则和可访问性规则更容易保持一致。

## 来源

- [[Say precisely what you mean.]]
