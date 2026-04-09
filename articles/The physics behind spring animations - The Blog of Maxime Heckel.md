---
title: "The physics behind spring animations - The Blog of Maxime Heckel"
source: "https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/"
author:
  - "[[Maxime Heckel]]"
published: 2020-06-23
created: 2026-04-09
description: "A deep dive into the inner workings of spring animations in Framer Motion."
tags:
  - "articles"
---
In the past few months, I've become a big fan of Framer Motion. After looking at how I could use it [to animate my styled-components](https://blog.maximeheckel.com/posts/framer-motion-emotion), I've been tinkering around spring animations and rebuilt almost all the transitions and animations of components in several UI projects. While showcasing the result to some fellow developers I got some questions around the meaning of some of the terms and options used to set up a spring animation like **mass**, **stiffness**, and **damping**. Most of them were setting them without really knowing how they were influencing the resulting animation. Lucky for them, I used to study maths and physics in college and was able to bring light on the physics behind this type of animation.

This article aims to explain how a spring animation in a library like Framer Motion works, the laws of physics that are behind it, and the relation between the different options you can set for a spring animation.

## Hooke's Law

First of all, a spring animation has this name because the animation itself follows the physics of a spring or what we also call a **Harmonic Oscillator**. This term and the math surrounding it might seem very scary and complicated but bare with me, I'll break down everything as simply as possible. When I was in college, we defined a Harmonic Oscillator as follows:

> a system that experiences a force (F) proportional to a displacement x when displaced from its equilibrium.

The formula for such force is called Hooke's Law and it is defined as follows:

```
F = -k*x
```

where `k` is a positive constant called **stiffness** which we can also write as:

What that means is that:

- if we pull the spring (i.e. x > 0 ) to a certain distance away from its equilibrium, it will start to move
- if we don't pull it, it won't move (i.e. x = 0)

However, maybe you might have heard at school or on one of the many science-focused Youtube channels on that force is the object's mass times its acceleration, which translates to the following formula:

```
F = m*a
```

where `m` is the **mass** and `a` is the **acceleration**.

Thus given this formula and the formula above, we can deduct that:

```
m*a = -k*x
```

which is equivalent to

```
a = -k *x / m
```

We now have an equation from which we define the acceleration based on the displacement of our spring and the mass of the object attached to that spring. From the acceleration we can deduct the following:

- the velocity of the object at any given time
- the position of the object at any given time

To get the velocity of the object, you need to add the acceleration rate to the previously recorded velocity, which can translate to the following equation:

```
v2 = v1 + a*t
```

Finally, we can get the position as it follows a similar principle: the position of the object is equal to the previously recorded position to which we add the velocity:

```
p2 =  p1 + v*t
```

For the time interval, as frontend developers, we might know it better as a **frame rate** or **"frames per second"**. Considering the smoothness of Framer Motion's animations we can assume that its spring animations runs at 60 frames per second thus a time interval that is constant and equal to `1/60` or `0.01666`.

## Translating the maths to Javascript

Now that we've done the math, you can see that by knowing the **mass** of the object, the **stiffness** and the **displacement** of our spring, we can know the position of the object attached to that spring at any given time, i.e at any given frame. We can translate all the equations above in Javascript, and for a given displacement calculate all the positions of an object for 600 frames, i.e. 10 seconds:

Function that returns the positions of an object following the motion of a spring

```js
const loop = (stiffness, mass) => {
  /* Spring Length, set to 1 for simplicity */
  let springLength = 1;

  /* Object position and velocity. */
  let x = 2;
  let v = 0;

  /* Spring stiffness, in kg / s^2 */
  let k = -stiffness;

  /* Framerate: we want 60 fps hence the framerate here is at 1/60 */
  let frameRate = 1 / 60;

  /* Initiate the array of position and the current framerate i to 0 */
  let positions = [];
  let i = 0;

  /* We loop 600 times, i.e. for 600 frames which is equivalent to 10s*/
  while (i < 600) {
    let Fspring = k * (x - springLength);

    let a = Fspring / mass;
    v += a * frameRate;
    x += v * frameRate;

    i++;

    positions.push({
      position: x,
      frame: i,
    });
  }

  /**
   * positions is an array of number where each number
   * represents the position of the object in a spring
   * motion at a specific frame
   *
   * We use this array to plot all the position of the
   * object for 10 seconds.
   */
  return positions;
};
```

I built this small playground below with a graph representation of the positions that are returned by the function above a component animated by Framer Motion that has the same mass and stiffness. You can tune the mass and the stiffness with the range inputs above the graph and observe how each variable influences the animated component and the graph of positions.

## Taking damping into account
## 考虑阻尼效应

While observing the visualization above, you might have wondered why is the spring animation never-ending as opposed to the ones you might have tried yourself with Framer Motion. That is because the math formulas we used to generate the position of the object were not taking into account friction and heat. If we want to obtain a spring animation that feels natural, we should see the movement of the object slowing down as time passes to eventually stop moving. That is where the **damping** comes into the picture. You might have seen this term when looking at the documentation of Framer Motion and wondered what it meant or does to the resulting spring animation, here's how we will define it:  
在观察上面的可视化效果时，你可能会疑惑：为什么这里的弹簧动画会一直持续下去，而你自己在 Framer Motion 里试出来的动画通常不会？这是因为我们用来生成物体位置的数学公式还没有把摩擦和热量损耗考虑进去。如果我们想得到一个更自然的弹簧动画，就应该看到物体的运动随着时间推移逐渐减慢，最后停下来。这时候就轮到 **阻尼（damping）** 出场了。你可能在查阅 Framer Motion 文档时见过这个术语，但不确定它到底是什么意思，或者它会怎样影响最终的弹簧动画，下面我们来定义它：

> Damping is the force that slows down and eventually stops an oscillation by dissipating energy  
> 阻尼是指通过耗散能量来减缓并最终停止振荡的力。

Its formula is:
它的公式是：

```
Fd = -d * v
```

where `d` is the damping ratio and `v` the velocity  
其中 `d` 是阻尼系数，`v` 是速度

Taking damping into account will bring some changes to the acceleration formula we established in the first part. We know that  
把阻尼考虑进来之后，我们在第一部分建立的加速度公式就需要做一些调整。我们知道：

```
F = m*a
```

However, F here is equal to the spring force and the damping force, instead of just the spring force, thus:  
不过，这里的 F 不再只是弹簧力，而是弹簧力与阻尼力的合力，因此：

```
Fs + Fd = m*a -> a = (Fs + Fd)/m
```

We can now add this new formula to the Javascript code we've showcased in the previous part (I highlighted the additions I've made to the code compared to the previous implementation):  
现在我们可以把这个新公式加到上一部分展示的 JavaScript 代码里了（相对于前一个版本，我把新增部分标出来了）：

Updated function that takes into account the damping ratio  
考虑阻尼后的更新版函数

```js
const loop = (stiffness, mass, damping) => {
  /* Spring Length, set to 1 for simplicity */
  let springLength = 1;

  /* Object position and velocity. */
  let x = 2;
  let v = 0;

  /* Spring stiffness, in kg / s^2 */
  let k = -stiffness;

  /* Damping constant, in kg / s */
  let d = -damping;

  /* Framerate: we want 60 fps hence the framerate here is at 1/60 */
  let frameRate = 1 / 60;

  let positions = [];
  let i = 0;

  /* We loop 600 times, i.e. for 600 frames which is equivalent to 10s*/
  while (i < 600) {
    let Fspring = k * (x - springLength);
    let Fdamping = d * v;

    let a = (Fspring + Fdamping) / mass;
    v += a * frameRate;
    x += v * frameRate;

    i++;

    positions.push({
      position: x,
      frame: i,
    });
  }

  return positions;
};
```

And finally, represent the resulting position data in the playground:  
最后，把得到的位置数据展示到 Playground 中：

As you can see we now have a spring animation that eventually stops due to damping **dissipating the energy out of the system**. The chart above showcases this by **converging towards a final "resting position"**. By increasing the damping slider to a high value you can observe that the object subject to spring animation tends to converge to the "resting position" way faster than for a lower damping value.  
可以看到，现在的弹簧动画最终会停下来，因为阻尼会**把系统中的能量逐步耗散掉**。上图也体现了这一点：曲线会**逐渐收敛到最终的“静止位置（resting position）”**。如果把阻尼滑块调高，你会发现受弹簧动画影响的物体会比低阻尼时更快地收敛到这个静止位置。

## A real-life example
## 一个真实案例

By default, Framer Motion sets the stiffness of the spring animation to **100**, the damping to **10**, and the mass to **1** [according to the docs](https://www.framer.com/api/motion/types/#spring). Below, I wrote an animated `Button` component that is closer to a real-life example that you might want to implement in your UI projects. Now that you know what **mass**, **stiffness** and **damping** you can try to fine-tune your spring animation.  
[根据文档](https://www.framer.com/api/motion/types/#spring)，Framer Motion 默认把弹簧动画的刚度（stiffness）设为 **100**、阻尼（damping）设为 **10**、质量（mass）设为 **1**。下面我写了一个带动画的 `Button` 组件，它更接近你在实际 UI 项目里可能会实现的效果。现在你已经知道 **mass**、**stiffness** 和 **damping** 分别代表什么了，就可以开始有意识地微调你的弹簧动画。

import { motion } from 'framer-motion';

import './scene.css';

const Example = () => {

return (

<motion.button

style={{

background:

'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',

color: 'white',

height: '50px',

width: '200px',

borderRadius: '10px',

border: 'none',

boxShadow: 'none',

outline: 'none',

cursor: 'pointer',

}}

whileTap={{

scale: 1.3,

borderRadius: '6px',

}}

transition={{ type: 'spring', stiffness: 100, damping: 10, mass: 1 }}

\>

Click me!

</motion.button>

);

};

export default Example;

<iframe title="Sandpack Preview" allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-read; clipboard-write; xr-spatial-tracking;" src="https://2-19-8-sandpack.codesandbox.io/"></iframe>

\[3/3\] Starting

**Want to learn more the math/physics behind animations you see on a day-to-day basis?  
想进一步了解你日常见到的动画背后的数学和物理原理吗？**

I dedicated an entire blog post about [the math behind Cubic Béziers](https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/) that contains slick visualizations that easily explain how the motion these complex formulas define is obtained!  
我还专门写了一篇关于 [三次贝塞尔曲线背后数学原理](https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/) 的博客，里面有不少很直观的可视化，能帮助理解这些复杂公式究竟是怎样定义运动效果的。

**Want to learn more about Framer Motion?  
想了解更多 Framer Motion 的内容吗？**

Checkout my blog post [Guide to creating animations that spark joy with Framer Motion](https://blog.maximeheckel.com/posts/guide-animations-spark-joy-framer-motion/)!  
也可以看看我的这篇博客：[Guide to creating animations that spark joy with Framer Motion](https://blog.maximeheckel.com/posts/guide-animations-spark-joy-framer-motion/)。
