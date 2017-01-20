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
```

### ES6
```js
  import trekk from 'trekk';
```

## API

### trekk(path, onProgress, options)

| Param | Default | Type
| --- | --- | ---
| path | `undefined` | `node`, `array` (`[start, end]`)
| onProgress | `undefined` | `function(progress)`
| options | *See [Options](#options)* | *See [Options](#options)*

Call `trekk` to create your first "timeline".
Pass an array (example: `[200, 400]`) or element as `path` for the start and end position.
Trekk will feed `onProgress` with a value from 0 to 1 that represent the current progress within `path`.

Example
```js
const header = document.querySelector('.header')

const fadeInHeader = progress => {
	header.style.opacity = progress
}

trekk(header, fadeInHeader)
```

### *trekk.*trail(path, onProgress, options)

| Param | Default | Type
| --- | --- | ---
| path | `undefined` | `node`, `array` (`[0, 0]`)
| onProgress | `undefined` | `function(progress)`
| options | *See [Options](#options)* | *See [Options](#options)*

Call `trail` after `trekk` to create a nested "timeline".
Pass an array (example: `[200, 400]`, `[0.2, 0.4]`) or element as `path` for the start and end position.
If `path` is an array, the start and end positions will be relative to that of the parent `trekk`.

Example
```js
// ...

const title = document.querySelector('.title')

const slideInTitle = progress => {
	title.style.transform = `translateX(${100 * progress})`
}

trekk(header, fadeInHeader)
	.trail(title, slideInTitle)
```

### *trekk.*stop(position, onProgress, options)

| Param | Default | Type
| --- | --- | ---
| position | `undefined` | `node`, `int`, `float`
| onProgress | `undefined` | `function(progress)`
| options | *See [Options](#options)* | *See [Options](#options)*

Call `stop` after `trekk` to create a nested "one-time" animation.
Pass an int (example: `200`), float (example: `0.2`) or element as `path` for the position.
If `path` is an int or float, the position will be relative to that of the parent `trekk`.

Example
```js
// ...

const icon = document.querySelector('.icon')

const rotateIcon = progress => {
	icon.style.transform = `rotate(${360 * progress}deg)`
}

trekk(header, fadeInHeader)
	.trail(title, slideInTitle)
	.stop(icon, rotateIcon)
```

## Options

| Param | Default | Type | Description
| --- | --- | --- | ---
| label | "Undefined Trail" | `string` | Used as a label when debugging.
| offset | 0 | `integer` | Offset in pixels to subtract from the path start and end position.
| ease | "linear" | `string`, `function(progress)` | Easing function to run before calling `onProgress`. See [Easings](#easings) for supported strings, or pass your own easing function.
| lerp | 1 | `number` | Smooth the progress given to `onProgress` with some linear interpolation. Takes a value from 0 to 1.
| log | false | `boolean` | Log each state if a trail to the console.
| onWaiting | `undefined` | `function` | Called once when the y scroll position is above the trail start position.
| onWalking | `undefined` | `function` | Called once when the y scroll position is within the trail start and end position.
| onFinished | `undefined` | `function` | Called once when the y scroll position is below the trail end position.

### Easings

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
