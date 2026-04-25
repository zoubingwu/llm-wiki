---
title: "Red Blob Games: Hexagonal Grids"
source: "https://www.redblobgames.com/grids/hexagons/"
author:
  - "[[Amit J. Patel]]"
published: 2013-03-11
created: 2026-04-26
description: "Amit's guide to math, algorithms, and code for hexagonal grids"
tags:
  - "articles"
---
This guide will cover various ways to make hexagonal grids, the relationships between different approaches, and common formulas and algorithms. I've been [collecting hex grid resources](http://www-cs-students.stanford.edu/~amitp/gameprog.html#hex) <sup>[1]</sup> for 35 years. I wrote this guide to the most elegant approaches that lead to the simplest code, starting from the guides by [Charles Fu](http://www-cs-students.stanford.edu/~amitp/Articles/Hexagon2.html) <sup>[2]</sup> and [Clark Verbrugge](http://www-cs-students.stanford.edu/~amitp/Articles/HexLOS.html) <sup>[3]</sup>. Most parts of this page are interactive. To get an offline copy of this page, use your browser's File → Save As (preserves interactivity) or File → Print (loses interactivity).

The code samples on this page are written in pseudo-code; they're meant to be easy to read and understand. [The implementation guide](https://www.redblobgames.com/grids/hexagons/implementation.html) has code in C++, Javascript, C#, Python, Java, Typescript, and more.

## Geometry

Hexagons are any 6-sided polygons. *Regular* hexagons have all the sides the same length. I'll assume all the hexagons we're working with here are regular.

<svg viewBox="-140 -125 250 255"><defs><radialGradient id="gradient-radial-gray"><stop offset="0%" stop-color="hsl(0,10%,95%)"></stop><stop offset="98%" stop-color="hsl(0,10%,97%)"></stop><stop offset="100%" stop-color="hsl(0,30%,93%)"></stop></radialGradient></defs><text y="-110" style="font-size: 14px;">Flat-top orientation</text> <path transform="translate(-85,-120)" stroke="hsl(0,50%,50%)" stroke-width="2" stroke-endcap="round" fill="none" d="M -7.5,5.7 L -5,1.4 L 5,1.4 L 7.5,5.7"></path><g transform="rotate(0)"><circle r="100" fill="url(#gradient-radial-gray)" stroke="none"></circle><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87" style="stroke: rgb(140, 115, 115); fill: white;"></polygon><circle r="86" fill="url(#gradient-radial-gray)" stroke="none"></circle></g><g><path d="M 0,-86.60254037844386 l -125,0 M 0,86.60254037844386 l -125,0" style="stroke: currentColor;" fill="none"></path><path transform="translate(-110.0,-86.6) rotate(90)" d="M 0 0 l 3 3 l 0 -1.5 l 83.60254037844386 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -83.60254037844386 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><path transform="translate(-110.0,86.6) rotate(-90)" d="M 0 0 l 3 3 l 0 -1.5 l 83.60254037844386 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -83.60254037844386 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><text y="-118" text-anchor="middle" transform="rotate(-90)" style="font-size: 12px;">height = √3 ✕ size</text></g> <g><path d="M -100,0 l 0,125 M 100,0 l 0,125" style="stroke: currentColor;" fill="none"></path><path transform="translate(-100.0,110.0) rotate(0)" d="M 0 0 l 3 3 l 0 -1.5 l 97 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -97 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><path transform="translate(100.0,110.0) rotate(180)" d="M 0 0 l 3 3 l 0 -1.5 l 97 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -97 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><text y="126" text-anchor="middle" transform="rotate(0)" style="font-size: 12px;">width = 2 ✕ size</text></g> <g transform="rotate(0)"><g fill="white" stroke-width="1.5" style="stroke: currentColor;"><path d="M 0,0 l 100,0" stroke-width="2.5"></path><circle cx="100" r="2"></circle></g><g fill="black" text-anchor="middle"><text x="42" y="12" style="font-size: 12px;">size</text></g></g><g transform="rotate(270)"><g fill="white" stroke-width="1.5" style="stroke: currentColor;"><path d="M 0,0 l 87,0" stroke-width="2.5"></path><circle cx="87" r="2"></circle></g><g fill="black" text-anchor="middle"></g></g><circle r="5" transform="scale(0.5)" style="fill: black;" stroke="currentColor"></circle></svg><svg viewBox="-140 -125 250 255"><defs><radialGradient id="gradient-radial-gray"><stop offset="0%" stop-color="hsl(0,10%,95%)"></stop><stop offset="98%" stop-color="hsl(0,10%,97%)"></stop><stop offset="100%" stop-color="hsl(0,30%,93%)"></stop></radialGradient></defs><text y="-110" style="font-size: 14px;">Pointy-top orientation</text> <path transform="translate(-85,-120)" stroke="hsl(0,50%,50%)" stroke-width="2" stroke-endcap="round" fill="none" d="M -8.6,5 L 0,0 L 8.6,5"></path><g transform="rotate(-30)"><circle r="100" fill="url(#gradient-radial-gray)" stroke="none"></circle><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87" style="stroke: rgb(140, 115, 115); fill: white;"></polygon><circle r="86" fill="url(#gradient-radial-gray)" stroke="none"></circle></g><g><path d="M 0,-100 l -125,0 M 0,100 l -125,0" style="stroke: currentColor;" fill="none"></path><path transform="translate(-110.0,-100.0) rotate(90)" d="M 0 0 l 3 3 l 0 -1.5 l 97 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -97 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><path transform="translate(-110.0,100.0) rotate(-90)" d="M 0 0 l 3 3 l 0 -1.5 l 97 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -97 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><text y="-118" text-anchor="middle" transform="rotate(-90)" style="font-size: 12px;">height = 2 ✕ size</text></g> <g><path d="M -86.60254037844386,0 l 0,125 M 86.60254037844386,0 l 0,125" style="stroke: currentColor;" fill="none"></path><path transform="translate(-86.6,110.0) rotate(0)" d="M 0 0 l 3 3 l 0 -1.5 l 83.60254037844386 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -83.60254037844386 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><path transform="translate(86.6,110.0) rotate(180)" d="M 0 0 l 3 3 l 0 -1.5 l 83.60254037844386 0 l -0.44999999999999996 -1.5 l 0.44999999999999996 -1.5 l -83.60254037844386 0 l 0 -1.5 Z M 0 -15 l 0 30" style="stroke: currentColor; fill: currentColor;"></path><text y="126" text-anchor="middle" transform="rotate(0)" style="font-size: 12px;">width = √3 ✕ size</text></g> <g transform="rotate(-90)"><g fill="white" stroke-width="1.5" style="stroke: currentColor;"><path d="M 0,0 l 100,0" stroke-width="2.5"></path><circle cx="100" r="2"></circle></g><g fill="black" text-anchor="middle"><text x="42" y="-3" style="font-size: 12px;">size</text></g></g><g transform="rotate(360)"><g fill="white" stroke-width="1.5" style="stroke: currentColor;"><path d="M 0,0 l 87,0" stroke-width="2.5"></path><circle cx="87" r="2"></circle></g><g fill="black" text-anchor="middle"></g></g><circle r="5" transform="scale(0.5)" style="fill: black;" stroke="currentColor"></circle></svg>

The size of a regular hexagon can be described by either the inner circle, touching the edges, or the outer circle, touching the corners. On this page, I call the outer radius " **`size` "**. The width and height are defined in terms of the diameters of the two circles.

### Spacing

Next we want to put several hexagons together. The spacing will depend on both the outer circle's radius (`size`) and the inner circle's radius (`inradius`).

<svg viewBox="-300 -300 575 425"><g fill="white" stroke="black"><g transform="translate(-150,-87)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g><g transform="translate(0,-173)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g><g transform="translate(150,-87)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g><g transform="translate(0,0)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g><line x1="-259.8076211353316" y1="-275" x2="-259.8076211353316" y2="100" stroke-opacity="1" stroke="currentColor"></line><line x1="-216.50635094610965" y1="-275" x2="-216.50635094610965" y2="100" stroke-opacity="0" stroke="currentColor"></line><line x1="-173.20508075688772" y1="-275" x2="-173.20508075688772" y2="100" stroke-opacity="1" stroke="currentColor"></line><line x1="-129.9038105676658" y1="-275" x2="-129.9038105676658" y2="100" stroke-opacity="0" stroke="currentColor"></line><line x1="-86.60254037844386" y1="-275" x2="-86.60254037844386" y2="100" stroke-opacity="1" stroke="currentColor"></line><line x1="-43.30127018922193" y1="-275" x2="-43.30127018922193" y2="100" stroke-opacity="0" stroke="currentColor"></line><line x1="0" y1="-275" x2="0" y2="100" stroke-opacity="1" stroke="currentColor"></line><line x1="43.30127018922193" y1="-275" x2="43.30127018922193" y2="100" stroke-opacity="0" stroke="currentColor"></line><line x1="86.60254037844386" y1="-275" x2="86.60254037844386" y2="100" stroke-opacity="1" stroke="currentColor"></line><line x1="129.9038105676658" y1="-275" x2="129.9038105676658" y2="100" stroke-opacity="0" stroke="currentColor"></line><line x1="173.20508075688772" y1="-275" x2="173.20508075688772" y2="100" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="-250" x2="173.20508075688772" y2="-250" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="-200" x2="173.20508075688772" y2="-200" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="-150" x2="173.20508075688772" y2="-150" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="-100" x2="173.20508075688772" y2="-100" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="-50" x2="173.20508075688772" y2="-50" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="0" x2="173.20508075688772" y2="0" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="50" x2="173.20508075688772" y2="50" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="100" x2="173.20508075688772" y2="100" stroke-opacity="1" stroke="currentColor"></line><line x1="-281.45825622994255" y1="150" x2="173.20508075688772" y2="150" stroke-opacity="0" stroke="currentColor"></line></g><g><text dy="0.4em" fill-opacity="1" x="-259.8076211353316" y="-275" style="font-size: 15px;">0w </text><text dy="0.4em" fill-opacity="0" x="-216.50635094610965" y="-275" style="font-size: 15px;">¼w </text><text dy="0.4em" fill-opacity="1" x="-173.20508075688772" y="-275" style="font-size: 15px;">½w </text><text dy="0.4em" fill-opacity="0" x="-129.9038105676658" y="-275" style="font-size: 15px;">¾w </text><text dy="0.4em" fill-opacity="1" x="-86.60254037844386" y="-275" style="font-size: 15px;">1w </text><text dy="0.4em" fill-opacity="0" x="-43.30127018922193" y="-275" style="font-size: 15px;">1¼w </text><text dy="0.4em" fill-opacity="1" x="0" y="-275" style="font-size: 15px;">1½w </text><text dy="0.4em" fill-opacity="0" x="43.30127018922193" y="-275" style="font-size: 15px;">1¾w </text><text dy="0.4em" fill-opacity="1" x="86.60254037844386" y="-275" style="font-size: 15px;">2w </text><text dy="0.4em" fill-opacity="0" x="129.9038105676658" y="-275" style="font-size: 15px;">2¼w </text><text dy="0.4em" fill-opacity="1" x="173.20508075688772" y="-275" style="font-size: 15px;">2½w </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="-250" style="font-size: 15px;">0h </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="-200" style="font-size: 15px;">¼h </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="-150" style="font-size: 15px;">½h </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="-100" style="font-size: 15px;">¾h </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="-50" style="font-size: 15px;">1h </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="0" style="font-size: 15px;">1¼h </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="50" style="font-size: 15px;">1½h </text><text dy="0.4em" fill-opacity="1" x="-281.45825622994255" y="100" style="font-size: 15px;">1¾h </text><text dy="0.4em" fill-opacity="0" x="-281.45825622994255" y="150" style="font-size: 15px;">2h </text></g><g><g><circle r="5" transform="translate(-150,-87)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(0,-173)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(150,-87)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(0,0)" fill="none" stroke="currentColor"></circle></g><g><circle r="5" transform="translate(-50,-87)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(50,-87)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(-250,-87)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(250,-87)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(-100,-173)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(100,-173)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(-200,-173)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(200,-173)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(-50,-260)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(50,-260)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(-50,87)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(50,87)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(-200,0)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(200,0)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(-100,0)scale(0.5)" fill="none" stroke="currentColor"></circle><circle r="5" transform="translate(100,0)scale(0.5)" fill="none" stroke="currentColor"></circle></g></g><g><g><path transform="translate(-173.2,25.0) rotate(0)" d="M 0 0 l 6 6 l 0 -3 l 80.60254037844386 0 l -0.8999999999999999 -3 l 0.8999999999999999 -3 l -80.60254037844386 0 l 0 -3 Z M 0 -30 l 0 60"></path><path transform="translate(0.0,25.0) rotate(180)" d="M 0 0 l 6 6 l 0 -3 l 80.60254037844386 0 l -0.8999999999999999 -3 l 0.8999999999999999 -3 l -80.60254037844386 0 l 0 -3 Z M 0 -30 l 0 60"></path><text dy="0.5em" transform="translate(-87,25) rotate(0) translate(0,8)">horizontal spacing</text></g> <g><path transform="translate(129.9,0.0) rotate(-90)" d="M 0 0 l 6 6 l 0 -3 l 69 0 l -0.8999999999999999 -3 l 0.8999999999999999 -3 l -69 0 l 0 -3 Z M 0 -30 l 0 60"></path><path transform="translate(129.9,-150.0) rotate(90)" d="M 0 0 l 6 6 l 0 -3 l 69 0 l -0.8999999999999999 -3 l 0.8999999999999999 -3 l -69 0 l 0 -3 Z M 0 -30 l 0 60"></path><text dy="0.5em" transform="translate(130,-75) rotate(-90) translate(0,8)">vertical spacing</text></g></g> <g transform="translate(275,125) scale(0.4)"><g transform="translate(-175,-50) scale(0.5)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em">flat</text></g> <g transform="translate(-75,-50) rotate(-30) scale(0.5)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" transform="rotate(30)">pointy</text></g></g></svg>

In the orientation, the horizontal distance between adjacent hexagons centers is `**horiz** = 3/4 * width = 3/2 * size`. The vertical distance is `**vert** = height = sqrt(3) * size = 2 * inradius`.

In the orientation, the horizontal distance between adjacent hexagon centers is `**horiz** = width == sqrt(3) * size == 2 * inradius`. The vertical distance is `**vert** = 3/4 * height == 3/2 * size`.

Some games use pixel art for hexagons that does not match an exactly regular polygon, and these formulas will have to be adjusted slightly. We'll do that in the [hex to pixel](#hex-to-pixel) and [pixel to hex](#pixel-to-hex) functions.

### Angles

In a regular hexagon the interior angles are 120°. There are six “wedges”, each an equilateral triangle with 60° angles inside. Each corner is `size` units away from the `center`. In code:

```
function pointy_hex_corner(center, size, i):
    var angle_deg = 60 * i - 30°
    var angle_rad = PI / 180 * angle_deg
    return Point(center.x + size * cos(angle_rad),
                 center.y + size * sin(angle_rad))
```

To fill a hexagon, gather the polygon vertices at `hex_corner(…, 0)` through `hex_corner(…, 5)`. To draw a hexagon outline, use those vertices, and then draw a line back to `hex_corner(…, 0)`.

The difference between the two orientations is a rotation, and that causes the angles to change: angles are 0°, 60°, 120°, 180°, 240°, 300° and angles are 30°, 90°, 150°, 210°, 270°, 330°. Note that the diagrams on this page use the y axis pointing *down* (angles increase clockwise); you may have to make some adjustments if your y axis points up (angles increase counterclockwise).

## Coordinate Systems

Now let's assemble hexagons into a grid. With square grids, there's one obvious way to do it. With hexagons, there are multiple approaches. I like cube coordinates for algorithms and axial or doubled for storage.

### Offset coordinates

The most common approach is to offset every other column or row. Columns are named `col` (`q`). Rows are named `row` (`r`). You can either offset the odd or the even column/rows, so the horizontal and vertical hexagons each have two variants.

<svg viewBox="-106.60254037844388 -120 1339.038105676658 1140"><g fill="white" stroke="black"><g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(0,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(-150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(-150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(-300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(-300,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(-450,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>6</tspan></text></g></g> <g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>0</tspan></text></g></g><g transform="translate(150,260)"></g></g></g></svg>
```
1, 1
```
1, 2 1, 3 1, 4 1, 5 1, 6 2, 0 2, 1 2, 2 2, 3 2, 4 2, 5 2, 6 3, 0 3, 1 3, 2 3, 3 3, 4 3, 5 3, 6 4, 0 4, 1 4, 2 4, 3 4, 4 4, 5 4, 6 5, 0 5, 1 5, 2 5, 3 5, 4 5, 5 5, 6 6, 0 6, 1 6, 2 6, 3 6, 4 6, 5 6, 6

“odd-r” horizontal layout  
shoves odd rows right

<svg viewBox="-193.2050807568878 -120 1339.038105676658 1140"><g fill="white" stroke="black"><g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(-150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(-150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(-300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(-300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(-450,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(-450,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>6</tspan></text></g></g> <g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>0</tspan></text></g></g><g transform="translate(0,173)"></g></g></g></svg>
```
1, 1
```
1, 2 1, 3 1, 4 1, 5 1, 6 2, 0 2, 1 2, 2 2, 3 2, 4 2, 5 2, 6 3, 0 3, 1 3, 2 3, 3 3, 4 3, 5 3, 6 4, 0 4, 1 4, 2 4, 3 4, 4 4, 5 4, 6 5, 0 5, 1 5, 2 5, 3 5, 4 5, 5 5, 6 6, 0 6, 1 6, 2 6, 3 6, 4 6, 5 6, 6

“even-r” horizontal layout  
shoves even rows right

<svg viewBox="-120 -106.60254037844388 1290 1165.8330249197702"><g fill="white" stroke="black"><g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(0,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(0,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(0,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(0,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(0,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(150,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(150,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(300,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(300,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(450,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(450,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(450,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(450,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(600,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>4</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(600,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>4</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>4</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(600,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>4</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(600,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>4</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(600,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>4</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(750,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>5</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(750,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>5</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(750,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>5</tspan>, <tspan>2</tspan></text></g></g><g transform="translate(750,606)"></g></g></g></svg>
```
5, 3
```
5, 4 5, 5 6, 0 6, 1 6, 2 6, 3 6, 4 6, 5 7, 0 7, 1 7, 2 7, 3 7, 4 7, 5

“odd-q” vertical layout  
shoves odd columns down

<svg viewBox="-120 -193.2050807568878 1290 1165.8330249197702"><g fill="white" stroke="black"><g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(0,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(0,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(0,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(0,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(0,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(150,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>0</tspan></text></g></g><g transform="translate(150,87)"></g></g></g></svg>
```
1, 1
```
1, 2 1, 3 1, 4 1, 5 2, 0 2, 1 2, 2 2, 3 2, 4 2, 5 3, 0 3, 1 3, 2 3, 3 3, 4 3, 5 4, 0 4, 1 4, 2 4, 3 4, 4 4, 5 5, 0 5, 1 5, 2 5, 3 5, 4 5, 5 6, 0 6, 1 6, 2 6, 3 6, 4 6, 5 7, 0 7, 1 7, 2 7, 3 7, 4 7, 5

“even-q” vertical layout  
shoves even columns down

### Cube coordinates

Another way to look at hexagonal grids is to see that there are *three* primary axes, unlike the *two* we have for square grids. There's an elegant symmetry with these.

Let's take a cube grid and **slice** out a diagonal plane at `x + y + z = 0`. This is a *weird* idea but it helps us with hex grid algorithms:

1. 3D cartesian coordinates follow standard vector operations: we can add/subtract coordinates, multiply/divide by a scalar, etc. We can reuse these operations with hexagonal grids. Offset coordinates do not support these operations.
2. 3D cartesian coordinates have existing algorithms like distances, rotation, reflection, line drawing, conversion to/from screen coordinates, etc. We can adapt these algorithms to work on hexagonal grids.

Study how the cube coordinates work on the hex grid. Selecting the hexes will highlight the cube coordinates corresponding to the three axes.

1. Each direction on the cube grid corresponds to a *line* on the hex grid. Try highlighting a hex with `r` at 0, 1, 2, 3 to see how these are related. The row is marked in blue. Try the same for `q` (green) and `s` (purple).
2. Each direction on the hex grid is a combination of *two* directions on the cube grid. For example, northwest on the hex grid lies between the `+s` and `-r`, so every step northwest involves adding 1 to `s` and subtracting 1 from `r`. We'll use this to calculate [neighbors](#neighbors).

The cube coordinates are a reasonable choice for a hex grid coordinate system. The constraint is that `q + r + s = 0` so the algorithms must preserve that. The constraint also ensures that there's a canonical coordinate for each hex.

### Axial coordinates

The axial coordinate system, sometimes called “trapezoidal” or “oblique” or “skewed”, is **the same as the cube system** except we don't *store* the `s` coordinate. Since we have a constraint `q + r + s = 0`, we can calculate `s = -q-r` when we need it.

The axial/cube system allows us to add, subtract, multiply, and divide with hex coordinates. The offset coordinate systems do not allow this, and that's part of what makes algorithms simpler with axial/cube coordinates.

### Doubled coordinates

Consider doubled instead of offset coordinates. It makes many of the algorithms easier to implement. Instead of alternation, the doubled coordinates *double* either the horizontal or vertical step size. It has a constraint `(col + row) mod 2 == 0`. In the horizontal (pointy top hex) layout it increases the column by 2 each hex; in the vertical (flat top hex) layout it increases the row by 2 each hex. This allows the in-between values for the hexes that are halfway in between:

<svg viewBox="-106.60254037844388 -120 1339.038105676658 1140"><g fill="white" stroke="black"><g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>4</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>6</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>8</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(750,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>10</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(900,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>12</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(0,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>5</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>7</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(600,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>9</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(750,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>11</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(900,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>13</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(-150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>2</tspan></text></g></g><g transform="translate(0,346)"></g></g></g></svg>
```
2, 2
```
4, 2 6, 2 8, 2 10, 2 12, 2 1, 3 3, 3 5, 3 7, 3 9, 3 11, 3 13, 3 0, 4 2, 4 4, 4 6, 4 8, 4 10, 4 12, 4 1, 5 3, 5 5, 5 7, 5 9, 5 11, 5 13, 5 0, 6 2, 6 4, 6 6, 6 8, 6 10, 6 12, 6

“double-width” horizontal layout  
doubles column values

<svg viewBox="-120 -106.60254037844388 1290 1165.8330249197702"><g fill="white" stroke="black"><g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(0,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(0,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(0,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>6</tspan></text></g></g> <g transform="translate(0,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>8</tspan></text></g></g> <g transform="translate(0,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>10</tspan></text></g></g> <g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>7</tspan></text></g></g> <g transform="translate(150,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>9</tspan></text></g></g> <g transform="translate(150,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>11</tspan></text></g></g> <g transform="translate(300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>0</tspan></text></g></g><g transform="translate(300,173)"></g></g></g></svg>
```
2, 2
```
2, 4 2, 6 2, 8 2, 10 3, 1 3, 3 3, 5 3, 7 3, 9 3, 11 4, 0 4, 2 4, 4 4, 6 4, 8 4, 10 5, 1 5, 3 5, 5 5, 7 5, 9 5, 11 6, 0 6, 2 6, 4 6, 6 6, 8 6, 10 7, 1 7, 3 7, 5 7, 7 7, 9 7, 11

“double-height” horizontal layout  
doubles row values

I haven't found much information about this system — tri-bit.com called it [interlaced](https://web.archive.org/web/20090205120106/http://sc.tri-bit.com/Hex_Grids) <sup>[4]</sup>, rot.js calls it [double width](https://ondras.github.io/rot.js/manual/#hex/indexing) <sup>[5]</sup>, and [this paper](https://www.researchgate.net/publication/235779843_Storage_and_addressing_scheme_for_practical_hexagonal_image_processing?_sg=flKEA6rk1KmOpC4LBjQJN_-NBuiR1KJtJt-XeYRXnd0z_MNUrB2gjb2FKV3iBoKg988P2xHCpQ) <sup>[6]</sup> calls it rectangular. Other possible names: brick or checkerboard. I'm not sure what to call it. Tamás Kenéz sent me the core algorithms (neighbors, distances, etc.). If you have any references, please send them to me.

### Others

In [previous versions of this document](https://www.redblobgames.com/grids/hexagons-v2/), I used `x y z` for Cartesian coordinates and `x` `z` `y` for hexagonal coordinates. That was confusing. I now use `x y z` for Cartesian coordinates and `q r s` for hexagonal coordinates.

There are *many* different valid cube hex coordinate systems. Some of them have constraints other than `q + r + s = 0`. I've shown only one of the many systems. There are also *many* different valid axial hex coordinate systems, found by using reflections and rotations. Some have the 120° axis separation as shown here and some have a 60° axis separation.

There are also cube systems that use `q-r, r-s, s-q`. One of the interesting properties of that system is that it reveals [hexagonal directions](https://www.redblobgames.com/grids/hexagons/directions.html).

In addition to the [flat spiral coordinate systems](#rings-spiral-coordinates) shown later on this page, there are nested/recursive spiral systems. See [this question](https://gamedev.stackexchange.com/questions/71785/converting-between-spiral-honeycomb-mosaic-and-axial-hex-coordinates) <sup>[7]</sup> on stackoverflow, or this [Spiral Architecture for Machine Vision](https://opus.lib.uts.edu.au/bitstream/2100/280/11/02Whole.pdf) <sup>[8]</sup> (1996), or this [diagram about "generalized balanced ternary" coordinates](https://web.archive.org/web/20120303114550/http://www.pyxisinnovation.com/pyxwiki/index.php?title=Generalized_Balanced_Ternary) <sup>[9]</sup>, or this [An isomorphism between the p-adic integers and a ring associated with a tiling of N-space by permutohedra](https://www.sciencedirect.com/science/article/pii/0166218X9200186P) <sup>[10]</sup> (1994) ([DOI](https://doi.org/10.1016/0166-218X\(92\)00186-P) <sup>[11]</sup>), or this [discussion on reddit](https://old.reddit.com/r/gamedev/comments/19wmvn/a_data_structure_for_a_game_board_with_hexagonal/c8s9qbe/) <sup>[12]</sup>. There's a [Clojure library](https://github.com/SimonWailand/hexwrench) <sup>[13]</sup> implementing Generalized Balanced Ternary. Also see the Gosper Curve, [here](https://patricksurry.github.io/posts/flowsnake/) <sup>[14]</sup> and [here](https://metacpan.org/pod/Math::PlanePath::FlowsnakeCentres) <sup>[15]</sup>.

### Recommendations

What do I recommend?

<table><thead><tr><th></th><th>Offset</th><th>Doubled</th><th>Axial</th><th>Cube</th></tr></thead><tbody><tr><th>Pointy rotation</th><td>evenr, oddr</td><td>doublewidth</td><td rowspan="2">axial</td><td rowspan="2">cube</td></tr><tr><th>Flat rotation</th><td>evenq, oddq</td><td>doubleheight</td></tr><tr><th>Other rotations</th><td colspan="2">no</td><td colspan="2">yes</td></tr><tr><th>Vector operations (add, subtract, scale)</th><td>no</td><td>yes</td><td>yes</td><td>yes</td></tr><tr><th>Array storage</th><td>rectangular</td><td>no <sup>*</sup></td><td>rhombus <sup>*</sup></td><td>no <sup>*</sup></td></tr><tr><th>Hash storage</th><td colspan="2">any shape</td><td colspan="2">any shape</td></tr><tr><th>Hexagonal symmetry</th><td>no</td><td>no</td><td>no</td><td>yes</td></tr><tr><th>Easy algorithms</th><td>few</td><td>some</td><td>most</td><td>most</td></tr></tbody></table>

<sup>*</sup> rectangular maps require an adapter, shown in the [map storage section](#map-storage)

My recommendation: if you are only going to use rectangular maps, consider the **Doubled** or **Offset** system that matches your map orientation. For maps with any other shaped maps, use **Axial** / **Cube**. Note that Axial (`q,r`) and Cube (`q,r,s`) are essentially the same system. Store coordinates as Axial, and calculate `s` in algorithms that need it.

## Coordinate conversion

It is likely that you will use axial or offset coordinates in your project, but many algorithms are simpler to express in axial/cube coordinates. Therefore you need to be able to convert back and forth.

### Axial coordinates

Axial and Cube coordinates are essentially the same system. In the Cube system, we store the third coordinate, `s`. In the Axial system, we calculate it as needed, `s = -q-r`.

```
function cube_to_axial(cube):
    var q = cube.q
    var r = cube.r
    return Hex(q, r)

function axial_to_cube(hex):
    var q = hex.q
    var r = hex.r
    var s = -q-r
    return Cube(q, r, s)
```

Converting between the systems like this is probably overkill. If you're using Cube and need Axial, ignore the `s` coordinate. If you're using Axial and need Cube, calculate the `s` coordinate only in the algorithms that need it.

### Offset coordinates

Determine which type of offset system you use; \*- **r** are pointy top; \*- **q** are flat top. The conversion is different for each.

```
function axial_to_oddr(hex):
    var parity = hex.r&1
    var col = hex.q + (hex.r - parity) / 2
    var row = hex.r
    return OffsetCoord(col, row)

function oddr_to_axial(hex):
    var parity = hex.row&1
    var q = hex.col - (hex.row - parity) / 2
    var r = hex.row
    return Hex(q, r)
```

Convert to/from or.

Implementation note: I use `a&1` ([bitwise and](https://en.wikipedia.org/wiki/Bitwise_operation#AND) <sup>[16]</sup>) instead of `a%2` ([modulo](https://en.wikipedia.org/wiki/Modulo_operation) <sup>[17]</sup>) to detect whether something is even (0) or odd (1), because it works with negative numbers too. See a longer explanation on [my implementation notes page](https://www.redblobgames.com/grids/hexagons/implementation.html#offset).

### Doubled coordinates

Compared to offset coordinates, Double height coordinates double the `row`. Double width coordinates double the `col`.

<svg viewBox="50 -550 3000 2000"><text x="550" y="-500">axial flat</text> <g transform="translate(550,0)" fill="white" stroke="black"><g><g><g transform="translate(-300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-2</text></g> <g transform="translate(52,30)"><text dy="10">-1</text></g> <g transform="translate(-52,30)"><text dy="10">+3</text></g></g></g></g> <g transform="translate(-300,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-2</text></g> <g transform="translate(52,30)"><text dy="10">0</text></g> <g transform="translate(-52,30)"><text dy="10">+2</text></g></g></g></g> <g transform="translate(-300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-2</text></g> <g transform="translate(52,30)"><text dy="10">+1</text></g> <g transform="translate(-52,30)"><text dy="10">+1</text></g></g></g></g> <g transform="translate(-300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-2</text></g> <g transform="translate(52,30)"><text dy="10">+2</text></g> <g transform="translate(-52,30)"><text dy="10">0</text></g></g></g></g> <g transform="translate(-300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-2</text></g> <g transform="translate(52,30)"><text dy="10">+3</text></g> <g transform="translate(-52,30)"><text dy="10">-1</text></g></g></g></g> <g transform="translate(-150,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-1</text></g> <g transform="translate(52,30)"><text dy="10">-1</text></g> <g transform="translate(-52,30)"><text dy="10">+2</text></g></g></g></g> <g transform="translate(-150,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-1</text></g> <g transform="translate(52,30)"><text dy="10">0</text></g> <g transform="translate(-52,30)"><text dy="10">+1</text></g></g></g></g> <g transform="translate(-150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-1</text></g> <g transform="translate(52,30)"><text dy="10">+1</text></g> <g transform="translate(-52,30)"><text dy="10">0</text></g></g></g></g> <g transform="translate(-150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-1</text></g> <g transform="translate(52,30)"><text dy="10">+2</text></g> <g transform="translate(-52,30)"><text dy="10">-1</text></g></g></g></g> <g transform="translate(0,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">0</text></g> <g transform="translate(52,30)"><text dy="10">-2</text></g> <g transform="translate(-52,30)"><text dy="10">+2</text></g></g></g></g> <g transform="translate(0,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">0</text></g> <g transform="translate(52,30)"><text dy="10">-1</text></g> <g transform="translate(-52,30)"><text dy="10">+1</text></g></g></g></g><g transform="translate(0,0)"></g></g></g></g></svg>
```
qrs
```
0 +1 \-1 0 +2 \-2 +1 \-2 +1 +1 \-1 0 +1 0 \-1 +1 +1 \-2 +2 \-3 +1 +2 \-2 0 +2 \-1 \-1 +2 0 \-2 +2 +1 \-3 doubled height \-2, -4 \-2, -2 \-2, 0 \-2, +2 \-2, +4 \-1, -3 \-1, -1 \-1, +1 \-1, +3 0, -4 0, -2
```
col, row
```
0, +2 0, +4 +1, -3 +1, -1 +1, +1 +1, +3 +2, -4 +2, -2 +2, 0 +2, +2 +2, +4 offset odd-q \-2, -2 \-2, -1 \-2, 0 \-2, +1 \-2, +2 \-1, -2 \-1, -1 \-1, 0 \-1, +1 0, -2 0, -1
```
col, row
```
0, +1 0, +2 +1, -2 +1, -1 +1, 0 +1, +1 +2, -2 +2, -1 +2, 0 +2, +1 +2, +2 axial pointy \-1 \-2 +3 0 \-2 +2 +1 \-2 +1 +2 \-2 0 +3 \-2 \-1 \-1 \-1 +2 0 \-1 +1 +1 \-1 0 +2 \-1 \-1 \-2 0 +2 \-1 0 +1 q r s +1 0 \-1 +2 0 \-2 \-2 +1 +1 \-1 +1 0 0 +1 \-1 +1 +1 \-2 \-3 +2 +1 \-2 +2 0 \-1 +2 \-1 0 +2 \-2 +1 +2 \-3 doubled width \-4, -2 \-2, -2 0, -2 +2, -2 +4, -2 \-3, -1 \-1, -1 +1, -1 +3, -1 \-4, 0 \-2, 0 col, row +2, 0 +4, 0 \-3, +1 \-1, +1 +1, +1 +3, +1 \-4, +2 \-2, +2 0, +2 +2, +2 +4, +2 offset odd-r \-2, -2 \-1, -2 0, -2 +1, -2 +2, -2 \-2, -1 \-1, -1 0, -1 +1, -1 \-2, 0 \-1, 0 col, row +1, 0 +2, 0 \-2, +1 \-1, +1 0, +1 +1, +1 \-2, +2 \-1, +2 0, +2 +1, +2 +2, +2
```
function doubleheight_to_axial(hex):
    var q = hex.col
    var r = (hex.row - hex.col) / 2
    return Hex(q, r)

function axial_to_doubleheight(hex):
    var col = hex.q
    var row = 2 * hex.r + hex.q
    return DoubledCoord(col, row)

function doublewidth_to_axial(hex):
    var q = (hex.col - hex.row) / 2
    var r = hex.row
    return Hex(q, r)

function axial_to_doublewidth(hex):
    var col = 2 * hex.q + hex.r
    var row = hex.r
    return DoubledCoord(col, row)
```

Convert to/from or.

To convert from doubled to offset, chain the calls, e.g. `axial_to_oddq(doublewidth_to_axial(hex))`, or inline the call to write a direct conversion function. I include the direct conversion functions in the sample code in the [implementation guide](https://www.redblobgames.com/grids/hexagons/implementation.html#codegen).

## Neighbors

Given a hex, which 6 hexes are neighboring it? As you might expect, the answer is simplest with cube coordinates, still pretty simple with axial coordinates, and slightly trickier with offset coordinates. We might also want to calculate the 6 “diagonal” hexes.

### Cube coordinates

Moving one space in hex coordinates involves changing one of the 3 cube coordinates by +1 and changing another one by -1 (the sum must remain 0). There are 3 possible coordinates to change by +1, and 2 remaining that could be changed by -1. This results in 6 possible changes. Each corresponds to one of the hexagonal directions. The simplest and fastest approach is to precompute the permutations and put them into a table of `Cube(dq, dr, ds)`:

```
var cube_direction_vectors = [
    Cube(+1, 0, -1), Cube(+1, -1, 0), Cube(0, -1, +1), 
    Cube(-1, 0, +1), Cube(-1, +1, 0), Cube(0, +1, -1), 
]

function cube_direction(direction):
    return cube_direction_vectors[direction]

function cube_add(hex, vec):
    return Cube(hex.q + vec.q, hex.r + vec.r, hex.s + vec.s)

function cube_neighbor(cube, direction):
    return cube_add(cube, cube_direction(direction))
```

With the Cube coordinate systems, we can store *differences* between two coordinates (a "vector"), and then add those differences back to a coordinate to get another coordinate. That's what the `cube_add` function does. Axial and Doubled coordinates also support this, but the Offset coordinates do not.

### Axial coordinates

Since axial is the same as cube except not storing the third coordinate, the code is the same as the previous section except we won't write out the third coordinate:

```
var axial_direction_vectors = [
    Hex(+1, 0), Hex(+1, -1), Hex(0, -1), 
    Hex(-1, 0), Hex(-1, +1), Hex(0, +1), 
]

function axial_direction(direction):
    return axial_direction_vectors[direction]

function axial_add(hex, vec):
    return Hex(hex.q + vec.q, hex.r + vec.r)

function axial_neighbor(hex, direction):
    return axial_add(hex, axial_direction(direction))
```

### Offset coordinates

As with cube and axial coordinates, we'll build a table of the numbers we need to add to `col` and `row`. However **offset coordinates can't be safely subtracted and added**. For example, moving southeast from (0, 0) takes us to (0, +1), so we might put (0, +1) into the table for moving southeast. But moving southeast from (0, +1) takes us to (+1, +2), so we would need to put (+1, +1) into that table. *The amount we need to add depends on where in the grid we are*.

Since the movement vector is different for odd and even columns/rows, we will need two separate lists of neighbors. **Pick a grid type** to see the corresponding code.

```
var oddr_direction_differences = [
    // even rows
    [[+1,  0], [ 0, -1], [-1, -1], 
     [-1,  0], [-1, +1], [ 0, +1]],
    // odd rows
    [[+1,  0], [+1, -1], [ 0, -1], 
     [-1,  0], [ 0, +1], [+1, +1]],
]

function oddr_offset_neighbor(hex, direction):
    var parity = hex.row & 1
    var diff = oddr_direction_differences[parity][direction]
    return OffsetCoord(hex.col + diff[0], hex.row + diff[1])
```
**Pick a grid type:**

Using the above lookup tables is the easiest way to to calculate neighbors. It's also possible to [derive these numbers](https://www.redblobgames.com/grids/hexagons/derive-hex-neighbor-formula.html), for those of you who are curious.

### Doubled coordinates

Unlike offset coordinates, the neighbors for doubled coordinates do *not* depend on which column/row we're on. They're the same everywhere, like axial/cube coordinates. Also unlike offset coordinates, we can safely subtract and add doubled coordinates, which makes them easier to work with than offset coordinates.

```
var doublewidth_direction_vectors = [
    DoubledCoord(+2,  0), DoubledCoord(+1, -1), 
    DoubledCoord(-1, -1), DoubledCoord(-2,  0), 
    DoubledCoord(-1, +1), DoubledCoord(+1, +1), 
]

function doublewidth_add(hex, diff):
    return DoubleCoord(hex.col + diff.col, hex.row + diff.row)

function doublewidth_neighbor(hex, direction):
    var vec = doublewidth_direction_vectors[direction]
    return doublewidth_add(hex, vec)
```
**Pick a grid type:**

### Diagonals

Moving to a “diagonal” space in hex coordinates changes one of the 3 cube coordinates by ±2 and the other two by ∓1 (the sum must remain 0).

```
var cube_diagonal_vectors = [
    Cube(+2, -1, -1), Cube(+1, -2, +1), Cube(-1, -1, +2), 
    Cube(-2, +1, +1), Cube(-1, +2, -1), Cube(+1, +1, -2), 
]

function cube_diagonal_neighbor(cube, direction):
    return cube_add(cube, cube_diagonal_vectors[direction])
```

As before, you can convert these into axial by dropping one of the three coordinates, or convert to offset/doubled by precalculating the results.

## Distances

### Cube coordinates

Since cube hexagonal coordinates are based on 3D cube coordinates, we can *adapt* the distance calculation to work on hexagonal grids. Each hexagon corresponds to a cube in 3D space. Adjacent hexagons are distance 1 apart in the hex grid but distance 2 apart in the cube grid. For every 2 steps in the cube grid, we need only 1 step in the hex grid. In the 3D cube grid, Manhattan distances are `abs(dx) + abs(dy) + abs(dz)`. The distance on a hex grid is half that:

```
function cube_subtract(a, b):
    return Cube(a.q - b.q, a.r - b.r, a.s - b.s)

function cube_distance(a, b):
    var vec = cube_subtract(a, b)
    return (abs(vec.q) + abs(vec.r) + abs(vec.s)) / 2
    // or: (abs(a.q - b.q) + abs(a.r - b.r) + abs(a.s - b.s)) / 2
```

An equivalent way to write this is by noting that one of the three coordinates must be the sum of the other two, then picking that one as the distance. You may prefer the “divide by two” form above, or the “max” form here, but they give the same result:

```
function cube_subtract(a, b):
    return Cube(a.q - b.q, a.r - b.r, a.s - b.s)

function cube_distance(a, b):
    var vec = cube_subtract(a, b)
    return max(abs(vec.q), abs(vec.r), abs(vec.s))
    // or: max(abs(a.q - b.q), abs(a.r - b.r), abs(a.s - b.s))
```

The maximum of the three coordinates is the distance.

<svg viewBox="-799.4228634059948 -799.4228634059948 1598.8457268119896 1598.8457268119896" style="max-width: 37.5rem;"><g fill="white" stroke="black"><g><g transform="translate(-600,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-4</text></g> <g transform="translate(52,30)"><text dy="10">0</text></g> <g transform="translate(-52,30)"><text dy="10">+4</text></g></g></g></g> <g transform="translate(-600,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-4</text></g> <g transform="translate(52,30)"><text dy="10">+1</text></g> <g transform="translate(-52,30)"><text dy="10">+3</text></g></g></g></g> <g transform="translate(-600,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-4</text></g> <g transform="translate(52,30)"><text dy="10">+2</text></g> <g transform="translate(-52,30)"><text dy="10">+2</text></g></g></g></g> <g transform="translate(-600,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-4</text></g> <g transform="translate(52,30)"><text dy="10">+3</text></g> <g transform="translate(-52,30)"><text dy="10">+1</text></g></g></g></g> <g transform="translate(-600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-4</text></g> <g transform="translate(52,30)"><text dy="10">+4</text></g> <g transform="translate(-52,30)"><text dy="10">0</text></g></g></g></g> <g transform="translate(-450,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-3</text></g> <g transform="translate(52,30)"><text dy="10">-1</text></g> <g transform="translate(-52,30)"><text dy="10">+4</text></g></g></g></g> <g transform="translate(-450,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-3</text></g> <g transform="translate(52,30)"><text dy="10">0</text></g> <g transform="translate(-52,30)"><text dy="10">+3</text></g></g></g></g> <g transform="translate(-450,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-3</text></g> <g transform="translate(52,30)"><text dy="10">+1</text></g> <g transform="translate(-52,30)"><text dy="10">+2</text></g></g></g></g> <g transform="translate(-450,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-3</text></g> <g transform="translate(52,30)"><text dy="10">+2</text></g> <g transform="translate(-52,30)"><text dy="10">+1</text></g></g></g></g> <g transform="translate(-450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-3</text></g> <g transform="translate(52,30)"><text dy="10">+3</text></g> <g transform="translate(-52,30)"><text dy="10">0</text></g></g></g></g> <g transform="translate(-450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-3</text></g> <g transform="translate(52,30)"><text dy="10">+4</text></g> <g transform="translate(-52,30)"><text dy="10">-1</text></g></g></g></g> <g transform="translate(-300,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-2</text></g> <g transform="translate(52,30)"><text dy="10">-2</text></g> <g transform="translate(-52,30)"><text dy="10">+4</text></g></g></g></g> <g transform="translate(-300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><g><g transform="translate(0,-60)"><text dy="10">-2</text></g> <g transform="translate(52,30)"><text dy="10">-1</text></g> <g transform="translate(-52,30)"><text dy="10">+3</text></g></g></g></g><g transform="translate(-300,-173)"></g></g></g></svg>
```
-20+2
```
```
-2+1+1
```
```
-2+20
```
\-2 +3 \-1 \-2 +4 \-2 \-1 \-3 +4 \-1 \-2 +3
```
-1-1+2
```
\-1 0 +1 \-1 +1 0
```
-1+2-1
```
\-1 +3 \-2 \-1 +4 \-3 0 \-4 +4 0 \-3 +3
```
0-2+2
```
0 \-1 +1 q r s 0 +1 \-1
```
0+2-2
```
0 +3 \-3 0 +4 \-4 +1 \-4 +3 +1 \-3 +2
```
+1-2+1
```
+1 \-1 0 +1 0 \-1
```
+1+1-2
```
+1 +2 \-3 +1 +3 \-4 +2 \-4 +2 +2 \-3 +1
```
+2-20
```
```
+2-1-1
```
```
+20-2
```
+2 +1 \-3 +2 +2 \-4 +3 \-4 +1 +3 \-3 0 +3 \-2 \-1 +3 \-1 \-2 +3 0 \-3 +3 +1 \-4 +4 \-4 0 +4 \-3 \-1 +4 \-2 \-2 +4 \-1 \-3 +4 0 \-4 flat pointy

Xiangguo Li's 2013 paper [*Storage and addressing scheme for practical hexagonal image processing.*](https://scholar.google.com/scholar?q=Storage+and+addressing+scheme+for+practical+hexagonal+image+processing)<sup>[18]</sup> ([DOI](https://doi.org/10.1117/1.JEI.22.1.010502) <sup>[19]</sup>) gives a formula for Euclidean distance, which can be adapted to axial coordinates: `sqrt(dq² + dr² + dq*dr)`.

### Axial coordinates

In the axial system, the third coordinate is implicit. We can always [convert](#conversions) axial to cube to calculate distance:

```
function axial_distance(a, b):
    var ac = axial_to_cube(a)
    var bc = axial_to_cube(b)
    return cube_distance(ac, bc)
```

Once we inline those functions it ends up as:

```
function axial_distance(a, b):
    return (abs(a.q - b.q) 
          + abs(a.q + a.r - b.q - b.r)
          + abs(a.r - b.r)) / 2
```

which can also be written:

```
function axial_subtract(a, b):
    return Hex(a.q - b.q, a.r - b.r)

function axial_distance(a, b):
    var vec = axial_subtract(a, b)
    return (abs(vec.q)
          + abs(vec.q + vec.r)
          + abs(vec.r)) / 2
```

There are lots of different ways to write hex distance in axial coordinates. No matter which way you write it, *axial hex distance is derived from the Mahattan distance on cubes*. For example, the [“difference of differences”](https://web.archive.org/web/20210302023226/http://3dmdesign.com/development/hexmap-coordinates-the-easy-way) <sup>[20]</sup> formula results from writing `a.q + a.r - b.q - b.r` as `a.q - b.q + a.r - b.r`, and using “max” form instead of the “divide by two” form of `cube_distance`. They're all equivalent once you see the connection to cube coordinates.

### Offset coordinates

As with axial coordinates, we'll [convert](#conversions) offset coordinates to axial/cube coordinates, then use axial/cube distance.

```
function offset_distance(a, b):
    var ac = offset_to_axial(a)
    var bc = offset_to_axial(b)
    return axial_distance(ac, bc)
```

We'll use the same pattern for many of the algorithms: convert offset to axial/cube, run the axial/cube version of the algorithm, and convert any axial/cube results back to offset coordinates. There are also more direct formulas for distances; see [the rot.js manual](https://ondras.github.io/rot.js/manual/#hex/indexing) <sup>[21]</sup> for a formula in the "Odd shift" section.

### Doubled coordinates

Although converting doubled coordinates to axial/cube coordinates works, there's also a direct formula for distances, from the [rot.js manual](https://ondras.github.io/rot.js/manual/#hex/indexing) <sup>[22]</sup>:

```
function doublewidth_distance(a, b):
    var dcol = abs(a.col - b.col)
    var drow = abs(a.row - b.row)
    return drow + max(0, (dcol - drow)/2)

function doubleheight_distance(a, b):
    var dcol = abs(a.col - b.col)
    var drow = abs(a.row - b.row)
    return dcol + max(0, (drow − dcol)/2)
```

## Line drawing

How do we draw a line from one hex to another? I use [linear interpolation for line drawing](https://www.redblobgames.com/grids/line-drawing/). Evenly *sample* the line at `N+1` points, and figure out which hexes those samples are in.

<svg viewBox="-1145.8330249197702 -1145.8330249197702 2291.6660498395404 2291.6660498395404" style="max-width: 37.5rem;"><g fill="white" stroke="black"><g><g transform="translate(-900,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-433)"></g><g transform="translate(-750,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-346)"></g><g transform="translate(-600,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-260)"></g><g transform="translate(-450,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-173)"></g><g transform="translate(-300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-87)"></g><g transform="translate(-150,87)"></g><g transform="translate(-150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,173)"></g><g transform="translate(0,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,260)"></g><g transform="translate(150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,346)"></g><g transform="translate(300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,433)"></g><g transform="translate(450,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,520)"></g><g transform="translate(600,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g></g><path d="M -750 -433.0127018922193 L 600 519.6152422706632" fill="none" stroke="currentColor"></path><circle r="15" cx="-749.99985" cy="-433.0122688795174" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="-614.9998499999999" cy="-337.7494744632291" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="-479.99985" cy="-242.4866800469409" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="-344.9998499999999" cy="-147.22388563065266" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="-209.99984999999998" cy="-51.96109121436443" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="-74.99985" cy="43.30170320192381" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="60.000149999999984" cy="138.56449761821204" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="195.00014999999993" cy="233.8272920345003" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="330.0001500000001" cy="329.0900864507886" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="465.00015" cy="424.3528808670768" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle><circle r="15" cx="600.00015" cy="519.615675283365" fill="hsl(240, 50%, 50%)" stroke="hsl(0, 0%, 100%, 0.5)" stroke-width="10"></circle></g><g transform="translate(1145.8330249197702,1145.8330249197702) scale(1.3)"><g transform="translate(-175,-50) scale(0.5)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em">flat</text></g> <g transform="translate(-75,-50) rotate(-30) scale(0.5)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" transform="rotate(30)">pointy</text></g></g></svg>

1. First we calculate `N` =10 to be the [hex distance](#distances) between the endpoints.
2. Then evenly sample `N+1` points between point `A` and point `B`. Using linear interpolation, each point will be `A + (B - A) * 1.0/N * i`, for values of `i` from `0` to `N`, inclusive. In the diagram these sample points are the dark blue dots. This results in floating point coordinates.
3. Convert each sample point (float) back into a hex (int). The algorithm is called [cube\_round](#rounding).

Putting these together to draw a line from `A` to `B`:

```
function lerp(a, b, t):
    return a + (b - a) * t

function cube_lerp(Cube a, Cube b, float t):
    return Cube(lerp(a.q, b.q, t),
                lerp(a.r, b.r, t),
                lerp(a.s, b.s, t))

function cube_linedraw(Cube a, Cube b):
    int N = cube_distance(a, b)
    Array<Cube> results = []
    for each 0 ≤ i ≤ N:
        results.append(cube_round(cube_lerp(a, b, 1.0/N * i)))
    return results
```

More notes:

- There are times when `cube_lerp` will return a point that's exactly on the side between two hexes. Then `cube_round` will push it one way or the other. The *lines will look better* if it's always pushed in the same direction. You can do this by adding an "epsilon" hex `Cube(1e-6, 2e-6, -3e-6)` to one or both of the endpoints before starting the loop. This will "nudge" the line in one direction to avoid landing on side boundaries.
- The [DDA Algorithm](https://en.wikipedia.org/wiki/Digital_differential_analyzer_\(graphics_algorithm\)) <sup>[23]</sup> on square grids sets `N` to the max of the distance along each axis. We do the same in cube space, which happens to be the same as the hex grid distance.
- There are times when this algorithm slightly goes outside the marked hexagons ([example](https://www.redblobgames.com/grids/hexagons/blog/hex-line-outside-hexagons.png)). I haven't come up with an easy fix for this.
- The `cube_lerp` function needs to return a cube with float coordinates. If you're working in a statically typed language, you won't be able to use the `Cube` type but instead could define `FloatCube`, or inline the function into the line drawing code if you want to avoid defining another type.
- You can optimize the code by inlining `cube_lerp`, and then calculating `B.q-A.q`, `B.r-A.r`, `B.s-A.s`, and `1.0/N` outside the loop. Multiplication can be turned into repeated addition. You'll end up with something like the DDA algorithm.
- This code can be adapted to work with axial coordinates — define `axial_lerp` and then use `axial_distance`, `axial_round` in `axial_linedraw`. It is likely it can work with doubled coordinates as well.
- I use axial or cube coordinates for line drawing, but if you want something for offset coordinates, take a look at [zvold's blog post](https://zvold.blogspot.com/2010/02/line-of-sight-on-hexagonal-grid.html) <sup>[24]</sup>.
- There are many variants of line drawing. Sometimes you'll want ["super cover"](https://stackoverflow.com/questions/3233522/elegant-clean-special-case-straight-line-grid-traversal-algorithm) <sup>[25]</sup>. Someone sent me hex super cover line drawing code but I haven't studied it yet.
- A paper from Yong-Kui, Liu, *The Generation of Straight Lines on Hexagonal Grids*, Computer Graphics Forum 12-1 (Feb 1993) ([DOI](https://doi.org/10.1111/1467-8659.1210027) <sup>[26]</sup>), describes a variant of Bresenham's line drawing algorithm for hexagonal grids. The same author has another paper, *The Generation of Circular Arcs on Hexagonal Grids* ([DOI](https://doi.org/10.1111/1467-8659.1210021) <sup>[27]</sup>).

## Movement Range

### Coordinate range

Given a hex `center` and a range N, which hexes are within N steps from it?

We can work backwards from the [hex distance](#distances) formula, `distance = max(abs(q), abs(r), abs(s))`. To find all hexes within N steps, we need `max(abs(q), abs(r), abs(s)) ≤ N`. This means we need *all* three to be true: `abs(q) ≤ N` and `abs(r) ≤ N` and `abs(s) ≤ N`. Removing absolute value, we get `-N ≤ q ≤ +N` and `-N ≤ r ≤ +N` and `-N ≤ s ≤ +N`. In code it's a nested loop:

```
var results = []
for each -N ≤ q ≤ +N:
    for each -N ≤ r ≤ +N:
        for each -N ≤ s ≤ +N:
            if q + r + s == 0:
                results.append(cube_add(center, Cube(q, r, s)))
```

This loop will work but it's somewhat inefficient. Of all the values of `s` we loop over, only one of them actually satisfies the `q + r + s = 0` constraint on cubes. Instead, let's directly calculate the value of `s` that satisfies the constraint:

```
var results = []
for each -N ≤ q ≤ +N:
    for each max(-N, -q-N) ≤ r ≤ min(+N, -q+N):
        var s = -q-r
        results.append(cube_add(center, Cube(q, r, s)))
```

This loop iterates over exactly the needed coordinates. In the diagram, each range is a pair of lines. Each line is an inequality (a [half-plane](http://devmag.org.za/2013/08/31/geometry-with-hex-coordinates/) <sup>[28]</sup>). We pick all the hexes that satisfy all six inequalities. This loop also works nicely with axial coordinates:

```
var results = []
for each -N ≤ q ≤ +N:
    for each max(-N, -q-N) ≤ r ≤ min(+N, -q+N):
        results.append(axial_add(center, Hex(q, r)))
```

### Intersecting ranges

If you need to find hexes that are in more than one range, you can intersect the ranges before generating a list of hexes.

You can either think of this problem algebraically or geometrically. Algebraically, each hexagonally-shaped region is expressed as inequality constraints of the form `-N ≤ dq ≤ +N`, and we're going to solve for the intersection of those constraints. Geometrically, each region is a cube in 3D space, and we're going to intersect two cubes in 3D space to form a [cuboid](https://en.wikipedia.org/wiki/Cuboid) <sup>[29]</sup> in 3D space, then project back to the `q + r + s = 0` plane to get hexes. I'm going to solve it algebraically:

First, we rewrite constraint `-N ≤ dq ≤ +N` into a more general form, `q<sub>min</sub> ≤ q ≤           q<sub>max</sub>`. Set `q<sub>min</sub> = center.q           - N` and `q<sub>max</sub> = center.q + N`. Do the same for `r` and `s`, and end up with this generalization of the code from the previous section:

```
var results = []
for each qmin ≤ q ≤ qmax:
    for each max(rmin, -q-smax) ≤ r ≤ min(rmax, -q-smin):
        results.append(Hex(q, r))
```

The intersection of two ranges `lo1 ≤ v ≤ hi1` and `lo2 ≤ v ≤ hi2` is `max(lo1, lo2) ≤ v ≤ min(hi1,           hi2)`. Since a hex region is expressed as ranges over `q,           r, s`, we can separately intersect each of the `q, r, s` ranges then use the nested loop. For one hex region we set `q<sub>min</sub> = H.q - N` and `q<sub>max</sub> = H.q + N` and likewise for `r` and `s`. For intersecting two hex regions we set `q<sub>min</sub> = max(H<sub>1</sub>.q -           N, H<sub>2</sub>.q - N)` and `q<sub>max</sub> =           min(H<sub>1</sub>.q + N, H<sub>2</sub>.q + N)`, and likewise for `r` and `s`. The same pattern works for intersecting three or more regions, and can generalize to [other shapes](http://devmag.org.za/2013/08/31/geometry-with-hex-coordinates/) <sup>[30]</sup> (triangles, trapezoids, rhombuses, non-regular hexagons).

### Obstacles

If there are obstacles, the simplest thing to do is a distance-limited flood fill ([breadth first search](https://www.redblobgames.com/pathfinding/tower-defense/)). In the code, `fringes[k]` is an array of all hexes that can be reached in `k` steps. Each time through the main loop, we expand level `k-1` into level `k`. This works equally well with any of the hex coordinate systems (cube, axial, offset, doubled).

```
function hex_reachable(Hex start, int movement):
    Set<Hex> visited = {}
    visited.add(start)
    Array<Array<Hex>> fringes = []
    fringes.append([start])

    for each 1 ≤ k ≤ movement:
        fringes.append([])
        for each hex in fringes[k-1]:
            for each 0 ≤ dir < 6:
                Hex neighbor = hex_neighbor(hex, dir)
                if neighbor not in visited and not blocked:
                    add neighbor to visited
                    fringes[k].append(neighbor)

    return visited
```

## Rotation

Given a hex vector (difference between one hex and another), we might want to rotate it to point to a different hex. This is simple with cube coordinates if we stick with rotations of 1/6th of a circle.

A rotation 60° right (clockwise ↻) shoves each coordinate one slot to the left ←:

```
[ q,  r,  s]
to        [-r, -s, -q]
to           [  s,  q,  r]
```

A rotation 60° left (counter-clockwise ↺) shoves each coordinate one slot to the right →:

```
[ q,  r,  s]
to    [-s, -q, -r]
to [r,  s,  q]
```

As you play with diagram, notice that each 60° rotation *flips* the signs and also physically “rotates” the coordinates. Take a look at the axis legend on the bottom left to see how this works. After a 120° rotation the signs are flipped back to where they were. A 180° rotation flips the signs but the coordinates have rotated back to where they originally were.

Here's the full recipe for rotating a position `hex` around a center position `center` to result in a new position `rotated`:

1. [Convert](#conversions) positions `hex` and `center` to cube coordinates.
2. Calculate a *vector* by subtracting the center: `vec = cube_subtract(hex, center) = Cube(hex.q - center.q, hex.r - center.r, hex.s - center.s)`.
3. Rotate the vector `vec` as described above, and call the resulting vector `rotated_vec`.
4. Convert the vector back to a position by adding the center: `rotated = cube_add(rotated_vec, center) = Cube(rotated_vec.q + center.q, rotated_vec.r + center.r, rotated_vec.s + center.s)`.
5. [Convert](#conversions) the cube position `rotated` back to to your preferred coordinate system.

It's several conversion steps but each step is short. You can shortcut some of these steps by defining rotation directly on axial coordinates, but hex vectors don't work for offset coordinates and I don't know a shortcut for offset coordinates. Also see [this stackexchange discussion](https://gamedev.stackexchange.com/questions/15237/how-do-i-rotate-a-structure-of-hexagonal-tiles-on-a-hexagonal-grid/) <sup>[31]</sup> for other ways to calculate rotation.

## Reflection

Given a hex, we might want to reflect it across one of the axes. With cube coordinates, we *swap* the coordinates that *aren't* the axis we're reflecting over. The axis we're reflecting over stays the same.

Reflection axis:

```
function reflectQ(h) { return Cube(h.q, h.s, h.r); }
function reflectR(h) { return Cube(h.s, h.r, h.q); }
function reflectS(h) { return Cube(h.r, h.q, h.s); }
```

To reach the other two reflections, *negate* the coordinates of the original and the first reflection. These are shown as white arrows in the diagram.

To reflect over a line that's not at 0, pick a reference point on that line. Subtract the reference point, perform the reflection, then add the reference point back.

## Rings

### Single ring

To find out whether a given hex is on a ring of a given `radius`, calculate the distance from that hex to the center and see if it's `radius`. To get a list of all such hexes, take `radius` steps away from the center, then follow the rotated vectors in a path around the ring.

```
function cube_scale(hex, factor):
    return Cube(hex.q * factor, hex.r * factor, hex.s * factor)

function cube_ring(center, radius):
    var results = []
    // this code doesn't work for radius == 0; can you see why?
    var hex = cube_add(center,
                        cube_scale(cube_direction(4), radius))
    for each 0 ≤ i < 6:
        for each 0 ≤ j < radius:
            results.append(hex)
            hex = cube_neighbor(hex, i)
    return results
```

In this code, `hex` starts out on the ring, shown by the large arrow from the center to the corner in the diagram. I chose corner 4 to start with because it lines up the way my direction numbers work but you may need a different starting corner. At each step of the inner loop, `hex` moves one hex along the ring. After a circumference of `6 * radius` steps it ends up back where it started.

The scale, add, and neighbor operations also work on axial and doubled coordinates, so the same algorithm can be used. For offset coordinates, convert to one of the other formats, generate the ring, and convert back.

### Spiral rings

Traversing the `N` rings one by one in a spiral pattern, we can fill in the interior:

```
function cube_spiral(center, radius):
    var results = list(center)
    for each 1 ≤ k ≤ radius:
        results = list_append(results, cube_ring(center, k))
    return results
```

Spirals also give us a way to *count* how many hexagon tiles are in the larger hexagon. The center is 1 hex. The circumference of the k-th ring is `6 * k` hexes. The sum for N rings is `1 + 6 * sum(1 to N)`. Using [this formula](https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF) <sup>[32]</sup>, that simplifies to `1 + 3 * N * (N+1)`. For, there will be

`61`

hexes.

Visiting the hexes this way can also be used to calculate [movement range](#range).

### Spiral coordinates

Following the spiral path above lets us build one of many *spiral coordinate systems*:

The main ingredients we need are the radius (`spiralindex_to_radius`), start of each ring (`spiralindex_start_of_ring`), start of each segment, and position within the segments.

```
function spiralindex_start_of_ring(radius):
    return 1 + 3 * radius * (radius - 1)

function spiralindex_to_radius(index):
    // solve for 'radius' in equation: index = 1 + 3 * radius * (radius-1)
    return floor((sqrt(12 * index - 3) + 3) / 6)

function spiral_to_cube(index):
    center = Hex(0, 0, 0)
    radius = spiralindex_to_radius(index)
    ringstart = spiralindex_start_of_ring(radius)
    return cube_ring(center, radius)[index - ringstart]

function cube_to_spiral(hex):
    center = Hex(0, 0, 0)
    radius = cube_distance(hex, center)
    ring_hexes = cube_ring(center, radius)
    for each 0 ≤ i < ring_hexes.length:
        if hex == ring_hexes[i]:
             return i + spiralindex_start_of_ring(radius)
```

To convert form a cube/axial coordinate to a spiral index is trickier. In the example `cube_to_spiral` function I linearly search the hexes in a ring, but this can be optimized.

I haven't yet used any of the spiral coordinate systems in a real project. There are many possible variants, including [outside-in](https://x.com/BEBischof/status/969813312341917697) <sup>[33]</sup>, 1-based, making sure numbers are adjacent, alternating clockwise/counterclockwise, and probably more. See [ljedrz/hex-spiral](https://github.com/ljedrz/hex-spiral/) <sup>[34]</sup> and [lucidBrot/hexgridspiral](https://github.com/lucidBrot/hexgridspiral?tab=readme-ov-file#coordinate-systems) <sup>[35]</sup> for some implementations.

## Field of view

Given a location and a distance, what is visible from that location, not blocked by obstacles? The simplest way to do this is to draw a line to every hex that's in range. If the line doesn't hit any walls, then you can see the hex. Mouse over a hex to see the line being drawn to that hex, and which walls it hits.

This algorithm can be slow for large areas but it's so easy to implement that it's what I recommend starting with.

<svg viewBox="-1492.2431864335456 -1492.2431864335456 2984.486372867091 2984.486372867091" style="max-width: 37.5rem;"><g fill="white" stroke="black"><g><g transform="translate(-1200,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1200,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-1050,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-900,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-750,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-600,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-450,1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-1212)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-300,1212)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-1299)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(-150,1299)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-1386)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-1212)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,1212)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(0,1386)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-1299)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(150,1299)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-1212)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(300,1212)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-606)"></g><g transform="translate(450,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(450,1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(600,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(750,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(900,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,-779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,-606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1050,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,-693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g><g transform="translate(1200,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon></g></g></g><circle r="20" cx="0.00015000000000000001" cy="0.00043301270189221924" fill="none" stroke="currentColor"></circle><circle r="20" cx="90.00015000000002" cy="-121.2431235171195" fill="none" stroke="currentColor"></circle><circle r="20" cx="180.00015" cy="-242.48668004694088" fill="none" stroke="currentColor"></circle><circle r="20" cx="270.00014999999996" cy="-363.7302365767623" fill="none" stroke="currentColor"></circle><circle r="20" cx="360.0001500000001" cy="-484.9737931065837"></circle><circle r="20" cx="450.00014999999996" cy="-606.217349636405"></circle>/&gt; </g><g transform="translate(1492.2431864335456,1492.2431864335456) scale(1.5)"><g transform="translate(-175,-50) scale(0.5)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em">flat</text></g> <g transform="translate(-75,-50) rotate(-30) scale(0.5)"><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" transform="rotate(30)">pointy</text></g></g></svg>

There are many different ways to define what's "visible". Do you want to be able to see the center of the other hex from the center of the starting hex? Do you want to see any part of the other hex from the center of the starting point? Maybe any part of the other hex from any part of the starting point? Are there obstacles that occupy less than a complete hex? Field of view turns out to be trickier and more varied than it might seem at first. Start with the simplest algorithm, but expect that it may not compute exactly the answer you want for your project. There are even situations where the simple algorithm produces results that are illogical.

[Clark Verbrugge's guide](http://www-cs-students.stanford.edu/~amitp/Articles/HexLOS.html) <sup>[36]</sup> describes a “start at center and move outwards” algorithm to calculate field of view. Also see [my article on 2D visibility calculation](https://www.redblobgames.com/articles/visibility/) for an algorithm that works on polygons, including hexagons. For grids, the roguelike community has a nice set of algorithms for square grids (see [Roguelike Vision Algorithms](https://www.adammil.net/blog/v125_Roguelike_Vision_Algorithms.html) <sup>[37]</sup> and [Pre-Computed Visibility Tries](https://www.roguebasin.com/index.php/Pre-Computed_Visibility_Tries) <sup>[38]</sup> and [Field of Vision](https://www.roguebasin.com/index.php/Field_of_Vision) <sup>[39]</sup>); some of them might be adapted for hex grids.

## Hex to pixel

For hex to pixel, it's useful to review the [size and spacing diagram](#basics) at the top of the page where we defined the `horiz` and `vert` spacing between adjacent hexagons.

### Axial coordinates

For axial coordinates, the way to think about hex to pixel conversion is to look at the *basis vectors*. The arrow (0,0)→(1,0) is the q basis vector (x=sqrt(3), y=0) and (0,0)→(0,1) is the r basis vector (x=sqrt(3)/2, y=3/2). The pixel coordinate is `q_basis * q + r_basis * r`. For example, the hex at (1,1) is the sum of 1 q vector and 1 r vector. A hex at (3,2) would be the sum of 3 q vectors and 2 r vectors.

The code for or is:

```
function pointy_hex_to_pixel(hex):
    // hex to cartesian
    var x = (sqrt(3) * hex.q  +  sqrt(3)/2 * hex.r)
    var y = (                         3./2 * hex.r)
    // scale cartesian coordinates
    x = x * size
    y = y * size
    return Point(x, y)
```

This can also be viewed as a matrix multiply, where the basis vectors are the columns of the matrix:

```
⎡x⎤            ⎡ sqrt(3)   sqrt(3)/2 ⎤   ⎡q⎤
⎢ ⎥  =  size × ⎢                     ⎥ × ⎢ ⎥
⎣y⎦            ⎣    0          3/2   ⎦   ⎣r⎦
```

The matrix approach will come in handy later when we want to [convert pixel coordinates back to hex coordinates](#pixel-to-hex). To invert the process of hex-to-pixel into a pixel-to-hex process, we will invert the hex-to-pixel matrix into a pixel-to-hex matrix.

### Offset coordinates

For offset coordinates, we need to offset either the column or row number (it will no longer be an integer).

```
function oddr_offset_to_pixel(hex):
    // hex to cartesian
    var x = sqrt(3) * (hex.col + 0.5 * (hex.row&1))
    var y =    3./2 * hex.row
    // scale cartesian coordinates
    x = x * size
    y = y * size
    return Point(x, y)
```

Unfortunately offset coordinates don't have basis vectors that we can use with a matrix. This is one reason [pixel-to-hex](#pixel-to-hex) conversions are harder with offset coordinates.

Another approach is to convert the offset coordinates into axial coordinates, then use the axial to pixel conversion. By inlining the conversion code then optimizing, it will end up being the same as above.

### Doubled coordinates

Doubled makes many algorithms simpler than offset.

```
function doublewidth_to_pixel(hex):
    // hex to cartesian
    var x = sqrt(3)/2 * hex.col
    var y =      3./2 * hex.row
    // scale cartesian coordinates
    x = x * size
    y = y * size
    return Point(x, y)

function doubleheight_to_pixel(hex):
    // hex to cartesian
    var x =      3./2 * hex.col
    var y = sqrt(3)/2 * hex.row
    // scale cartesian coordinates
    x = x * size
    y = y * size
    return Point(x, y)
```

### Mod: non-zero origin

Some projects have grids that are not centered at 0,0. We can adapt any of the hex-to-pixel functions above by *chaining* one additional operation to the end:

```
function *_to_pixel(hex):
    // hex to cartesian
    …
    // scale cartesian coordinates
    …
    // translate cartesian coordinates
    x = x + origin.x
    y = y + origin.y
    return Point(x, y)
```

Later, [when converting pixel to hex](#pixel-to-hex-mod-origin), we'll undo this by subtracting the origin at the beginning.

### Mod: pixel sizes

Some projects need hexagons to fit a specific size. We can use the formulas from the [Geometry](#basics) section of this page to change the scaling for any of the hex-to-pixel functions to *separately* multiply by x and y scales.

Desired size ✕ in pixels

```
function *_to_pixel(hex):
    // hex to cartesian
    …
    // scale cartesian coordinates
    x = x * (17 / sqrt(3))
    y = y * (24 / 2.)
```

or

Later, [when converting pixel to hex](#pixel-to-hex-mod-pixelsize), we'll undo this by dividing by the x and y scales.

To further simplify, we can *inline* the scaling into matrix multiply to cancel out the `sqrt(3)`. For example, here's the Axial code before inlining:

```
function pointy_hex_to_pixel(hex):
    // hex to cartesian
    var x = (sqrt(3) * hex.q  +  sqrt(3)/2 * hex.r)
    var y = (                         3./2 * hex.r)
    // scale cartesian coordinates
    x = x * (17 / sqrt(3))
    y = y * (24 / 2.)
    return Point(x, y)
```

Here's the inlined version with the `sqrt(3)` canceled out:

```
function pointy_hex_to_pixel(hex):
    var x = 17 * (hex.q  +  1./2 * hex.r)
    var y = 24 * (          3./4 * hex.r)
    return Point(x, y)
```

Similarly, inlining the scaling into the offset or doubled conversion will simplify the code.

## Pixel to Hex

One of the most common questions is, how do I take a pixel location (such as a mouse click) and convert it into a hex grid coordinate? I'll show how to do this for axial/cube coordinates. For offset and doubled coordinates, I first convert pixel to axial/cube, and then axial/cube to offset/doubled, but there are more direct algorithms also.

### Axial coordinates

<svg viewBox="-1000 -490 2000 980" style="max-width: 37.5rem;"><g fill="white" stroke="black"><g><g transform="translate(-1050,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-7</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(-1050,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-7</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(-1050,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-7</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(-1050,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-7</tspan>, <tspan fill="currentColor">+4</tspan></text></g></g> <g transform="translate(-1050,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-7</tspan>, <tspan fill="currentColor">+5</tspan></text></g></g> <g transform="translate(-1050,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-7</tspan>, <tspan fill="currentColor">+6</tspan></text></g></g> <g transform="translate(-1050,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-7</tspan>, <tspan fill="currentColor">+7</tspan></text></g></g> <g transform="translate(-900,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-6</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(-900,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-6</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(-900,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-6</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(-900,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-6</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(-900,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-6</tspan>, <tspan fill="currentColor">+4</tspan></text></g></g> <g transform="translate(-900,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-6</tspan>, <tspan fill="currentColor">+5</tspan></text></g></g> <g transform="translate(-900,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-6</tspan>, <tspan fill="currentColor">+6</tspan></text></g></g> <g transform="translate(-750,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-5</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(-750,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-5</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(-750,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-5</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(-750,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-5</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(-750,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-5</tspan>, <tspan fill="currentColor">+4</tspan></text></g></g> <g transform="translate(-750,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-5</tspan>, <tspan fill="currentColor">+5</tspan></text></g></g> <g transform="translate(-750,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-5</tspan>, <tspan fill="currentColor">+6</tspan></text></g></g> <g transform="translate(-600,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-4</tspan>, <tspan fill="currentColor">-1</tspan></text></g></g> <g transform="translate(-600,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-4</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(-600,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-4</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(-600,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-4</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(-600,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-4</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(-600,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-4</tspan>, <tspan fill="currentColor">+4</tspan></text></g></g> <g transform="translate(-600,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-4</tspan>, <tspan fill="currentColor">+5</tspan></text></g></g> <g transform="translate(-450,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-3</tspan>, <tspan fill="currentColor">-1</tspan></text></g></g> <g transform="translate(-450,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-3</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(-450,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-3</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(-450,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-3</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(-450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-3</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(-450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-3</tspan>, <tspan fill="currentColor">+4</tspan></text></g></g> <g transform="translate(-450,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-3</tspan>, <tspan fill="currentColor">+5</tspan></text></g></g> <g transform="translate(-300,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-2</tspan>, <tspan fill="currentColor">-2</tspan></text></g></g> <g transform="translate(-300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-2</tspan>, <tspan fill="currentColor">-1</tspan></text></g></g> <g transform="translate(-300,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-2</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(-300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-2</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(-300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-2</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(-300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-2</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(-300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-2</tspan>, <tspan fill="currentColor">+4</tspan></text></g></g> <g transform="translate(-150,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-1</tspan>, <tspan fill="currentColor">-2</tspan></text></g></g> <g transform="translate(-150,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-1</tspan>, <tspan fill="currentColor">-1</tspan></text></g></g> <g transform="translate(-150,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-1</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(-150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-1</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(-150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-1</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(-150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-1</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(-150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">-1</tspan>, <tspan fill="currentColor">+4</tspan></text></g></g> <g transform="translate(0,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">0</tspan>, <tspan fill="currentColor">-3</tspan></text></g></g> <g transform="translate(0,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">0</tspan>, <tspan fill="currentColor">-2</tspan></text></g></g> <g transform="translate(0,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">0</tspan>, <tspan fill="currentColor">-1</tspan></text></g></g> <g transform="translate(0,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">0</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(0,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">0</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(0,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">0</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(0,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">0</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(150,-433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+1</tspan>, <tspan fill="currentColor">-3</tspan></text></g></g> <g transform="translate(150,-260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+1</tspan>, <tspan fill="currentColor">-2</tspan></text></g></g> <g transform="translate(150,-87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+1</tspan>, <tspan fill="currentColor">-1</tspan></text></g></g> <g transform="translate(150,87)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+1</tspan>, <tspan fill="currentColor">0</tspan></text></g></g> <g transform="translate(150,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+1</tspan>, <tspan fill="currentColor">+1</tspan></text></g></g> <g transform="translate(150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+1</tspan>, <tspan fill="currentColor">+2</tspan></text></g></g> <g transform="translate(150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+1</tspan>, <tspan fill="currentColor">+3</tspan></text></g></g> <g transform="translate(300,-520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+2</tspan>, <tspan fill="currentColor">-4</tspan></text></g></g> <g transform="translate(300,-346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+2</tspan>, <tspan fill="currentColor">-3</tspan></text></g></g> <g transform="translate(300,-173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+2</tspan>, <tspan fill="currentColor">-2</tspan></text></g></g> <g transform="translate(300,0)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+2</tspan>, <tspan fill="currentColor">-1</tspan></text></g></g> <g transform="translate(300,173)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em" fill="currentColor"><tspan fill="currentColor">+2</tspan>, <tspan fill="currentColor">0</tspan></text></g></g><g transform="translate(300,346)"></g></g></g></svg>
```
+2,
               +1
```
+2, +2 +3, \-4 +3, \-3 +3, \-2 +3, \-1 +3, 0 +3, +1 +3, +2 +4, \-5 +4, \-4 +4, \-3 +4, \-2 +4, \-1 +4, 0 +4, +1 +5, \-5 +5, \-4 +5, \-3 +5, \-2 +5, \-1 +5, 0 +5, +1 +6, \-6 +6, \-5 +6, \-4 +6, \-3 +6, \-2 +6, \-1 +6, 0 +7, \-6 +7, \-5 +7, \-4 +7, \-3 +7, \-2 +7, \-1 +7, 0 0, +4 0, +5 +1, +4 +1, +5 +2, +3 +2, +4 +3, +3 +3, +4 +4, +2 +4, +3 +5, +2 +5, +3 +6, +1 +6, +2 +7, +1 +7, +2 \-7, \-1 \-7, 0 \-6, \-2 \-6, \-1 \-5, \-2 \-5, \-1 \-4, \-3 \-4, \-2 \-3, \-3 \-3, \-2 \-2, \-4 \-2, \-3 \-1, \-4 \-1, \-3 0, \-5 0, \-4
1. First we *invert* the hex to pixel conversion. This will give us a *fractional* hex coordinate, shown as a small red circle in the diagram.
2. Then we find the hex containing the fractional hex coordinate, shown as the highlighted hex in the diagram.

To convert from [hex coordinates to pixel coordinates](#hex-to-pixel), we multiplied `q, r` by *basis vectors* to get `x, y`. This was a matrix multiply:

```
⎡x⎤            ⎛ ⎡ sqrt(3)   sqrt(3)/2 ⎤   ⎡q⎤ ⎞
⎢ ⎥  =  size × ⎜ ⎢                     ⎥ × ⎢ ⎥ ⎥
⎣y⎦            ⎝ ⎣    0          3/2   ⎦   ⎣r⎦ ⎠
```

To invert the hex-to-pixel process into a pixel-to-hex process we first invert the scaling, then [invert the pointy-top hex-to-pixel matrix](https://www.wolframalpha.com/input/?i=inv+%7B%7Bsqrt%283%29%2C+sqrt%283%29%2F2%7D%2C+%7B0%2C+3%2F2%7D%7D) <sup>[40]</sup> into a pixel-to-hex matrix:

```
⎡q⎤     ⎡ sqrt(3)/3     -1/3 ⎤   ⎛ ⎡x⎤        ⎞
⎢ ⎥  =  ⎢                    ⎥ × ⎜ ⎢ ⎥ ÷ size ⎥
⎣r⎦     ⎣     0          2/3 ⎦   ⎝ ⎣y⎦        ⎠
```

This calculation will give us fractional axial coordinates (floats) for `q` and `r`. The [axial\_round()](#rounding) function will convert the fractional axial coordinates into integer axial hex coordinates. Here's the code:

```
function pixel_to_pointy_hex(point):
    // invert the scaling
    var x = point.x / size
    var y = point.y / size
    // cartesian to hex
    var q = (sqrt(3)/3 * x  -  1./3 * y)
    var r = (                  2./3 * y)
    return axial_round(Hex(q, r))
```

Code for: or

This algorithm reuses the round() function needed in line drawing. I'm making a [list of other algorithms](https://www.redblobgames.com/grids/hexagons/more-pixel-to-hex.html) that don't use the round() function.

### Offset coordinates

If you use offset coordinates, you can convert to pixel to axial, then axial to offset. There are also more direct algorithms that I need to study; browse [this list](https://www.redblobgames.com/grids/hexagons/more-pixel-to-hex.html#more). In one project I used [a pixel map](https://www.redblobgames.com/grids/hexagons/more-pixel-to-hex.html#pixel-map), an precomputed array of pixels that stores the hex coordinate at each.

### Doubled coordinates

The [hex-to-pixel](#hex-to-pixel-doubled) algorithm for doubled coordinates is a straight multiply, so the pixel-to-hex will divide by those same amounts. After that, we need to round to the nearest hex. I haven't worked that out yet for doubled coordinates.

### Mod: non-zero origin

For hex-to-pixel, we implemented [a non-zero origin](#hex-to-pixel-mod-origin) by inserting an addition at the *end* of the chain. To invert this operation, we need to insert a subtraction at the *beginning* of the chain:

```
function *_to_hex(point):
    // invert the addition
    x = x - origin.x
    y = y - origin.y
    // invert the scaling
    …
    // cartesian to hex
    …
```

This pattern is not limited to hexagons. Any chain of operations p → A → B → C → q can be inverted by inverting each individual operation and performing them in reverse order: q → C⁻¹ → B⁻¹ → A⁻¹ → p.

### Mod: pixel sizes

For hex-to-pixel, we implemented [non-uniform scaling](#hex-to-pixel-mod-pixelsize) by changing the multiplying by `size` to multiplying by a different scale for x and y. To invert this operation, we need to divide by those scaling values:

```
function *_to_hex(point):
    // invert the scaling
    x = x / (17 / sqrt(3))
    y = y / (24 / 2.)
    // cartesian to hex
    …
```

Similar to hex-to-pixel, inlining the scaling into the matrix multiply will simplify the code by canceling out the `sqrt(3)`. It's easier to reason about the code when the steps are separate, so I start out with separate code before combining the steps.

## Rounding to nearest hex

Sometimes we'll end up with a *floating-point* cube coordinate, and we'll want to know which hex it should be in. This comes up in [line drawing](#line-drawing) and [pixel to hex](#pixel-to-hex). Converting a floating point value to an integer value is called *rounding* so I call this algorithm `cube_round`.

Just as with integer cube coordinates, `frac.q + frac.r + frac.s = 0` with fractional (floating point) cube coordinates. We can round each component to the nearest integer, `q = round(frac.q); r = round(frac.r); s = round(frac.s)`. However, after rounding we do *not* have a guarantee that `q + r + s = 0`. We do have a way to correct the problem: *reset* the component with the largest change back to what the constraint `q + r + s = 0` requires. For example, if the r-change `abs(r-frac.r)` is larger than `abs(q-frac.q)` and `abs(s-frac.s)`, then we reset `r = -q-s`. This guarantees that `q + r + s = 0`. Here's the algorithm:

```
function cube_round(frac):
    var q = round(frac.q)
    var r = round(frac.r)
    var s = round(frac.s)

    var q_diff = abs(q - frac.q)
    var r_diff = abs(r - frac.r)
    var s_diff = abs(s - frac.s)

    if q_diff > r_diff and q_diff > s_diff:
        q = -r-s
    else if r_diff > s_diff:
        r = -q-s
    else:
        s = -q-r

    return Cube(q, r, s)
```

For non-cube coordinates, the simplest thing to do is to [convert to cube coordinates](#conversions), use the rounding algorithm, then convert back:

```
function axial_round(hex):
    return cube_to_axial(cube_round(axial_to_cube(hex)))
```

The same would work if you have `oddr`, `evenr`, `oddq`, or `evenq` instead of `axial`. Jacob Rus has a [direct implementation of axial\_round](https://observablehq.com/@jrus/hexround) <sup>[42]</sup> without converting to cube first.

Implementation note: `cube_round` and `axial_round` take *float* coordinates instead of *int* coordinates. If you've written a Cube and Hex class, they'll work fine in dynamically typed languages where you can pass in floats instead of ints, and they'll also work fine in statically typed languages with a unified number type. However, in most statically typed languages, you'll need a separate class/struct type for float coordinates, and `cube_round` will have type `FloatCube → Cube`. If you also need `axial_round`, it will be `FloatHex → Hex`, using helper function `floatcube_to_floathex` instead of `cube_to_hex`. In languages with parameterized types (C++, Haskell, etc.) you might define `Cube<T>` where `T` is either `int` or `float`. Alternatively, you could write `cube_round` to take three floats as inputs instead of defining a new type just for this function.

This algorithm is based on [Charles Fu's article from 1994](http://www-cs-students.stanford.edu/~amitp/Articles/Hexagon2.html) <sup>[43]</sup>. His code contains the additional optimization that if `rx + ry + rz = 0` there's no need to look at the error values and reset the largest component.

Patrick Surry has a [visualization showing why the rounding algorithm works](https://blocks.roadtolarissa.com/patricksurry/0603b407fa0a0071b59366219c67abca) <sup>[44]</sup>. Martin R. Han has a [different visualization showing why the rounding algorithm works](https://www.desmos.com/3d/86szmiocif) <sup>[45]</sup>.

## Map storage in axial coordinates

One of the common complaints about the axial coordinate system is that it leads to wasted space when using a rectangular map; that's one reason to favor an offset coordinate system. However all the hex coordinate systems lead to wasted space when using a triangular or hexagonal map. We can use the same strategies for storing all of them.

<svg viewBox="-110 -200 3150 1200" style="max-width: 75rem;"><g transform="translate(0, 0)" fill="white" stroke="black"><g><g><g transform="translate(0,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(0,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(0,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(0,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>0</tspan>, <tspan>6</tspan></text></g></g> <g transform="translate(150,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(150,606)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(150,779)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(150,953)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(150,1126)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>1</tspan>, <tspan>6</tspan></text></g></g> <g transform="translate(300,346)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>1</tspan></text></g></g> <g transform="translate(300,520)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>2</tspan></text></g></g> <g transform="translate(300,693)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>3</tspan></text></g></g> <g transform="translate(300,866)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>4</tspan></text></g></g> <g transform="translate(300,1039)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>5</tspan></text></g></g> <g transform="translate(300,1212)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>2</tspan>, <tspan>6</tspan></text></g></g> <g transform="translate(450,260)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>0</tspan></text></g></g> <g transform="translate(450,433)"><g><polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon><text dy="0.4em"><tspan>3</tspan>, <tspan>1</tspan></text></g></g><g transform="translate(450,606)"></g></g></g></g></svg>
```
3, 2
```
3, 3 3, 4 3, 5 3, 6 4, 0 4, 1 4, 2 4, 3 4, 4 4, 5 5, 0 5, 1 5, 2 5, 3 5, 4 6, 0 6, 1 6, 2 6, 3 r = 0 (null) (null) (null) 3, 0 4, 0 5, 0 6, 0 r = 1 (null) (null) 2, 1 3, 1 4, 1 5, 1 6, 1 r = 2 (null) 1, 2 2, 2
```
3, 2
```
4, 2 5, 2 6, 2 r = 3 0, 3 1, 3 2, 3 3, 3 4, 3 5, 3 6, 3 r = 4 0, 4 1, 4 2, 4 3, 4 4, 4 5, 4 (null) r = 5 0, 5 1, 5 2, 5 3, 5 4, 5 (null) (null) r = 6 0, 6 1, 6 2, 6 3, 6 (null) (null) (null) q = 0 q = 1 q = 2 q = 3 q = 4 q = 5 q = 6

Shape:  
Switch to

Notice in the diagram that the wasted space is on the left and right sides of each row (except for rhombus maps) This gives us three strategies for storing the map:

1. Use a **2D Array**. Use nulls or some other sentinel at the unused spaces. Store `Hex(q, r)` at `array[r][q]`. At most there's a factor of two for these common shapes; it may not be worth using a more complicated solution.
2. Use a **hash table** instead of dense array. This allows arbitrarily shaped maps, including ones with holes. Store `Hex(q, r)` in `hash_table(hash(q, r))`.
3. Use an **array of arrays** by sliding row to the left, and shrinking the rows to the minimum size. For pointy-top hexes, store `Hex(q, r)` in `array[r - first_row][q - first_column(r)]`. Some examples for the map shapes above:
	- **Rectangle**. Store `Hex(q, r)` at `array[r][q + floor(r/2)]`. Each row has the same length. This is equivalent to odd-r offset.
		- **Hexagon**. Store `Hex(q, r)` at `array[r][q - max(0, N-r)]`. Row `r` has size `2*N+1 - abs(N-r)`.
		- **Rhombus**. Conveniently, `first_row` and `first_column(r)` are both 0. Store `Hex(q, r)` at `array[r][q]`. All rows are the same length.
		- **Down-triangle**. Store `Hex(q, r)` at `array[r][q]`. Row `r` has size `N+1-r`.
		- **Up-triangle**. Store `Hex(q, r)` at `array[r][q - N+1+r]`. Row `r` has size `1+r`.
	For flat-top hexes, swap the roles of the rows and columns, and use `array[q - first_column][r - first_row(q)]`.

Encapsulate access into the getter/setter in a map class so that the rest of the game doesn't need to know about the map storage. Your maps may not look exactly like these, so you will have to adapt one of these approaches.

## Wraparound maps

Sometimes you may want the map to “wrap” around the edges. In a square map, you can either wrap around the x-axis only (roughly corresponding to a sphere) or both x- and y-axes (roughly corresponding to a torus). Wraparound depends on the map shape, not the tile shape. To wrap around a rectangular map is easy with offset coordinates. I'll show how to wrap around a hexagon-shaped map with cube coordinates.

Corresponding to the center of the map, there are six “mirror” centers. When you go off the map, you subtract the mirror center closest to you until you are back on the main map. In the diagram, try exiting the center map, and watch one of the mirrors enter the map on the opposite side.

The simplest implementation is to precompute the answers. Make a lookup table storing, for each hex just off the map, the corresponding cube on the other side. For each of the six mirror centers `M`, and each of the locations on the map `L`, store `mirror_table[cube_add(M, L)] = L`. Then any time you calculate a hex that's in the mirror table, replace it by the unmirrored version. See [stackoverflow](https://gamedev.stackexchange.com/a/137603/2472) <sup>[46]</sup> for another approach.

For a hexagonal shaped map with radius `N`, the mirror centers will be `Cube(2*N+1, -N, -N-1)` and its [six rotations](#rotation).

Related: Sander Evers has a [nice explanation of how to combine small hexagons into a grid of large hexagons](https://observablehq.com/@sanderevers/hexagon-tiling-of-an-hexagonal-grid) <sup>[47]</sup> and also a [coordinate system to represent small hexagons within a larger one](https://observablehq.com/@sanderevers/hexmod-representation) <sup>[48]</sup>.

## Pathfinding

If you're using graph-based pathfinding such as A\* or Dijkstra's algorithm or Floyd-Warshall, pathfinding on hex grids isn't different from pathfinding on square grids. The explanations and code from [my pathfinding tutorial](https://www.redblobgames.com/pathfinding/a-star/introduction.html) <sup>[49]</sup> will work equally well on hexagonal grids.

Mouse overTouch a hex in the diagram to see the path to it. Click or drag to toggle walls.

1. **Neighbors**. The sample code I provide in the pathfinding tutorial calls `graph.neighbors` to get the neighbors of a location. Use the function in the [neighbors](#neighbors) section for this. Filter out the neighbors that are impassable.
2. **Heuristic**. The sample code for A\* uses a `heuristic` function that gives a distance between two locations. Use the [distance formula](#distances), scaled to match the movement costs. For example if your movement cost is 5 per hex, then multiply the distance by 5.

## More

I have an [**guide to implementing your own hex grid library**](https://www.redblobgames.com/grids/hexagons/implementation.html), including sample code in C++, Python, C#, Haxe, Java, Javascript, Typescript, Lua, and Rust. I also link to existing libraries for C# (including Unity), Java, Objective C, Swift, Python, Ruby, and other languages.

- The best early guide I saw to the axial coordinate system was [Clark Verbrugge's guide](http://www-cs-students.stanford.edu/~amitp/Articles/HexLOS.html) <sup>[50]</sup>, written in 1996.
- The first time I saw the cube coordinate system was from [Charles Fu's posting to rec.games.programmer](http://www-cs-students.stanford.edu/~amitp/Articles/Hexagon2.html) <sup>[51]</sup> in 1994.
- [DevMag has a nice visual overview of hex math](http://devmag.org.za/2013/08/31/geometry-with-hex-coordinates/) <sup>[52]</sup> including how to represent areas such as half-planes, triangles, and quadrangles. There's a [PDF article](https://www.gamelogic.co.za/downloads/HexMath2.pdf) <sup>[53]</sup> that goes into more detail. **Highly recommended**! The [GameLogic Grids](https://gamelogic.co.za/grids/documentation-contents/quick-start-tutorial/gamelogics-hex-grids-for-unity-and-amit-patels-guide-for-hex-grids/) <sup>[54]</sup> library implements these and many other grid types in Unity.
- In my [Guide to Grids](https://www.redblobgames.com/grids/parts/), I cover axial coordinate systems to address square, triangle, and hexagon sides and corners, and algorithms for the relationships among tiles, sides, and corners. I also show how square and hex grids are related.
- [James McNeill has a nice visual explanation of grid transformations](https://playtechs.blogspot.com/2007/04/hex-grids.html) <sup>[55]</sup>.
- [Overview of hex coordinate types](https://web.archive.org/web/20090205120106/http://sc.tri-bit.com/Hex_Grids) <sup>[56]</sup>: staggered (offset), interlaced, 3D (cube), and trapezoidal (axial).
- Hexnet explains how the [correspondence between hexagons and cubes](https://hexnet.org/content/permutohedron) <sup>[57]</sup> goes much deeper than what I described on this page, generalizing to higher dimensions.
- [The Rot.js library](https://ondras.github.io/rot.js/manual/#hex/indexing) <sup>[58]</sup> has a list of hex coordinate systems: non-orthogonal (axial), odd shift (offset), double width (interlaced), cube.
- [Range for cube coordinates](https://stackoverflow.com/questions/2049196/generating-triangular-hexagonal-coordinates-xyz) <sup>[59]</sup>: given a distance, which hexagons are that distance from the given one?
- [Distances on hex grids](https://archive.ph/20141214082648/http://keekerdc.com/2011/03/hexagon-grids-coordinate-systems-and-distance-calculations/) <sup>[60]</sup> using cube coordinates, and reasons to use cube coordinates instead of offset.
- [This guide](https://web.archive.org/web/20130608235236/https://www.br-gs.com/tutorial/hexagon-grid.html) <sup>[61]</sup> explains the basics of measuring and drawing hexagons, using an offset grid.
- [Convert cube hex coordinates to pixel coordinates](https://stackoverflow.com/questions/2459402/hexagonal-grid-coordinates-to-pixel-coordinates) <sup>[62]</sup>.
- [This thread](https://gamedev.stackexchange.com/questions/51264/get-ring-of-tiles-in-hexagon-grid) <sup>[63]</sup> explains how to generate rings.
- Are there [pros and cons of “pointy top” and “flat top” hexagons](https://gamedev.stackexchange.com/questions/49718/vertical-vs-horizontal-hex-grids-pros-and-cons) <sup>[64]</sup>?
- [Line of sight in a hex grid](https://web.archive.org/web/20121113035227/http://arges-systems.com/blog/2011/01/10/hex-grid-line-of-sight-revisited/) <sup>[65]</sup> with offset coordinates, splitting hexes into triangles
- I printed out the PDF hex grids from [this page](https://incompetech.com/graphpaper/hexagonal/) <sup>[66]</sup> while working out some of the algorithms.
- [Hexagonal Image Processing](https://link.springer.com/book/10.1007/1-84628-203-9) <sup>[67]</sup> ([DOI](https://doi.org/10.1007/1-84628-203-9) <sup>[68]</sup>) is an entire book that uses a hierarchical hexagonal coordinate system.
- This is the oldest reference I can find for axial grids: Luczak, E. and Rosenfeld, A., *Distance on a Hexagonal Grid*. IEEE Transactions on Computers (1976) ([DOI](https://doi.org/10.1109/TC.1976.1674642) <sup>[69]</sup>) It calls the axial system *oblique coordinates* and the offset systems *pseudohexagonal grids*.
- Snyder, Qi, Sander's paper *Coordinate system for hexagonal pixels* ([DOI](https://doi.org/10.1117/12.348629) <sup>[70]</sup>) describes gradients, diffusion, and map storage for axial coordinates. Mersereau's paper *The processing of hexagonally sampled two-dimensional signals* ([DOI](https://doi.org/10.1109/PROC.1979.11356) <sup>[71]</sup>) describes signal processing on axial coordinates.
- There's a paper that calls cube coordinates *\*R3 coordinates*: Her, Innchyn, *Geometric Transformations on the Hexagonal Grid*, IEEE Transactions on Image Processing (1995) ([DOI](https://doi.org/10.1109/83.413166) <sup>[72]</sup>) It covers coordinates, correspondence to cube coordinates, rounding, reflections, scaling, shearing, and rotation. A paper from the same author ([DOI](https://doi.org/10.1115/1.2919210) <sup>[73]</sup>) covers distances.
- The [Reddit discussion](https://old.reddit.com/r/gamedev/comments/1dz1tr/) <sup>[74]</sup> and [Hacker News discussion](https://news.ycombinator.com/item?id=5809724) <sup>[75]</sup> and [MetaFilter discussion](https://www.metafilter.com/128649/Hexagonal-Grids) <sup>[76]</sup> have more comments and links.

The code that powers this page is partially procedurally generated! The core algorithms are in [lib.js](https://www.redblobgames.com/grids/hexagons/codegen/output/lib.js), generated from [my guide to implementation](https://www.redblobgames.com/grids/hexagons/implementation.html). There are a few more algorithms in [hex-algorithms.js](https://www.redblobgames.com/grids/hexagons/hex-algorithms.js). The interactive diagrams are in [diagrams.js](https://www.redblobgames.com/grids/hexagons/diagrams.js) and [index.js](https://www.redblobgames.com/grids/hexagons/index.js), using Vue.js to inject into the templates in [index.bxml](https://www.redblobgames.com/grids/hexagons/index.bxml) (xhtml I feed into a preprocessor). Code highlighting is in [code-highlighting.js](https://www.redblobgames.com/grids/hexagons/code-highlighting.js).

There are more things I want to do for this guide. I'm [keeping a list on Notion](https://redblobgames.notion.site/Hexagonal-Grids-7d2d4d624bc5483dafbe615d75ab3902) <sup>[77]</sup>. Do you have suggestions for things to change or add? Comment below.