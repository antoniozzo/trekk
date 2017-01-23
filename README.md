# :triangular_flag_on_post: trekk [![npm version](https://badge.fury.io/js/trekk.svg)](https://badge.fury.io/js/trekk) [![Coverage Status](https://coveralls.io/repos/github/antoniozzo/trekk/badge.svg?branch=)](https://coveralls.io/github/antoniozzo/trekk?branch=)

## About

Trekk is a library for making scroll based animations easy-peasy. It gives you a simple interface to setup *trails* (progress based animations) and *stops* (triggered animations). Trekk does NOT give you anything else than values between 0 and 1 to use in your animation states. The animations you create yourself, or use a library like [anime.js](https://github.com/juliangarnier/anime).

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

  // Define your timelines...

  trekk() // Start
```

### ES6
```js
  import trekk, { /* API methods */ } from 'trekk';

  // Define your timelines...

  trekk() // Start
```

## API

### fromElement(element, options)

| Param | Default | Type
| --- | --- | ---
| element | `undefined` | `node`
| options | *See [Options](#options)* | *See [Options](#options)*

Create a timeline from an elements start position and height.

Example
```js
const header = document.querySelector('.header')

const fadeInHeader = progress => {
	header.style.opacity = progress
}

fromElement(header)
	.on('progress', fadeInHeader)
```

### fromPixels(start, length, options)

| Param | Default | Type
| --- | --- | ---
| start | 0 | `number`
| length | 0 | `number`
| options | *See [Options](#options)* | *See [Options](#options)*

Create a timeline from start and length in pixels.

Example
```js
// ...

const title = document.querySelector('.title')

const slideInTitle = progress => {
	title.style.transform = `translateX(${100 * progress})`
}

fromPixels(100, 200)
	.on('progress', slideInTitle)
```

### fromPercentage(timeline, start, length, options)

| Param | Default | Type
| --- | --- | ---
| timeline | `undefined` | `object` *existing timeline*
| start | `undefined` | `float`
| length | `undefined` | `float`
| options | *See [Options](#options)* | *See [Options](#options)*

Create a timeline from start and length in percentage.
The percentage values are applied on the reference `timeline` you supply.

Example
```js
// ...

const icon = document.querySelector('.icon')

const rotateIcon = progress => {
	icon.style.transform = `rotate(${360 * progress}deg)`
}

const headerTimeline = fromElement(header)
	.on('progress', fadeInHeader)

fromPercentage(headerTimeline, 0.2, 0)
	.on('progress', rotateIcon)
```

## Options

| Param | Default | Type | Description
| --- | --- | --- | ---
| color | "green" | `string` | Used as the color of the guidelines when debugging.
| label | "Undefined" | `string` | Used as a label when debugging.
| start | 0 | `function` | Function that returns start position of timeline (in pixels).
| length | 0 | `function` | Function that returns length of timeline (in pixels).
| offset | 0 | `function` | Function that returns offset of timeline (in pixels).
| modifier | (p - v0) / v1 | `function` | Function given a source value, calculates the progress in between the start and length value.
| ease | "linear" | `string`, `function(progress)` | Easing function to run before progress is broadcasted. See [Easings](#easings) for supported strings, or pass your own easing function.
| lerp | 1 | `number` | Smooth the progress over time with some linear interpolation. Takes a value from 0 to 1.

## Events

Use `timeline.on()` to subscribe to events.

| Event | Description
| --- | ---
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
