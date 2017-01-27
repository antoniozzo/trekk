# :triangular_flag_on_post: trekk [![npm version](https://badge.fury.io/js/trekk.svg)](https://badge.fury.io/js/trekk) [![Coverage Status](https://coveralls.io/repos/github/antoniozzo/trekk/badge.svg?branch=develop)](https://coveralls.io/github/antoniozzo/trekk?branch=develop)

## About

Trekk is a library for making scroll based animations easy-peasy. Trekk does NOT give you anything else than values between 0 and 1 to use in your animation states. The animations you create yourself, or use a library like [anime.js](https://github.com/juliangarnier/anime).

## Install

```html
<script src="https://unpkg.com/trekk@0.1.0/build/trekk.js"></script>
```

```bash
$ npm install trekk
```

## Usage

### commonJS
```js
var trekk = require('trekk');

// Define your trails...

trekk() // Start
```

### ES6
```js
import trekk, { trail } from 'trekk';

// Define your trails...

trekk() // Start
```

## API

### trekk(options)

Start trekk. You need to run this only once in your scripts.

| Param | Type | Default | Description
| --- | --- | --- | ---
| debug | `boolean` | `false` | Enter debug mode.
| iterate | `function(next)` | `requestAnimationFrame` | Update function.

### trail(...)

Use `trail` to create timelines in your document. All parameters are optional.

| Param | Type | Default | Description
| --- | --- | --- | ---
| element | `node` | `undefined` | Pass a DOM element to use as start and end position of the trail.
| startPixels | `integer` | `undefined` | Start position of the trail in pixels. If this is a nested trail this will be appended to the parent trail start position.
| endPixels | `integer` | `undefined` | End position of the trail in pixels. If this is a nested trail this will be appended to the parent trail end position.
| startPercentage | `string` | `undefined` | Start position of the trail in percentage. If this is a nested trail it will be a percentage of the parent trail length.
| endPercentage | `string` | `undefined` | End position of the trail in percentage. If this is a nested trail it will be a percentage of the parent trail length.
| progress | `function(progress)` | `undefined` | Called on update with the current progress.
| options | `object` | `{}` | *See [Options](#options)*

#### Examples

**Basic**

```js
const header = document.querySelector('header')

const fadeInHeader = progress => {
	header.style.opacity = progress
}

const headerTrail = trail(header, fadeInHeader)
```

**Nested**

```js
const header = document.querySelector('header')
const title = document.querySelector('.title')
const icon = document.querySelector('.icon')

const fadeInHeader = progress => {
	header.style.opacity = progress
}

const slideInTitle = progress => {
	title.style.transform = `translateX(${100 * progress})`
}

const rotateIcon = progress => {
	icon.style.transform = `rotate(${360 * progress}deg)`
}

const headerTrail = trail(header, fadeInHeader)
headerTrail(100, 200, slideInTitle)
headerTrail('40%', '40%', rotateIcon)
```

### addTimeline(options)

| Param | Type | Default | Description
| --- | --- | --- | ---
| options | `object` | `{}` | *See [Options](#options)*

## Options

| Param | Type | Default | Description
| --- | --- | --- | ---
| label | `string` | "Undefined" | Used as a label when debugging.
| source | `function` | `() => window.pageYOffset` | Function that returns source value.
| start | `function` | `() => 0` | Function that returns start position of timeline.
| end | `function` | 0 | Function that returns end position of timeline.
| modifier | `function` | `(p, s, e) => (p - s) / (e - s)` | Function given a source value, calculates the progress in between the start and end value.
| lerp | `number`| `1` | Smooth the progress over time with some linear interpolation. Takes a value from 0 to 1.
| ease | `string`, `function(progress)` | "linear" | Easing function to run before progress is broadcasted. See [Easings](#easings) for supported strings, or pass your own easing function.
| waiting | Called once when the y scroll position is above the trail start position.
| walking | Called once when the y scroll position is within the trail start and end position.
| finished | Called once when the y scroll position is below the trail end position.
| progress | Called every progress update with the current progress.

## Easings

```js
// linear
// easeInQuad
// easeOutQuad
// easeInOutQuad
// easeInCubic
// easeOutCubic
// easeInOutCubic
// easeInQuart
// easeOutQuart
// easeInOutQuart
// easeInQuint
// easeOutQuint
// easeInOutQuint
```

Taken from https://gist.github.com/gre/1650294
