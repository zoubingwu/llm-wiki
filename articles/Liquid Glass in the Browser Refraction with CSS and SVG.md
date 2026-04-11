---
title: "Liquid Glass in the Browser: Refraction with CSS and SVG"
source: "https://kube.io/blog/liquid-glass-css-svg/"
author:
  - "[[kube]]"
published: 2025-10-04
created: 2026-04-11
description: "Explore how to recreate Apple's stunning Liquid Glass effect using CSS, SVG Displacement Maps, and refraction calculations."
tags:
  - "articles"
---
2025

SEP

04

[Photo by Martin Martz on Unsplash  
照片由 Martin Martz 拍摄，来自 Unsplash。](https://unsplash.com/photos/a-black-and-pink-abstract-background-with-curves-wRuhOOaG-Z4)

## Introduction 介绍

Apple [introduced the Liquid Glass effect during WWDC 2025](https://www.youtube.com/watch?v=jGztGfRujSE) in June—a stunning UI effect that makes interface elements appear to be made of curved, refractive glass. This article is a hands‑on exploration of how to recreate a similar effect on the web using CSS, SVG displacement maps, and physics-based refraction calculations.  
苹果公司在 [2025 年 6 月的 WWDC 开发者大会上推出了 Liquid Glass 效果](https://www.youtube.com/watch?v=jGztGfRujSE) ——一种令人惊艳的 UI 特效，它能让界面元素看起来像是由弯曲的折射玻璃制成。本文将通过实践操作，探索如何使用 CSS、SVG 位移贴图和基于物理的折射计算，在网页上实现类似的效果。

Instead of chasing pixel‑perfect parity, we’ll approximate Liquid Glass, recreating the core refraction and a specular highlight, as a focused proof‑of‑concept you can extend.  
我们不会追求像素级的完美匹配，而是近似模拟液态玻璃，重现核心折射和镜面高光，作为一个您可以扩展的概念验证。

We'll build up the effect from first principles, starting with how light bends when passing through different materials.  
我们将从基本原理出发，逐步构建这种效应，首先从光线穿过不同材料时的弯曲方式开始。

Chrome‑only demo 仅限 Chrome 浏览器的演示

The interactive demo at the end currently works in Chrome only (due to SVG filters as backdrop‑filter).  
结尾处的交互式演示目前仅在 Chrome 浏览器中有效（因为使用了 SVG 滤镜作为背景滤镜）。

You can still read the article and interact with the inline simulations in other browsers.  
您仍然可以在其他浏览器中阅读文章并与内联模拟进行交互。

## Understanding Refraction 了解折射

**Refraction** is what happens when light changes direction as it passes from one material to another (like from air into glass). This bending occurs because light travels at different speeds through different materials.  
**折射** 是指光从一种介质（例如空气）进入另一种介质（例如玻璃）时改变传播方向的现象。这种弯曲现象的发生是因为光在不同介质中的传播速度不同。

The relationship between the incoming and outgoing light angles is described by [**Snell–Descartes law**](https://en.wikipedia.org/wiki/Snell%27s_law):  
入射光角度和出射光角度之间的关系可以用 [**斯涅尔-笛卡尔定律**](https://en.wikipedia.org/wiki/Snell%27s_law) 来描述：

$n_1 \sin(\theta_1) = n_2 \sin(\theta_2)$

$n_1 = \text{refractive index of first medium}$

$\theta_1 = \text{angle of incidence}$

$n_2 = \text{refractive index of second medium}$

$\theta_2 = \text{angle of refraction}$

<svg viewBox="0 0 400 300"><defs><marker id="ray-arrow-incident" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(180,76%,45%)"></path></marker><marker id="ray-arrow-refracted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(235.68675471715676,76%,45%)"></path></marker></defs><line x1="0" y1="150" x2="400" y2="150" stroke-width="1.5" stroke="#334155"></line><line x1="200" y1="0" x2="200" y2="300" opacity="0.6" stroke-width="1" stroke-dasharray="2" stroke="#334155"></line><path d="M 200 90 A 60 60 0 0 1 255.4327719506772 127.03899405809462" fill="none" stroke-width="1" stroke="#94a3b8"></path><path d="M 200 90 A 60 60 0 0 0 144.5672280493228 127.03899405809462" display="none" fill="none" stroke-width="1" stroke="#94a3b8"></path><text opacity="1" x="241.66776747647017" y="87.6397790773091" dominant-baseline="central" text-anchor="middle" font-size="10" fill="#64748b">θ <tspan baseline-shift="sub" font-size="70%">1</tspan></text> <text opacity="1" x="158.33223252352983" y="87.6397790773091" dominant-baseline="central" text-anchor="middle" font-size="10" display="none" fill="#64748b">θ <tspan baseline-shift="sub" font-size="70%">1</tspan></text> <path d="M 200 210 A 60 60 0 0 1 163.04481869954853 197.2685368405958" fill="none" display="block" stroke-width="1" stroke="#94a3b8"></path><text opacity="1" x="175.57076882918597" y="220.90989116056326" display="block" dominant-baseline="central" text-anchor="middle" font-size="10" fill="#64748b">θ <tspan baseline-shift="sub" font-size="70%">2</tspan></text><line opacity="1" marker-end="undefined" x1="338.58192987669304" y1="92.59748514523653" x2="200" y2="150" stroke="hsl(180,76%,45%)" stroke-width="2"></line><line opacity="1" marker-end="url(#ray-arrow-refracted)" x1="200" y1="150" x2="107.61204674887134" y2="268.1713421014895" stroke="hsl(235.68675471715676,76%,45%)" stroke-width="2"></line><line x1="200" y1="150" x2="61.41807012330699" y2="207.40251485476347" stroke-width="1" stroke-dasharray="2" stroke="#06b6d4"></line></svg>

First Medium 第一媒介

n1 = 1  
n 1 = 1

Second Medium 第二媒介

n2 = 1.5

Normal 法线

0.013

n2 n 2 1.5

In the above interactive diagram, you can see that:  
在上面的交互式示意图中，您可以看到：

- When $n_2 = n_1$, the light ray passes straight through without bending.  
	当 $n_2 = n_1$ 时，光线会笔直穿过，不发生弯曲。
- When $n_2 > n_1$, the ray bends toward the normal (the imaginary line perpendicular to the surface).  
	当 $n_2 > n_1$ 时，光线会向法线（垂直于表面的假想线）弯曲。
- When $n_2 < n_1$, the ray bends away from the normal, and depending on the angle of incidence, it may bend so much that it reflects back into the original medium instead of passing through.  
	当 $n_2 < n_1$ 时，光线会偏离法线；并且根据入射角不同，它可能弯折得如此厉害，以至于不会穿过界面，而是反射回原来的介质中。  
	This is called [Total Internal Reflection](https://en.wikipedia.org/wiki/Total_internal_reflection)  
	这被称为 [全内反射](https://en.wikipedia.org/wiki/Total_internal_reflection)。
- When incident ray is orthogonal to the surface, it passes straight through regardless of refractive indices.  
	当入射光线垂直于表面时，无论折射率如何，光线都会直接穿过。

## Limitations in this project 本项目存在的局限性

To keep things focused we avoid complex branches of behavior by constraining the scenario:  
为了保持讨论的重点，我们通过限制场景来避免复杂的行为分支：

- Ambient medium has $index = 1$ (air).  
	环境介质的折射率设为 $index = 1$（空气）。
- Use materials with $index > 1$, and prefer $1.5$ (glass).  
	使用 $index > 1$ 的材料，并优先选择 $1.5$ （玻璃）。
- Only one refraction event (ignore any later exit / second refraction).  
	仅发生一次折射事件（忽略任何后续的出口/第二次折射）。
- Incident rays are always orthogonal to the background plane (no perspective).  
	入射光线始终与背景平面正交（无透视）。
- Objects are 2D shapes parallel to the background (no perspective).  
	物体是与背景平行的二维形状（无透视）。
- No gap between objects and background plane (only one refraction).  
	物体与背景平面之间没有间隙（只有一次折射）。
- Circle shapes only in this article:  
	本文中仅出现圆形图形：
	Extending to other shapes requires preliminary calculations.  
	将方法推广到其他形状需要进行初步计算。
	Circles let us form rounded rectangles by stretching the middle.  
	圆形可以通过拉伸中间部分来形成圆角矩形。

Under these assumptions every ray we manipulate has a well-defined refracted direction via Snell's Law, and we simplify a lot our calculations.  
在这些假设下，我们操控的每条光线都通过斯涅尔定律具有明确的折射方向，从而简化了我们的许多计算。

## Creating the Glass Surface 创建玻璃表面

To create our glass effect, we need to define the shape of our virtual glass surface. Think of this like describing the cross-section of a lens or curved glass panel.  
为了创建玻璃效果，我们需要定义虚拟玻璃表面的形状。可以把它想象成描述透镜或曲面玻璃面板的横截面。

## Surface Function 表面函数

Our glass surface is described by a mathematical function that defines how thick the glass is at any point from its edge to the end of the bezel. This **surface function** takes a value between $0$ (at the outer edge) and $1$ (end of bezel, start of flat surface) and returns the height of the glass at that point.  
我们的玻璃表面由一个数学函数描述，该函数定义了从玻璃边缘到边框末端任意一点的厚度。这个 **表面函数** 取值范围为 $0$ （外边缘）到 $1$ （边框末端，平面起始处），并返回该点的玻璃高度。

```ts
const height = f(distanceFromSide);
```

From the height we can calculate the angle of incidence, which is the angle between the incoming ray and the normal to the surface at that point. The normal is simply the derivative of the height function at that point, rotated by $-90$ degrees:  
根据高度，我们可以计算入射角，即入射光线与该点表面法线之间的夹角。法线就是该点高度函数的导数，旋转 $-90$ 度：

```ts
const delta = 0.001; // Small value to approximate derivative
const y1 = f(distanceFromSide - delta);
const y2 = f(distanceFromSide + delta);
const derivative = (y2 - y1) / (2 * delta);
const normal = { x: -derivative, y: 1 }; // Derivative, rotated by -90 degrees
```

## Equations 方程式

For this article, we will use four different height functions to demonstrate the effect of the surface shape on the refraction:  
本文将使用四种不同的高度函数来演示表面形状对折射的影响：

Convex Circle 凸圆

 $y = \sqrt{1 - (1 - x) ^ 2}$

Simple circular arc → a spherical dome. Easier than the squircle, but the transition to the flat interior is harsher, producing sharper refraction edges—more noticeable when the shape is stretched away from a true circle.  
简单的圆弧对应球形穹顶。它比 squircle 更容易处理，但向内部平面过渡时更生硬，会产生更锐利的折射边缘；当形状被拉伸得不再接近真圆时，这种边缘会更加明显。

Convex Squircle 凸圆角

 $y = \sqrt[4]{1 - (1 - x) ^ 4}$

Uses the [Squircle](https://en.wikipedia.org/wiki/Squircle) Apple favors: a softer flat→curve transition that keeps refraction gradients smooth even when stretched into rectangles—no harsh interior edges. It also makes the bezel appear optically thinner than its physical size because the flatter outer zones bend light less.  
它采用了苹果偏爱的圆角矩形设计：一种更柔和的平面到曲面过渡，即使拉伸成矩形也能保持折射梯度平滑，避免生硬的内部边缘。此外，由于较平坦的外圈对光线的折射较小，因此边框在视觉上看起来比实际尺寸更薄。

Concave 凹

 $y = 1 - \text{Convex}(x)$

The concave surface is the complement of the convex function, creating a bowl-like depression. This surface causes light rays to diverge outward, displacing them beyond the glass boundaries.  
凹面是凸函数的补面，会形成一种碗状凹陷。这种表面会让光线向外发散，把采样位置推出玻璃边界之外。

Lip 唇缘

$y = \text{mix}(\text{Convex}(x), \text{Concave}(x), \text{Smootherstep}(x))$

Blends convex and concave via [Smootherstep](https://en.wikipedia.org/wiki/Smoothstep): raised rim, shallow center dip.  
通过 [Smootherstep](https://en.wikipedia.org/wiki/Smoothstep) 混合凸面与凹面，得到凸起边缘和浅凹中心的组合轮廓。

We could make the surface function more complex by adding more parameters, but these four already give a good idea of how the surface shape affects the refraction.  
我们可以通过添加更多参数来使表面函数更加复杂，但这四个参数已经很好地说明了表面形状如何影响折射。

## Simulation 模拟

Now let's see these surface functions in action through interactive ray tracing simulations. The following visualization demonstrates how light rays behave differently as they pass through each surface type, helping us understand the practical implications of our mathematical choices.  
现在让我们通过交互式光线追踪模拟来观察这些表面函数的实际应用。以下可视化图展示了光线穿过不同表面类型时的不同行为，帮助我们理解数学选择的实际意义。

<svg viewBox="0 0 540 300" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrow-displacement-vector" viewBox="0 0 4 4" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L4,2 L0,4 Z" fill="hsl(180,76%,45%)"></path></marker></defs><path d="M 70 260 L 70 180 L 71.9047619047619 158.70411450000205 L 73.80952380952381 150.00377952757404 L 75.71428571428571 143.41071864324084 L 77.61904761904762 137.92243422023898 L 79.52380952380952 133.14905190000442 L 81.42857142857143 128.8898748000048 L 83.33333333333333 125.02525832509787 L 85.23809523809524 121.47698477814396 L 87.14285714285714 118.19054956347449 L 89.04761904761905 115.12614717742323 L 90.95238095238095 112.25364097608099 L 92.85714285714286 109.54955425178312 L 94.76190476190476 106.99516991719315 L 96.66666666666666 104.57527667343493 L 98.57142857142857 102.27731137865459 L 100.47619047619048 100.09075442513131 L 102.38095238095238 98.00669238083472 L 104.28571428571428 96.01749453314818 L 106.19047619047619 94.1165690087962 L 108.0952380952381 92.29817574688505 L 110 90.55728090000842 L 111.9047619047619 88.88944195732267 L 113.80952380952381 87.29071601037745 L 115.71428571428571 85.75758570016777 L 117.61904761904762 84.28689884646772 L 119.52380952380952 82.87581878870887 L 121.42857142857142 81.52178320220521 L 123.33333333333333 80.22246968602823 L 125.23809523809524 78.97576681008672 L 127.14285714285714 77.77974960000961 L 129.04761904761904 76.63265865740848 L 130.95238095238096 75.53288227960314 L 132.85714285714286 74.47894107074634 L 134.76190476190476 73.46947463535571 L 136.66666666666669 72.50323002268601 L 138.57142857142856 71.57905165136984 L 140.47619047619048 70.69587249216325 L 142.38095238095238 69.85270632532603 L 144.28571428571428 69.04864092029943 L 146.1904761904762 68.282832010551 L 148.0952380952381 67.5544979569871 L 150 66.86291501015239 L 151.90476190476193 66.20741309528498 L 153.8095238095238 65.58737205576224 L 155.71428571428572 65.00221830001081 L 157.61904761904762 64.45142180492876 L 159.52380952380952 63.934493435564775 L 161.42857142857142 63.45098254645063 L 163.33333333333331 63.00047483477171 L 165.23809523809524 62.58259041963855 L 167.14285714285714 62.196982125209686 L 169.04761904761904 61.84333394841278 L 170.95238095238096 61.521359694598196 L 172.85714285714283 61.23080176670556 L 174.76190476190476 60.971430095481956 L 176.66666666666666 60.74304120001122 L 178.57142857142856 60.54545736933217 L 180.47619047619048 60.37852595727557 L 182.38095238095238 60.24211878386172 L 184.28571428571428 60.13613163769697 L 186.1904761904762 60.060483874810174 L 188.09523809523807 60.015118110296214 L 190 60 L 350 60 L 350 60 L 351.9047619047619 60.015118110296214 L 353.8095238095238 60.060483874810174 L 355.7142857142857 60.13613163769697 L 357.6190476190476 60.24211878386172 L 359.5238095238095 60.37852595727557 L 361.42857142857144 60.54545736933217 L 363.33333333333337 60.74304120001122 L 365.23809523809524 60.971430095481956 L 367.1428571428571 61.23080176670556 L 369.04761904761904 61.521359694598196 L 370.95238095238096 61.84333394841278 L 372.8571428571429 62.196982125209686 L 374.76190476190476 62.58259041963855 L 376.6666666666667 63.00047483477171 L 378.57142857142856 63.45098254645063 L 380.4761904761905 63.934493435564775 L 382.3809523809524 64.45142180492876 L 384.2857142857143 65.00221830001081 L 386.1904761904762 65.58737205576224 L 388.0952380952381 66.20741309528498 L 390 66.86291501015239 L 391.9047619047619 67.5544979569871 L 393.8095238095238 68.282832010551 L 395.7142857142857 69.04864092029943 L 397.6190476190476 69.85270632532601 L 399.5238095238095 70.69587249216325 L 401.42857142857144 71.57905165136984 L 403.3333333333333 72.50323002268601 L 405.23809523809524 73.46947463535571 L 407.1428571428571 74.47894107074634 L 409.04761904761904 75.53288227960314 L 410.95238095238096 76.63265865740848 L 412.8571428571429 77.77974960000961 L 414.76190476190476 78.9757668100867 L 416.6666666666667 80.22246968602823 L 418.57142857142856 81.52178320220521 L 420.4761904761905 82.87581878870887 L 422.3809523809524 84.28689884646772 L 424.2857142857143 85.75758570016777 L 426.1904761904762 87.29071601037745 L 428.0952380952381 88.88944195732267 L 430 90.55728090000841 L 431.9047619047619 92.29817574688505 L 433.8095238095238 94.1165690087962 L 435.7142857142857 96.01749453314818 L 437.6190476190476 98.00669238083472 L 439.5238095238095 100.09075442513131 L 441.42857142857144 102.27731137865459 L 443.3333333333333 104.57527667343493 L 445.23809523809524 106.99516991719312 L 447.14285714285717 109.54955425178312 L 449.04761904761904 112.25364097608099 L 450.95238095238096 115.12614717742323 L 452.85714285714283 118.19054956347446 L 454.76190476190476 121.47698477814396 L 456.6666666666667 125.02525832509787 L 458.57142857142856 128.8898748000048 L 460.4761904761905 133.1490519000044 L 462.3809523809524 137.92243422023898 L 464.2857142857143 143.41071864324084 L 466.1904761904762 150.00377952757404 L 468.0952380952381 158.70411450000196 L 470 180 L 470 260" stroke-width="1.5" fill="rgba(148,163,184,0.3)" stroke="rgba(71,85,105,0.2)"></path><text x="270" y="160" text-anchor="middle" dominant-baseline="middle" fill="#000" style="font-size:19px">Glass</text> <line x1="0" y1="260" x2="540" y2="260" stroke-width="1.5" stroke="rgba(148,163,184,0.4)"></line><rect width="540" height="40" x="0" y="260" rx="4" fill="rgba(148,163,184,0.1)"></rect><text x="270" y="280" text-anchor="middle" dominant-baseline="middle" fill="#000" style="font-size:19px">Background</text><line x1="270" y1="0" x2="270" y2="60" stroke="hsl(180,76%,45%)" stroke-width="3"></line><line x1="270" y1="60" x2="270" y2="260" stroke="hsl(205.5,76%,45%)" stroke-width="3" display="block"></line><line x1="270" y1="60" x2="270" y2="260" stroke="hsl(180,76%,45%)" stroke-width="1" stroke-dasharray="3" stroke-opacity="0.5"></line><line x1="270" y1="260" x2="270" y2="260" stroke="hsl(180,76%,45%)" stroke-width="0.3" marker-end="url(#arrow-displacement-vector)" display="block"></line></svg>

From the simulation, we can see that concave surfaces push rays outside the glass; convex surfaces keep them inside.  
从模拟结果可以看出，凹面会将光线推出玻璃外；凸面会将光线留在玻璃内。

We want to avoid outside displacement because it requires sampling background beyond the object. Apple’s Liquid Glass appears to favor convex profiles (except for the Switch component, covered later).  
我们希望避免外部位移，因为它需要对物体外部的背景进行采样。苹果的 Liquid Glass 似乎更倾向于凸面轮廓（Switch 组件除外，稍后会介绍）。

The background arrow indicates displacement—how far a ray lands compared to where it would have landed without glass. Color encodes magnitude (longer → more purple).  
背景箭头表示位移——光线落在玻璃后的位置与没有玻璃时的位置相比的距离。颜色表示位移量（距离越长，颜色越紫）。

Take a look at symmetry: rays at the same distance from the border share the same displacement magnitude on each side. Compute once, reuse around the bezel/object.  
观察对称性：距离边界相同距离的光线在两侧具有相同的位移幅度。计算一次，即可在边框/物体周围重复使用。

## Displacement Vector Field 位移矢量场

Now that calculated the displacement at a distance from border, let's calculate the displacement vector field for the entire glass surface.  
现在我们已经计算出了距边界一定距离处的位移，接下来让我们计算整个玻璃表面的位移矢量场。

The vector field describes at every position on the glass surface how much the light ray is displaced from its original position, and in which direction. In a circle, this displacement is always orthogonal to the border.  
该矢量场描述了光线在玻璃表面上每个位置偏离其原始位置的距离和方向。在圆形区域内，这种位移始终垂直于边界。

## Pre-calculating the displacement magnitude 预先计算位移幅度

Because we saw that this displacement magnitude is symmetric around the bezel, we can pre-calculate it for a range of distances from the border, on a single radius.  
因为我们看到这种位移幅度围绕表圈对称，所以我们可以预先计算出在单个半径上，从边缘到表圈一系列距离的位移幅度。

This allows us to calculate everything in two dimensions once (x and z axis), on one "half-slice" of the object, and we will the rotate these pre-calculated displacements around the z-axis.  
这样，我们就可以一次性计算物体一个“半切片”上的所有二维数据（x 轴和 z 轴），然后绕 z 轴旋转这些预先计算好的位移。

The actual number of samples we need to do on a radius is of 127 ray simulations, and is determined by the constraints of the SVG Displacement Map resolution. (See next section.)  
我们实际需要对一个半径进行 127 次光线模拟的采样次数，是由 SVG 位移贴图的分辨率限制决定的。（参见下一节。）

## Normalizing vectors 归一化向量

In the above diagram, the arrows are all scaled down for visibility, so they do not overlap. This is normalization, and is also useful from a technical standpoint.  
在上图中，为了便于观察，所有箭头都缩小了尺寸，以避免重叠。这称为归一化处理，从技术角度来看也很有用。

To use these vectors in a displacement map, we need to normalize them. Normalization means scaling the vectors so that their maximum magnitude is $1$, which allows us to represent them in a fixed range.  
要在位移贴图中使用这些向量，我们需要对它们进行归一化。归一化是指将向量缩放，使其最大值为 $1$ ，这样就可以将它们表示在一个固定的范围内。

So we calculate the maximum displacement magnitude in our pre-calculated array:  
因此，我们计算预先计算好的数组中的最大位移幅度：

```ts
const maximumDisplacement = Math.max(...displacementMagnitudes);
```

And we divide each vector's magnitude by this maximum:  
我们将每个向量的大小除以这个最大值：

```ts
displacementVector_normalized = {
  angle: normalAtBorder,
  magnitude: magnitude / maximumDisplacement,
};
```

We store `maximumDisplacement` as we will need it to re-scale the displacement map back to the actual magnitudes.  
我们存储 `maximumDisplacement` ，因为我们需要它来将位移图重新缩放回实际大小。

## SVG Displacement Map SVG 位移贴图

Now we need to translate our mathematical refraction calculations into something the browser can actually render. We'll use [**SVG displacement maps**](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap).  
现在我们需要将数学上的折射计算结果转换成浏览器可以实际渲染的内容。我们将使用 [**SVG 置换贴图**](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap) 。

A displacement map is simply an image where each pixel's color tells the browser how far it should find the actual pixel value from its current position.  
位移贴图其实就是一张图片，其中每个像素的颜色告诉浏览器，实际像素值应该距离其当前位置有多远。

SVG's `<feDisplacementMap />` encodes these pixels in a 32 bit RGBA image, where each channel represents a different axis of displacement.  
SVG 的 `<feDisplacementMap />` 将这些像素编码为 32 位 RGBA 图像，其中每个通道代表不同的位移轴。

It's up to the user to define which channel corresponds to which axis, but it is important to understand the constraint: Because each channel is 8 bits, the displacement is limited to a range of -128 to 127 pixels in each direction. (256 values possible in total). 128 is the neutral value, meaning no displacement.  
用户可自行定义哪个通道对应哪个轴，但理解其限制至关重要：由于每个通道为 8 位，因此位移量在每个方向上都被限制在 -128 到 127 像素的范围内（总共有 256 个可能的值）。128 为中性值，表示无位移。

SVG filters can only use images as displacement maps, so we need to convert our displacement vector field into an image format.  
SVG 滤镜只能使用图像作为位移贴图，因此我们需要将位移矢量场转换为图像格式。

```tsx
<svg colorInterpolationFilters="sRGB">
  <filter id={id}>
    <feImage
      href={displacementMapDataUrl}
      x={0}
      y={0}
      width={width}
      height={height}
      result="displacement_map"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="displacement_map"
      scale={scale}
      xChannelSelector="R" // Red Channel for displacement in X axis
      yChannelSelector="G" // Green Channel for displacement in Y axis
    />
  </filter>
</svg>
```

`<feDisplacementMap />` uses the red channel for the X axis and the green channel for the Y axis. The blue and alpha channels are ignored.  
`<feDisplacementMap />` 使用红色通道作为 X 轴，绿色通道作为 Y 轴。蓝色通道和 alpha 通道将被忽略。

## Scale 缩放

The Red (X) and Green (Y) channels are 8‑bit values (0–255). Interpreted without any extra scaling, they map linearly to a normalized displacement in \[−1, 1\], with 128 as the neutral value (no displacement):  
红色 (X) 和绿色 (Y) 通道均为 8 位值 (0–255)。在不进行任何额外缩放的情况下，它们线性映射到 \[−1, 1\] 范围内的归一化位移，其中 128 为中性值（无位移）：

$$
\begin{aligned}
0 &\mapsto -1 \\
128 &\mapsto 0 \\
255 &\mapsto 1
\end{aligned}
$$

The `scale` attribute of `<feDisplacementMap />` multiplies this normalized amount:  
`<feDisplacementMap />` 的 `scale` 属性会将此归一化值乘以：

$$
\begin{aligned}
0 &\mapsto -scale \\
128 &\mapsto 0 \\
255 &\mapsto scale
\end{aligned}
$$

Because our vectors are normalized using the maximum possible displacement (in pixels) as the unit, we can reuse that maximum directly as the filter’s `scale`:  
由于我们的向量以最大可能的位移（以像素为单位）为单位进行归一化，因此我们可以直接将该最大值用作滤波器的 `scale` ：

```tsx
<feDisplacementMap
  in="SourceGraphic"
  in2="displacement_map"
  scale={maximumDisplacement} // max displacement (px) → real pixel shift
  xChannelSelector="R"
  yChannelSelector="G"
/>
```

You can also animate `scale` to fade the effect in/out—no need to recompute the map (useful for artistic control even if not physically exact).  
您还可以通过 `scale` 来淡入/淡出效果——无需重新计算贴图（即使物理上不精确，也对艺术控制很有用）。

## Vector to Red-Green values 向量到红绿值

To convert our displacement vector field into a displacement map, we need to convert each vector into a color value. The red channel will represent the X component of the vector, and the green channel will represent the Y component.  
为了将位移矢量场转换为位移贴图，我们需要将每个矢量转换为颜色值。红色通道代表矢量的 X 分量，绿色通道代表 Y 分量。

We currently have polar coordinates (angle and magnitude) for each vector, so we need to convert them to Cartesian coordinates (X and Y) before mapping them to the red and green channels.  
我们目前每个向量都有极坐标（角度和大小），因此我们需要将它们转换为笛卡尔坐标（X 和 Y），然后再映射到红色和绿色通道。

```tsx
const x = Math.cos(angle) * magnitude;
const y = Math.sin(angle) * magnitude;
```

Because we normalised our vectors already, `magnitude` here is between 0 and 1.  
因为我们已经对向量进行了归一化，所以这里的 `magnitude` 介于 0 和 1 之间。

From here, we just remap the values to the range of 0 to 255 for the red and green channels:  
接下来，我们只需将红色和绿色通道的值重新映射到 0 到 255 的范围内：

Red: 255

X axis: 1.00

Green: 127

Y axis: -0.00

Result (Blended) 结果（混合）

```tsx
const result = {
  r: 128 + x * 127, // Red channel is the X component, remapped to 0-255
  g: 128 + y * 127, // Green channel is the Y component, remapped to 0-255
  b: 128, // Blue channel is ignored
  a: 255, // Alpha channel is fully opaque
};
```

After converting every vector in the map to color value, we get an image that can be used as a displacement map in the SVG filter.  
将地图中的每个矢量转换为颜色值后，我们就得到了一张可以用作 SVG 滤镜中的位移贴图的图像。

## Playground 演示环境

This playground applies the SVG displacement filter to a simple scene and lets you tweak surface shape, bezel width, glass thickness, and effect scale. Watch how these inputs change the refraction field, the generated displacement map, and the final rendering.  
这个演示环境将 SVG 置换滤镜应用于一个简单的场景，并允许您调整表面形状、边框宽度、玻璃厚度和效果比例。观察这些参数如何改变折射场、生成的置换贴图以及最终渲染效果。

#### Surface 表面

#### Controls 控制

#### Radius Simulation 半径模拟

#### Displacement Map 位移图

#### Radius Displacements 半径位移

<svg viewBox="0 0 400 300" width="100%"><defs><marker id="axisArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="9" markerHeight="9" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"></path></marker></defs><line x1="30" y1="150" x2="30" y2="54" stroke="hsl(180,76%,45%)" stroke-width="2" display="none"></line><path d="M 30 54 L 30.6640625 57.467760004536984 L 31.328125 59.252687334682776 L 31.9921875 60.59984009854942 L 32.65625 61.718879686856326 L 33.3203125 62.69257215272182 L 33.984375 63.563599081542364 L 34.6484375 64.35733995993945 L 35.3125 65.09031267306148 L 35.9765625 65.77396533890209 L 36.640625 66.41660971300496 L 37.3046875 67.02450044616165 L 37.96875 67.60248017115316 L 38.6328125 68.15438631459189 L 39.296875 68.68331898484263 L 39.9609375 69.19182378501989 L 40.625 69.68202036290049 L 41.2890625 70.15569514163764 L 41.953125 70.61436970153555 L 42.6171875 71.0593521841396 L 43.28125 71.49177659191744 L 43.9453125 71.91263328764727 L 44.609375 72.32279298282421 L 45.2734375 72.72302583323072 L 45.9375 73.11401680575177 L 46.6015625 73.4963781671121 L 47.265625 73.87065972535646 L 47.9296875 74.23735729788406 L 48.59375 74.59691976666745 L 49.2578125 74.9497549971586 L 49.921875 75.29623483662763 L 50.5859375 75.636699360267 L 51.25 75.9714604985858 L 51.9140625 76.3008051524072 L 52.578125 76.6249978809685 L 53.2421875 76.94428323233826 L 53.90625 77.2588877723605 L 54.5703125 77.56902185815275 L 55.234375 77.87488119464756 L 55.8984375 78.1766482051737 L 56.5625 78.47449324274896 L 57.2265625 78.76857566386134 L 57.890625 79.05904478345754 L 58.5546875 79.34604072647417 L 59.21875 79.62969518955997 L 59.8828125 79.91013212403797 L 60.546875 80.18746834978325 L 61.2109375 80.46181410842583 L 61.875 80.73327356309734 L 62.5390625 81.00194525058471 L 63.203125 81.26792249163334 L 63.8671875 81.53129376374865 L 64.53125 81.79214304078005 L 65.1953125 82.0505501026672 L 65.859375 82.30659081851009 L 66.5234375 82.56033740582741 L 67.1875 82.81185866825959 L 67.8515625 83.06122021384404 L 68.515625 83.30848465589482 L 69.1796875 83.55371179806289 L 69.84375 83.79695880493928 L 70.5078125 84.03828035984874 L 71.171875 84.27772881075555 L 71.8359375 84.51535430529046 L 72.5 84.75120491618073 L 73.1640625 84.98532675753444 L 73.828125 85.21776409313205 L 74.4921875 85.44855943701772 L 75.15625 85.67775364730196 L 75.8203125 85.90538601372677 L 76.484375 86.13149433926208 L 77.1484375 86.35611501661973 L 77.8125 86.57928309936057 L 78.4765625 86.8010323690408 L 79.140625 87.02139539785621 L 79.8046875 87.24040360725648 L 80.46875 87.45808732342519 L 81.1328125 87.67447582882147 L 81.796875 87.88959741123868 L 82.4609375 88.10347940968023 L 83.125 88.31614825743554 L 83.7890625 88.52762952300361 L 84.453125 88.73794794854317 L 85.1171875 88.94712748612707 L 85.78125 89.15519133200351 L 86.4453125 89.36216195921449 L 87.109375 89.56806114796368 L 87.7734375 89.77291001510918 L 88.4375 89.97672904107955 L 89.1015625 90.17953809641101 L 89.765625 90.38135646630062 L 90.4296875 90.58220287403597 L 91.09375 90.78209550337161 L 91.7578125 90.98105201961391 L 92.421875 91.17908958972944 L 93.0859375 91.37622490151023 L 93.75 91.57247418183522 L 94.4140625 91.76785321392785 L 95.078125 91.9623773539519 L 95.7421875 92.15606154654988 L 96.40625 92.34892034017156 L 97.0703125 92.54096790112337 L 97.734375 92.73221802735324 L 98.3984375 92.9226841614799 L 99.0625 93.11237940328292 L 99.7265625 93.30131652162315 L 100.390625 93.48950796571756 L 101.0546875 93.67696587620557 L 101.71875 93.86370209548 L 102.3828125 94.0497281776619 L 103.046875 94.23505539829765 L 103.7109375 94.41969476335197 L 104.375 94.60365701798776 L 105.0390625 94.78695265528262 L 105.703125 94.96959192389465 L 106.3671875 95.15158483607405 L 107.03125 95.33294117507097 L 107.6953125 95.51367050222012 L 108.359375 95.69378216385012 L 109.0234375 95.87328529778777 L 109.6875 96.0521888399077 L 110.3515625 96.23050153012451 L 111.015625 96.40823191813786 L 111.6796875 96.58538836913937 L 112.34375 96.76197906946766 L 113.0078125 96.93801203150524 L 113.671875 97.11349509890309 L 114.3359375 97.28843595145005 L 115 97.4628421096318 L 115.6640625 97.63672093926553 L 116.328125 97.81007965573852 L 116.9921875 97.98292532837513 L 117.65625 98.15526488421614 L 118.3203125 98.3271051121676 L 118.984375 98.49845266668648 L 119.6484375 98.66931407125506 L 120.3125 98.83969572225504 L 120.9765625 99.00960389202046 L 121.640625 99.17904473241055 L 122.3046875 99.34802427763998 L 122.96875 99.51654844772708 L 123.6328125 99.68462305103326 L 124.296875 99.85225378766376 L 124.9609375 100.01944625162753 L 125.625 100.1862059341588 L 126.2890625 100.35253822582695 L 126.953125 100.51844841919151 L 127.6171875 100.6839417114389 L 128.28125 100.84902320641896 L 128.9453125 101.01369791725136 L 129.609375 101.17797076825427 L 130.2734375 101.34184659728442 L 130.9375 101.50533015773405 L 131.6015625 101.66842612074342 L 132.265625 101.83113907663561 L 132.9296875 101.99347353760942 L 133.59375 102.15543393876892 L 134.2578125 102.31702464059187 L 134.921875 102.47824993027598 L 135.5859375 102.63911402327322 L 136.25 102.79962106560649 L 136.9140625 102.959775134651 L 137.578125 103.11958024126267 L 138.2421875 103.27904033098247 L 138.90625 103.43815928561287 L 139.5703125 103.5969409244866 L 140.234375 103.75538900617221 L 140.8984375 103.9135072293569 L 141.5625 104.07129923456426 L 142.2265625 104.22876860515885 L 142.890625 104.38591886862878 L 143.5546875 104.54275349794312 L 144.21875 104.69927591238549 L 144.8828125 104.85548947916521 L 145.546875 105.0113975139387 L 146.2109375 105.1670032824789 L 146.875 105.32231000122621 L 147.5390625 105.47732083852561 L 148.203125 105.63203891585576 L 148.8671875 105.78646730819003 L 149.53125 105.94060904556822 L 150.1953125 106.09446711363111 L 150.859375 106.24804445460096 L 151.5234375 106.40134396820304 L 152.1875 106.55436851256876 L 152.8515625 106.70712090490932 L 153.515625 106.85960392235549 L 154.1796875 107.01182030280589 L 154.84375 107.16377274572591 L 155.5078125 107.31546391288936 L 156.171875 107.46689642879701 L 156.8359375 107.61807288210481 L 157.5 107.76899582542974 L 158.1640625 107.91966777672042 L 158.828125 108.0700912195581 L 159.4921875 108.22026860403429 L 160.15625 108.37020234721581 L 160.8203125 108.51989483360401 L 161.484375 108.66934841626849 L 162.1484375 108.81856541692031 L 162.8125 108.96754812675323 L 163.4765625 109.1162988067895 L 164.140625 109.26481968867432 L 164.8046875 109.41311297512279 L 165.46875 109.56118084033028 L 166.1328125 109.70902543066339 L 166.796875 109.85664886504144 L 167.4609375 110.00405323537686 L 168.125 110.15124060717994 L 168.7890625 110.29821302011086 L 169.453125 110.44497248809546 L 170.1171875 110.5915210000815 L 170.78125 110.73786052040771 L 171.4453125 110.8839929891042 L 172.109375 111.02992032244853 L 172.7734375 111.17564441339508 L 173.4375 111.3211671318179 L 174.1015625 111.4664903250576 L 174.765625 111.611615818167 L 175.4296875 111.75654541451262 L 176.09375 111.9012808957929 L 176.7578125 112.04582402279459 L 177.421875 112.19017653533854 L 178.0859375 112.33434015307347 L 178.75 112.47831657528397 L 179.4140625 112.62210748193655 L 180.078125 112.76571453311789 L 180.7421875 112.90913937010146 L 181.40625 113.05238361530334 L 182.0703125 113.19544887263413 L 182.734375 113.33833672779801 L 183.3984375 113.48104874865038 L 184.0625 113.62358648555619 L 184.7265625 113.7659514711215 L 185.390625 113.9081452215121 L 186.0546875 114.05016923566598 L 186.71875 114.19202499608996 L 187.3828125 114.33371396925347 L 188.046875 114.47523760534338 L 188.7109375 114.61659733898097 L 189.375 114.75779458912555 L 190.0390625 114.89883075971252 L 190.703125 115.03970723935564 L 191.3671875 115.18042540201394 L 192.03125 115.32098660706615 L 192.6953125 115.46139219959859 L 193.359375 115.60164351050025 L 194.0234375 115.74174185665359 L 194.6875 115.88168854139678 L 195.3515625 116.02148485443942 L 196.015625 116.16113207228058 L 196.6796875 116.30063145819372 L 197.34375 116.43998426271487 L 198.0078125 116.57919172363601 L 198.671875 116.71825506596977 L 199.3359375 116.85717550265429 L 200 116.99595423440456 L 200.6640625 117.1345924500066 L 201.328125 117.27309132616645 L 201.9921875 117.41145202833803 L 202.65625 117.549675710213 L 203.3203125 117.68776351424765 L 203.984375 117.82571657192094 L 204.6484375 117.96353600341973 L 205.3125 118.10122291848658 L 205.9765625 118.23877841573474 L 206.640625 118.37620358372735 L 207.3046875 118.51349950033884 L 207.96875 118.65066723328084 L 208.6328125 118.78770784041244 L 209.296875 118.92462236922516 L 209.9609375 119.06141185786205 L 210.625 119.19807733446306 L 211.2890625 119.33461981780334 L 211.953125 119.47104031722425 L 212.6171875 119.60733983282692 L 213.28125 119.74351935550246 L 213.9453125 119.87957986722503 L 214.609375 120.01552234099724 L 215.2734375 120.15134774111922 L 215.9375 120.28705702316917 L 216.6015625 120.42265113424652 L 217.265625 120.55813101304824 L 217.9296875 120.69349758983776 L 218.59375 120.8287517868622 L 219.2578125 120.96389451829218 L 219.921875 121.09892669011434 L 220.5859375 121.23384920065789 L 221.25 121.36866294045574 L 221.9140625 121.50336879218054 L 222.578125 121.63796763127945 L 223.2421875 121.7724603255659 L 223.90625 121.90684773544605 L 224.5703125 122.04113071415983 L 225.234375 122.17531010766008 L 225.8984375 122.30938675513055 L 226.5625 122.44336148826287 L 227.2265625 122.57723513242728 L 227.890625 122.71100850584763 L 228.5546875 122.84468241997985 L 229.21875 122.97825768003037 L 229.8828125 123.1117350842246 L 230.546875 123.24511542459976 L 231.2109375 123.37839948686316 L 231.875 123.5115880501324 L 232.5390625 123.64468188770036 L 233.203125 123.77768176654288 L 233.8671875 123.91058844746954 L 234.53125 124.04340268541183 L 235.1953125 124.17612522965926 L 235.859375 124.30875682321069 L 236.5234375 124.44129820366584 L 237.1875 124.57375010272213 L 237.8515625 124.70611324676663 L 238.515625 124.83838835632486 L 239.1796875 124.97057614667044 L 239.84375 125.10267732741764 L 240.5078125 125.23469260327813 L 241.171875 125.36662267341187 L 241.8359375 125.49846823174937 L 242.5 125.63022996719417 L 243.1640625 125.7619085636397 L 243.828125 125.89350469973422 L 244.4921875 126.02501904949398 L 245.15625 126.15645228188859 L 245.8203125 126.28780506095029 L 246.484375 126.41907804608519 L 247.1484375 126.55027189213274 L 247.8125 126.68138724904077 L 248.4765625 126.81242476219683 L 249.140625 126.94338507263704 L 249.8046875 127.07426881673945 L 250.46875 127.20507662657519 L 251.1328125 127.33580912961301 L 251.796875 127.46646694941035 L 252.4609375 127.59705070493659 L 253.125 127.727561011014 L 253.7890625 127.85799847843768 L 254.453125 127.98836371364108 L 255.1171875 128.11865731935228 L 255.78125 128.2488798939409 L 256.4453125 128.3790320320196 L 257.109375 128.50911432412926 L 257.7734375 128.63912735728633 L 258.4375 128.76907171421504 L 259.1015625 128.8989479741025 L 259.765625 129.0287567125672 L 260.4296875 129.1584985013001 L 261.09375 129.2881739083722 L 261.7578125 129.41778349841456 L 262.421875 129.5473278323385 L 263.0859375 129.67680746765694 L 263.75 129.8062229583455 L 264.4140625 129.93557485510644 L 265.078125 130.06486370490433 L 265.7421875 130.1940900518381 L 266.40625 130.32325443635108 L 267.0703125 130.45235739577797 L 267.734375 130.581399464095 L 268.3984375 130.71038117227528 L 269.0625 130.83930304797912 L 269.7265625 130.96816561591675 L 270.390625 131.0969693976124 L 271.0546875 131.22571491157322 L 271.71875 131.35440267332794 L 272.3828125 131.48303319540165 L 273.046875 131.61160698742813 L 273.7109375 131.7401245561984 L 274.375 131.86858640564515 L 275.0390625 131.99699303662743 L 275.703125 132.1253449475954 L 276.3671875 132.25364263404424 L 277.03125 132.38188658871258 L 277.6953125 132.5100773017166 L 278.359375 132.63821526055224 L 279.0234375 132.76630095003225 L 279.6875 132.89433485236094 L 280.3515625 133.02231744721234 L 281.015625 133.1502492118106 L 281.6796875 133.278130620674 L 282.34375 133.40596214610787 L 283.0078125 133.53374425788576 L 283.671875 133.66147742313564 L 284.3359375 133.78916210697764 L 285 133.9167987719393 L 285.6640625 134.04438787825762 L 286.328125 134.17192988411625 L 286.9921875 134.29942524506617 L 287.65625 134.426874414608 L 288.3203125 134.55427784416312 L 288.984375 134.68163598263652 L 289.6484375 134.80894927700646 L 290.3125 134.93621817223385 L 290.9765625 135.06344311096694 L 291.640625 135.19062453365905 L 292.3046875 135.31776287916847 L 292.96875 135.44485858392056 L 293.6328125 135.57191208258027 L 294.296875 135.69892380762886 L 294.9609375 135.8258941896974 L 295.625 135.9528236575592 L 296.2890625 136.0797126381927 L 296.953125 136.20656155622612 L 297.6171875 136.3333708351054 L 298.28125 136.46014089585333 L 298.9453125 136.5868721581039 L 299.609375 136.71356503941496 L 300.2734375 136.840219955824 L 300.9375 136.9668373215087 L 301.6015625 137.0934175489316 L 302.265625 137.21996104891784 L 302.9296875 137.34646823066518 L 303.59375 137.47293950161708 L 304.2578125 137.5993752676137 L 304.921875 137.72577593290634 L 305.5859375 137.85214190024232 L 306.25 137.97847357088222 L 306.9140625 138.104771344202 L 307.578125 138.23103561840625 L 308.2421875 138.35726678992467 L 308.90625 138.4834652541287 L 309.5703125 138.60963140459125 L 310.234375 138.73576563345836 L 310.8984375 138.8618683315447 L 311.5625 138.98793988836115 L 312.2265625 139.1139806919341 L 312.890625 139.23999112897422 L 313.5546875 139.3659715847677 L 314.21875 139.49192244341688 L 314.8828125 139.61784408773394 L 315.546875 139.7437368989955 L 316.2109375 139.86960125767547 L 316.875 139.99543754250368 L 317.5390625 140.12124613134074 L 318.203125 140.2470274008671 L 318.8671875 140.37278172620233 L 319.53125 140.49850948171402 L 320.1953125 140.6242110404296 L 320.859375 140.74988677421777 L 321.5234375 140.87553705404116 L 322.1875 141.00116224937008 L 322.8515625 141.12676272913708 L 323.515625 141.25233886066172 L 324.1796875 141.37789101060756 L 324.84375 141.50341954453853 L 325.5078125 141.62892482682665 L 326.171875 141.75440722119149 L 326.8359375 141.8798670899077 L 327.5 142.00530479483768 L 328.1640625 142.13072069635933 L 328.828125 142.25611515433053 L 329.4921875 142.38148852765005 L 330.15625 142.50684117402932 L 330.8203125 142.6321734507492 L 331.484375 142.75748571373026 L 332.1484375 142.8827783185722 L 332.8125 143.00805161962518 L 333.4765625 143.13330597067932 L 334.140625 143.25854172459944 L 334.8046875 143.38375923352362 L 335.46875 143.50895884878054 L 336.1328125 143.6341409210894 L 336.796875 143.75930580026687 L 337.4609375 143.8844538354282 L 338.125 144.00958537518846 L 338.7890625 144.13470076723053 L 339.453125 144.25980035857773 L 340.1171875 144.38488449593854 L 340.78125 144.50995352485174 L 341.4453125 144.63500779052572 L 342.109375 144.76004763769046 L 342.7734375 144.885073410238 L 343.4375 145.01008545156913 L 344.1015625 145.13508410444666 L 344.765625 145.26006971120182 L 345.4296875 145.38504261351753 L 346.09375 145.5100031527066 L 346.7578125 145.63495166928342 L 347.421875 145.7598885035964 L 348.0859375 145.88481399532975 L 348.75 146.00972848364177 L 349.4140625 146.1346323075158 L 350.078125 146.25952580526265 L 350.7421875 146.38440931473076 L 351.40625 146.5092831734458 L 352.0703125 146.6341477186802 L 352.734375 146.75900328709795 L 353.3984375 146.8838502151075 L 354.0625 147.00868883871956 L 354.7265625 147.13351949368842 L 355.390625 147.2583425152284 L 356.0546875 147.38315823858036 L 356.71875 147.50796699844565 L 357.3828125 147.63276912919883 L 358.046875 147.75756496517192 L 358.7109375 147.88235484023005 L 359.375 148.0071390881269 L 360.0390625 148.1319180422933 L 360.703125 148.25669203598048 L 361.3671875 148.38146140233226 L 362.03125 148.5062264741744 L 362.6953125 148.63098758415808 L 363.359375 148.75574506483252 L 364.0234375 148.8804992485766 L 364.6875 149.00525046767154 L 365.3515625 149.12999905416163 L 366.015625 149.25474534021083 L 366.6796875 149.37948965768015 L 367.34375 149.50423233841335 L 368.0078125 149.62897371416892 L 368.671875 149.75371411669337 L 369.3359375 149.87845387772404" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.6" stroke-linecap="round"></path><line y1="150" y2="150" x1="30" x2="370" stroke="currentColor" stroke-width="1" opacity="0.25" stroke-dasharray="4 1"></line><line x1="30" x2="30" y1="270" y2="30" stroke="currentColor" opacity="0.25" stroke-width="1" marker-end="url(#axisArrow)"></line><text x="6" y="7" alignment-baseline="middle" text-anchor="end" transform="rotate(-90 30 20)" fill="currentColor" opacity="0.5">Displacement</text> <line x1="30" x2="370" y1="270" y2="270" stroke="currentColor" stroke-width="1" opacity="0.28" marker-end="url(#axisArrow)"></line><text x="360" y="285" alignment-baseline="middle" text-anchor="end" fill="currentColor" opacity="0.5">Distance to border</text></svg>

#### Preview 预览

## Specular Highlight 镜面高光

The final piece of our Liquid Glass effect is the **specular highlight** —those bright, shiny edges you see on real glass objects when light hits them at certain angles.  
我们液态玻璃效果的最后一部分是 **镜面高光** ——当光线以特定角度照射到真正的玻璃物体上时，你会看到那些明亮、闪亮的边缘。

The way Apple implements it seems to be a simple rim light effect, where the highlight appears around the edges of the glass object, and its intensity varies based on the angle of the surface normal relative to a fixed light direction.  
苹果的实现方式似乎是简单的边缘光效果，高光出现在玻璃物体的边缘，其强度根据表面法线相对于固定光线方向的角度而变化。

\-180°0°180°

## Combining Refraction and Specular Highlight 结合折射和镜面高光

In the final SVG filter, we combine both the displacement map for refraction and the specular highlight effect.  
在最终的 SVG 滤镜中，我们将折射的位移贴图和镜面高光效果结合起来。

Both are loaded as separate `<feImage />` elements, and then combined using `<feBlend />` to overlay the highlight on top of the refracted image.  
两者分别作为单独的 `<feImage />` 元素加载，然后使用 `<feBlend />` 将它们组合起来，以将高光叠加到折射图像之上。

But this part is actually the most "creative" part of the effect, and it's just by tweaking the number of filters, and their parameters, that you can get a variety of different looks.  
但这一部分实际上是效果中最具“创意”的部分，只需调整滤镜的数量及其参数，就可以获得各种不同的外观。

## SVG Filter as backdrop-filter SVG 滤镜作为 `backdrop-filter`

This is the part where cross-browser compatibility ends. Only Chrome currently supports using SVG filters as `backdrop-filter`, which is essential for applying the Liquid Glass effect to UI components:  
至此，跨浏览器兼容性就结束了。目前只有 Chrome 支持使用 SVG 滤镜作为 `backdrop-filter` ，这对于将液态玻璃效果应用于 UI 组件至关重要：

```css
.glass-panel {
  backdrop-filter: url(#liquidGlassFilterId);
}
```

> Note: The backdrop-filter dimensions does not adjust automatically to the element size, so you need to ensure that your filter images fit the size of your elements.  
> 注意：背景滤镜尺寸不会自动调整为元素大小，因此您需要确保滤镜图像适合元素的大小。

Now that we have all the pieces in place, we can create components that use this effect.  
现在我们已经具备了所有条件，可以创建利用这种效果的组件了。

## Conclusion 结论

This prototype distills Apple’s Liquid Glass into real‑time refraction plus a simple highlight. It’s flexible, but still Chrome‑bound—only Chromium exposes SVG filters as `backdrop-filter`. That said, it’s already viable inside Chromium‑based runtimes like Electron, elsewhere you could fake a softer fallback with layered blur.  
这个原型将苹果的 Liquid Glass 技术简化为实时折射加上简单的高光效果。它很灵活，但仍然受限于 Chrome 浏览器——只有 Chromium 才能将 SVG 滤镜作为 `backdrop-filter` 公开。也就是说，它在基于 Chromium 的运行时环境（例如 Electron）中已经可以正常运行，在其他环境中，你可以使用分层模糊来模拟更柔和的回退效果。

Treat this strictly as experimental. Dynamic shape/size changes are currently costly because nearly every tweak (besides animating `<filter />` props, like `scale`) forces a full displacement map rebuild.  
请严格将其视为实验性功能。动态形状或大小的更改目前开销很大，因为几乎每次调整（除了给 `<filter />` 的属性如 `scale` 做动画）都会强制重建完整的位移贴图。

The code needs a cleanup pass and perf work before any possible open‑source release.  
在发布任何可能的开源版本之前，代码需要进行清理和性能优化。

Thanks for reading my first post—I'd genuinely love any feedback, ideas, critiques, or suggestions. If it sparked a thought or you know someone who'd enjoy this kind of deep‑dive, feel free to pass it along.  
感谢阅读我的第一篇文章——我真心希望得到任何反馈、想法、批评或建议。如果它引发了你的思考，或者你认识有人会喜欢这种深入探讨的内容，请随时分享给他们。
