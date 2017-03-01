(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("trekk", [], factory);
	else if(typeof exports === 'object')
		exports["trekk"] = factory();
	else
		root["trekk"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isFunction = isFunction;
exports.isObject = isObject;
exports.parsePercentage = parsePercentage;
exports.isLesserThan = isLesserThan;
exports.isGreaterThan = isGreaterThan;
exports.isInBetween = isInBetween;
exports.lerp = lerp;
exports.objectToArray = objectToArray;
exports.removeClassesFromElement = removeClassesFromElement;
exports.addClassesToElement = addClassesToElement;
exports.getElementTop = getElementTop;
/**
 * Test if {v} is a string
 */
// export function isString(v) {
// 	return typeof v === 'string'
// }

/**
 * Test if {v} is a function
 */
function isFunction(v) {
  return typeof v === 'function';
}

/**
 * Test if {v} is a number
 */
// export function isNumber(v) {
// 	return typeof v === 'number'
// }

/**
 * Test if {v} is an object
 */
function isObject(v) {
  return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object';
}

/**
 * Test if {v} is a string with a percentage
 */
// export function isPercentage(v) {
// 	return isString(v) && v.indexOf('%') !== -1
// }

/**
 * String percentage {v} to decimal format
 */
function parsePercentage(v) {
  return parseInt(v, 10) / 100;
}

/**
 * Test if {y} is lesser than {v}
 */
function isLesserThan(y, v) {
  return y < v;
}

/**
 * Test if {y} is greater than {v}
 */
function isGreaterThan(y, v) {
  return y > v;
}

/**
 * Test if {y} is greater than {v0} and lesser than {v1}
 */
function isInBetween(y, v0, v1) {
  return y >= v0 && y <= v1;
}

/**
 * Linear interpolation method.
 * Takes a {start} and {end} value and
 * return value in-between based on a {time} variable.
 * Pass true to {round} for rounding to int value.
 */
function lerp(start, end, time, round) {
  var v = start * (1 - time) + end * time;

  return round ? Math.round(v) : v;
}

/**
 * Returns an Object's values as an Array
 */
function objectToArray(object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
}

/**
 * Removes {classNames} from {element}
 */
function removeClassesFromElement(element) {
  var _element$classList;

  for (var _len = arguments.length, classNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classNames[_key - 1] = arguments[_key];
  }

  return (_element$classList = element.classList).remove.apply(_element$classList, classNames);
}

/**
 * Add {classNames} to {element}
 */
function addClassesToElement(element) {
  var _element$classList2;

  for (var _len2 = arguments.length, classNames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    classNames[_key2 - 1] = arguments[_key2];
  }

  return (_element$classList2 = element.classList).add.apply(_element$classList2, classNames);
}

/**
 * Get {element}'s top position in document
 */
function getElementTop(element) {
  var currentElement = element;
  var top = 0;

  do {
    top += currentElement.offsetTop || 0;
    currentElement = currentElement.offsetParent;
  } while (currentElement);

  return top;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.STATUS_ARRAY = exports.STATUS = undefined;

var _utilities = __webpack_require__(0);

/**
 * All available Trail statuses
 */
var STATUS = exports.STATUS = {
	// The Trail has not loaded yet.
	// Will change after calling {trekk.start}
	LOADING: 'loading',

	// The y scroll position is above the Trail start position
	WAITING: 'waiting',

	// The y scroll position is within the Trail start and end position
	WALKING: 'walking',

	// The y scroll position is below the Trail end position
	FINISHED: 'finished'
};

/**
 * All Trail statuses as an array
 */
var STATUS_ARRAY = exports.STATUS_ARRAY = (0, _utilities.objectToArray)(STATUS);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var interval = 1000;
var iteration = 0;

exports.default = function (compute) {
	var cached = void 0;
	var next = void 0;

	return function () {
		if (next !== iteration) {
			next = iteration;
			cached = compute();
		}

		return cached;
	};
};

var clear = exports.clear = function clear() {
	iteration++;
};

setInterval(function () {
	iteration++;
}, interval);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Easing Functions
 * https://gist.github.com/gre/1650294
 */
var easings = {
	// no easing, no acceleration
	linear: function linear(t) {
		return t;
	},

	// accelerating from zero velocity
	easeInQuad: function easeInQuad(t) {
		return t * t;
	},

	// decelerating to zero velocity
	easeOutQuad: function easeOutQuad(t) {
		return t * (2 - t);
	},

	// acceleration until halfway, then deceleration
	easeInOutQuad: function easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	},

	// accelerating from zero velocity
	easeInCubic: function easeInCubic(t) {
		return t * t * t;
	},

	// decelerating to zero velocity
	easeOutCubic: function easeOutCubic(t) {
		return --t * t * t + 1;
	},

	// acceleration until halfway, then deceleration
	easeInOutCubic: function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	},

	// accelerating from zero velocity
	easeInQuart: function easeInQuart(t) {
		return t * t * t * t;
	},

	// decelerating to zero velocity
	easeOutQuart: function easeOutQuart(t) {
		return 1 - --t * t * t * t;
	},

	// acceleration until halfway, then deceleration
	easeInOutQuart: function easeInOutQuart(t) {
		return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
	},

	// accelerating from zero velocity
	easeInQuint: function easeInQuint(t) {
		return t * t * t * t * t;
	},

	// decelerating to zero velocity
	easeOutQuint: function easeOutQuint(t) {
		return 1 + --t * t * t * t * t;
	},

	// acceleration until halfway, then deceleration
	easeInOutQuint: function easeInOutQuint(t) {
		return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
	}
};

exports.default = easings;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.update = undefined;

var _utilities = __webpack_require__(0);

var update = exports.update = function update(timeline, source) {
	var store = timeline.store,
	    options = timeline.options;

	var prevState = store.getState();
	var nextState = store.reduce(source);

	if (options.progress && prevState.progress !== nextState.progress) {
		options.progress(nextState.progress, timeline);
	}

	if (prevState.status !== nextState.status && (0, _utilities.isFunction)(options[nextState.status])) {
		options[nextState.status](timeline);
	}

	return nextState;
};

exports.default = function (timelines, options) {
	var enabled = true;

	var next = function next() {
		if (enabled) {
			var source = options.source() + options.offset();
			var start = +new Date();

			for (var i = 0; i < timelines.length; i += 1) {
				update(timelines[i], source);

				var end = +new Date();

				if (end - start > options.fps) {
					break;
				}
			}
		}

		options.iterate(next);
	};

	options.iterate(next);

	return {
		enable: function enable() {
			enabled = true;
		},
		disable: function disable() {
			enabled = false;
		}
	};
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.makeGuide = makeGuide;
function makeGuide(pos) {
	var guide = document.createElement('div');
	var _label = document.createElement('span');
	var _line = document.createElement('div');

	guide.style.zIndex = 999;
	guide.style.width = '100%';
	guide.style.position = 'absolute';
	guide.style.top = pos + 'px';
	guide.style.left = 0;

	_label.style.borderWidth = 0;
	_label.style.borderStyle = 'dashed';
	_label.style.position = 'absolute';
	_label.style.padding = '2px 5px';

	document.body.appendChild(guide);

	return {
		remove: function remove() {
			document.body.removeChild(guide);

			return this;
		},
		color: function color(value) {
			// guide.style.borderTopColor = value
			_line.style.borderLeftColor = value;
			_label.style.color = value;
			_label.style.borderColor = value;

			return this;
		},
		fixed: function fixed() {
			guide.style.position = 'fixed';

			return this;
		},
		label: function label(text, top) {
			_label.innerHTML = text;

			guide.appendChild(_label);

			if (top) {
				_label.style.bottom = 0;
				_label.style.borderBottomWidth = '1px';
			} else {
				_label.style.top = 0;
				_label.style.borderTopWidth = '1px';
			}

			return this;
		},
		col: function col(i) {
			guide.style.left = 20 * i + 'px';

			return this;
		},
		width: function width(w) {
			_label.style.width = w;

			return this;
		},
		line: function line(h) {
			_line.style.borderLeft = '1px dashed green';
			_line.style.position = 'absolute';
			_line.style.top = 0;
			_line.style.left = 0;
			_line.style.width = '1px';
			_line.style.height = h + 'px';

			guide.appendChild(_line);

			return this;
		}
	};
}

exports.default = function (timelines, options) {
	var guides = [];

	var draw = function draw() {
		guides.forEach(function (guide) {
			return guide.remove();
		});
		guides = [];

		timelines.forEach(function (t) {
			guides.push(makeGuide(t.start()).color(t.options.color).label(t.options.label));

			guides.push(makeGuide(t.end()).color(t.options.color).label(t.options.label, true));
		});

		guides.push(makeGuide(options.offset()).color('red').width('100%').label('').fixed());
	};

	window.addEventListener('resize', draw);
	draw();
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defaultModifier = exports.defaultEnd = exports.defaultStart = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reducer = __webpack_require__(10);

var _reducer2 = _interopRequireDefault(_reducer);

var _store = __webpack_require__(11);

var _store2 = _interopRequireDefault(_store);

var _cache = __webpack_require__(2);

var _cache2 = _interopRequireDefault(_cache);

var _easings = __webpack_require__(3);

var _easings2 = _interopRequireDefault(_easings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default option functions
 */
var defaultStart = exports.defaultStart = function defaultStart() {
	return 0;
};
var defaultEnd = exports.defaultEnd = function defaultEnd() {
	return 0;
};
var defaultModifier = exports.defaultModifier = function defaultModifier(p, v0, v1) {
	return (p - v0) / (v1 - v0);
};

/**
 * Add a timeline to the collection.
 * options:
 * 	color - guideline color
 * 	label - guideline label
 * 	start - function to get start of timeline
 * 	length - function to get length of timeline
 * 	offset - function to offset the start and length values
 * 	modifier - function to return the progress based on {start}, {length} and {source}
 * 	lerp - linear interpolation factor between the previous progress and the next
 * 	ease - easing function
 */
var makeAddTimeline = function makeAddTimeline(timelines) {
	return function (userOptions) {
		var options = _extends({
			color: 'green',
			label: 'Undefined',
			start: defaultStart,
			end: defaultEnd,
			modifier: defaultModifier,
			lerp: 1
		}, userOptions, {
			ease: userOptions.ease && _easings2.default[userOptions.ease] || userOptions.ease || _easings2.default.linear
		});

		var start = (0, _cache2.default)(options.start);
		var end = (0, _cache2.default)(options.end);

		var timeline = {
			options: options,
			start: start,
			end: end
		};

		timeline.store = (0, _store2.default)((0, _reducer2.default)(timeline));
		timelines.push(timeline);

		return timeline;
	};
};

/**
 * Remove a {timeline} from the collection
 */
var makeRemoveTimeline = function makeRemoveTimeline(timelines) {
	return function (timeline) {
		var index = timelines.indexOf(timeline);

		if (index !== -1) {
			timelines.splice(index, 1);
		}
	};
};

exports.default = function (timelines) {
	return {
		addTimeline: makeAddTimeline(timelines),
		removeTimeline: makeRemoveTimeline(timelines)
	};
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTimelineOptions = exports.addStatusClassNameToElement = exports.defaultScope = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // import invariant from 'invariant'


var _argsJs = __webpack_require__(9);

var _argsJs2 = _interopRequireDefault(_argsJs);

var _constants = __webpack_require__(1);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultScope = exports.defaultScope = {
	start: function start() {
		return 0;
	},
	end: function end() {
		return 0;
	}
};

/**
 * Removes all status classNames from element
 * and adds {status} as className
 */
var addStatusClassNameToElement = exports.addStatusClassNameToElement = function addStatusClassNameToElement(element, status) {
	_constants.STATUS_ARRAY.map(function (s) {
		return (0, _utilities.removeClassesFromElement)(element, s);
	});
	(0, _utilities.addClassesToElement)(element, status);
};

var getTimelineOptions = exports.getTimelineOptions = function getTimelineOptions(scope) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	var start = void 0;
	var end = void 0;

	var _Args = (0, _argsJs2.default)([
	/* eslint-disable no-bitwise */
	{ element: _argsJs2.default.OBJECT | _argsJs2.default.Optional }, { startPercentage: _argsJs2.default.STRING | _argsJs2.default.Optional }, { endPercentage: _argsJs2.default.STRING | _argsJs2.default.Optional }, { startPixels: _argsJs2.default.INT | _argsJs2.default.Optional }, { endPixels: _argsJs2.default.INT | _argsJs2.default.Optional }, { progress: _argsJs2.default.FUNCTION | _argsJs2.default.Optional }, { options: _argsJs2.default.OBJECT | _argsJs2.default.Optional, _default: {} }
	/* eslint-enable */
	], args),
	    element = _Args.element,
	    startPercentage = _Args.startPercentage,
	    endPercentage = _Args.endPercentage,
	    startPixels = _Args.startPixels,
	    endPixels = _Args.endPixels,
	    progress = _Args.progress,
	    options = _Args.options;

	if (element) {
		start = function start() {
			return (0, _utilities.getElementTop)(element);
		};
		end = function end() {
			return start() + element.offsetHeight;
		};
	}

	if (endPercentage) {
		(function () {
			var percentage = (0, _utilities.parsePercentage)(endPercentage);
			end = function end() {
				return scope.start() + (scope.end() - scope.start()) * percentage;
			};
		})();
	}

	if (endPixels) {
		end = function end() {
			return scope.start() + endPixels;
		};
	}

	if (startPercentage) {
		(function () {
			var percentage = (0, _utilities.parsePercentage)(startPercentage);
			start = function start() {
				return scope.start() + (scope.end() - scope.start()) * percentage;
			};
		})();
	}

	if (startPixels) {
		start = function start() {
			return scope.start() + startPixels;
		};
	}

	if (!start) {
		start = scope.start;
		end = scope.end;
	}

	if (!end) {
		end = start;
	}

	var offset = (0, _utilities.isFunction)(options.offset) && options.offset || options.offset && function () {
		return options.offset;
	};

	return _extends({
		progress: progress,
		start: offset && function () {
			return start() + offset();
		} || start,
		end: offset && function () {
			return end() - offset();
		} || end
	}, options, (0, _utilities.isObject)(args[0]) && _constants.STATUS_ARRAY.reduce(function (object, status) {
		object[status] = function (t) {
			addStatusClassNameToElement(args[0], status);

			if ((0, _utilities.isFunction)(options[status])) {
				options[status](t);
			}
		};
		return object;
	}, {}) || {});
};

exports.default = function (_ref) {
	var addTimeline = _ref.addTimeline;

	var makeTrailCreator = function makeTrailCreator(scope) {
		return function () {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			var options = getTimelineOptions.apply(undefined, [scope].concat(args));

			addTimeline(options);

			var nextTrail = makeTrailCreator(options);
			nextTrail.options = options;

			return nextTrail;
		};
	};

	return makeTrailCreator(defaultScope);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var now = __webpack_require__(12)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
The MIT License (MIT)

Copyright (c) 2013-2015, Joe Bain

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

;(function(name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
    else if (true) { !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); }
    else { context[name] = definition(); }
})('Args', this, function argsDefinition() {
	"use strict";

	if (!Array.isArray) {
		Array.isArray = function(arg) {
			return Object.prototype.toString.call(arg) === "[object Array]";
		};
	}

	var _extractSchemeEl = function(rawSchemeEl) {
		var schemeEl = {};
		schemeEl.defValue = undefined;
		schemeEl.typeValue = undefined;
		schemeEl.customCheck = undefined;
		for (var name in rawSchemeEl) {
			if (!rawSchemeEl.hasOwnProperty(name)) continue;
				if (name === "_default") {
					schemeEl.defValue = rawSchemeEl[name];
				} else if (name === "_type") {
					schemeEl.typeValue = rawSchemeEl[name];
				} else if (name === "_check") {
					schemeEl.customCheck = rawSchemeEl[name];
				} else {
					schemeEl.sname = name;
				}
		}
		schemeEl.sarg = rawSchemeEl[schemeEl.sname];
		if(typeof schemeEl.customCheck === "object" && schemeEl.customCheck instanceof RegExp) {
			var schemeRegexp = schemeEl.customCheck;
			schemeEl.customCheck = function(arg) {
				return !!arg.toString().match(schemeRegexp);
			};
		}
		return schemeEl;
	};

	var _typeMatches = function(arg, schemeEl) {
		var ok = false;
		if ((schemeEl.sarg & Args.ANY) !== 0) {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.STRING) !== 0 && typeof arg === "string") {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.FUNCTION) !== 0 && typeof arg === "function") {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.INT) !== 0 && (typeof arg === "number" && Math.floor(arg) === arg)) {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.FLOAT) !== 0 && typeof arg === "number") {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.ARRAY) !== 0 && (Array.isArray(arg))) {
			ok = true;
		}
		else if (((schemeEl.sarg & Args.OBJECT) !== 0 || schemeEl.typeValue !== undefined) && (
			typeof arg === "object" &&
			(schemeEl.typeValue === undefined || (arg instanceof schemeEl.typeValue))
		)) {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.ARRAY_BUFFER) !== 0 && arg.toString().match(/ArrayBuffer/)) {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.DATE) !== 0 && arg instanceof Date) {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.BOOL) !== 0 && typeof arg === "boolean") {
			ok = true;
		}
		else if ((schemeEl.sarg & Args.DOM_EL) !== 0 &&
			(
				(arg instanceof HTMLElement) ||
				(window.$ !== undefined && arg instanceof window.$)
			)
		) {
			ok = true;
		}
		if (schemeEl.customCheck !== undefined && typeof schemeEl.customCheck === "function") {
			if (schemeEl.customCheck(arg)) {
				ok = true;
			} else {
				ok = false;
			}
		}
		return ok;
	};

	var _isTypeSpecified = function(schemeEl) {
		return (schemeEl.sarg & (Args.ANY | Args.STRING | Args.FUNCTION | Args.INT | Args.FLOAT | Args.OBJECT | Args.ARRAY_BUFFER | Args.DATE | Args.BOOL | Args.DOM_EL | Args.ARRAY)) != 0 || schemeEl.typeValue !== undefined;
	};

	var _getTypeString = function(schemeEl) {
		var sarg = schemeEl.sarg;
		var typeValue = schemeEl.typeValue;
		var customCheck = schemeEl.customCheck;

		if ((sarg & Args.STRING) !== 0 ) {
			return "String";
		}
		if ((sarg & Args.FUNCTION) !== 0 ) {
			return "Function";
		}
		if ((sarg & Args.INT) !== 0 ) {
			return "Int";
		}
		if ((sarg & Args.FLOAT) !== 0 ) {
			return "Float";
		}
		if ((sarg & Args.ARRAY) !== 0 ) {
			return "Array";
		}
		if ((sarg & Args.OBJECT) !== 0) {
			if (typeValue !== undefined) {
				return "Object (" + typeValue.toString() + ")";
			} else {
				return "Object";
			}
		}
		if ((sarg & Args.ARRAY_BUFFER) !== 0 ) {
			return "Arry Buffer";
		}
		if ((sarg & Args.DATE) !== 0 ) {
			return "Date";
		}
		if ((sarg & Args.BOOL) !== 0 ) {
			return "Bool";
		}
		if ((sarg & Args.DOM_EL) !== 0 ) {
			return "DOM Element";
		}
		if (customCheck !== undefined) {
			return "[Custom checker]";
		}
		return "unknown";
	};

	var _checkNamedArgs = function(namedArgs, scheme, returns) {
		var foundOne = false;
		for (var s = 0  ; s < scheme.length ; s++) {
			var found = (function(schemeEl) {
				var argFound = false;
				for (var name in namedArgs) {
					var namedArg = namedArgs[name];
					if (name === schemeEl.sname) {
						if (_typeMatches(namedArg, schemeEl)) {
							returns[name] = namedArg;
							argFound = true;
							break;
						}
					}
				}
				return argFound;
			})(_extractSchemeEl(scheme[s]));
			if (found) { scheme.splice(s--, 1); }
			foundOne |= found;
		}
		return foundOne;
	};

	var _schemesMatch = function(schemeA, schemeB) {
		if (!schemeA || !schemeB) { return false; }
		return (schemeA.sarg & ~(Args.Optional | Args.Required)) === (schemeB.sarg & ~(Args.Optional | Args.Required)) &&
			   schemeA.typeValue === schemeB.typeValue;
	};

	var _isRequired = function(sarg) {
		return !_isOptional(sarg);
	};

	var _isOptional = function(sarg) {
		return (sarg & Args.Optional) !== 0;
	};

	var _reasonForFailure = function(schemeEl, a, arg) {
		var err = "";
		if (_isTypeSpecified(schemeEl)) {
			err = "Argument " + a + " ("+schemeEl.sname+") should be type "+_getTypeString(schemeEl)+", but it was type " + (typeof arg) + " with value " + arg + ".";
		} else if (schemeEl.customCheck !== undefined) {
			var funcString = schemeEl.customCheck.toString();
			if (funcString.length > 50) {
				funcString = funcString.substr(0, 40) + "..." + funcString.substr(funcString.length-10);
			}
			err = "Argument " + a + " ("+schemeEl.sname+") does not pass the custom check ("+funcString+").";
		} else {
			err = "Argument " + a + " ("+schemeEl.sname+") has no valid type specified.";
		}
		return err;
	};

	/**
	 * Last argument may be a named argument object. This is decided in a non-greedy way, if
	 * there are any unmatched arguments after the normal process and the last argument is an
	 * object it is inspected for matching names.
	 *
	 * If the last argument is a named argument object and it could potentially be matched to
	 * a normal object in the schema the object is first used to try to match any remaining
	 * required args (including the object that it would match against). Only if there are no
	 * remaining required args or none of the remaining required args are matched will the
	 * last object arg match against a normal schema object.
	 *
	 * Runs of objects with the same type are matched greedily but if a required object is
	 * encountered in the schema after all objects of that type have been matched the previous
	 * matches are shifted right to cover the new required arg. Shifts can only happen from
	 * immediately preceding required args or optional args. If a previous required arg is
	 * matched but an optional arg seprates the new required arg from the old one only the
	 * optional arg in between can be shifted. The required arg and any preceding optional
	 * args are not shifted.
	 */
	var Args = function(scheme, args) {
		if (scheme === undefined) throw new Error("The scheme has not been passed.");
		if (args === undefined) throw new Error("The arguments have not been passed.");

		args = Array.prototype.slice.call(args,0);

		var returns = {};
		var err = undefined;

		var runType = undefined;
		var run = [];
		var _addToRun = function(schemeEl) {
			if (
				!runType ||
				!_schemesMatch(runType, schemeEl) ||
				(_isRequired(runType.sarg) && _isOptional(schemeEl.sarg))
			) {
				run = [];
			}
			if (run.length > 0 || _isOptional(schemeEl.sarg)) {
				runType = schemeEl;
				run.push(schemeEl);
			}
		};
		var _shiftRun = function(schemeEl, a, r) {
			if (r === undefined) r = run.length-1;
			if (r < 0) return;
			var lastMatch = run[r];
			var arg = returns[lastMatch.sname];
			if (_typeMatches(arg, schemeEl)) {
				returns[schemeEl.sname] = arg;
				returns[lastMatch.sname] = lastMatch.defValue || undefined;
				if ((lastMatch.sarg & Args.Optional) === 0) { // if the last in the run was not optional
					_shiftRun(lastMatch, a, r-1);
				}
			} else {
				return _reasonForFailure(schemeEl, a, arg);
			}
		};


		var a, s;


		// first let's extract any named args
        // we need to see if the last arg is an object and if it's constructor was Object (i.e. it is simple)
        var lastArg = args[args.length-1];
		if (lastArg !== null && typeof lastArg === "object" && lastArg.constructor === Object) {
            // we should also exit if the object arg matches a rule itself
            // that is more tricky though...

			if (_checkNamedArgs(args[args.length-1], scheme, returns)) {
				args.splice(args.length-1,1);
			}
		}


		for (a = 0, s = 0; s < scheme.length ; s++) {
			a = (function(a,s) {

				var arg = args[a];

				// argument group
				if (scheme[s] instanceof Array) {
                    var group = scheme[s];
                    var retName = undefined;
                    var groupIsOptional = false;
                    for (var g = 0 ; g < group.length ; g++) {
                        var groupEl = group[g];
                        if (groupEl === Args.Optional) {
                            groupIsOptional = true;
                        } else {
                            var schemeEl = _extractSchemeEl(groupEl);
                            if (_typeMatches(arg, schemeEl)) {
                                retName = schemeEl.sname;
                            }
                        }
                    }
                    if (retName === undefined && !groupIsOptional) {
                        if (arg === null || arg === undefined) {
                            err = "Argument " + a + " is null or undefined but it must be not null.";
                            return a;
                        }

                        err = "Argument " + a + " should be one of: ";
                        for (var g = 0 ; g < group.length ; g++) {
                            var schemeEl = _extractSchemeEl(group[g]);
                            err += _getTypeString(schemeEl) + ", ";
                        }
                        err += "but it was type " + (typeof arg) + " with value " + arg + ".";
                        return a;
                    } else if (retName !== undefined) {
                        returns[retName] = arg;
                        return a+1;
                    }
				} else {
					var schemeEl = _extractSchemeEl(scheme[s]);

					// optional arg
					if ((schemeEl.sarg & Args.Optional) !== 0) {
						// check if this arg matches the next schema slot
						if ( arg === null || arg === undefined) {
							if (schemeEl.defValue !== undefined)  {
								returns[schemeEl.sname] = schemeEl.defValue;
							} else {
								returns[schemeEl.sname] = arg;
							}
							return a+1; // if the arg is null or undefined it will fill a slot, but may be replace by the default value
						} else if (_typeMatches(arg, schemeEl)) {
							returns[schemeEl.sname] = arg;
							_addToRun(schemeEl);
							return a+1;
						} else if (schemeEl.defValue !== undefined)  {
							returns[schemeEl.sname] = schemeEl.defValue;
							return a;
						}
					}

					// manadatory arg
					else { //if ((schemeEl.sarg & Args.NotNull) !== 0) {
						if (arg === null || arg === undefined) {
							if (_isTypeSpecified(schemeEl) && _schemesMatch(schemeEl, runType)) {
								err = _shiftRun(schemeEl, a);
								if (err === "") {
									_addToRun(schemeEl);
								}
								return a;
							} else {
								err = "Argument " + a + " ("+schemeEl.sname+") is null or undefined but it must be not null.";
								return a;
							}
						}
						else if (!_typeMatches(arg, schemeEl)) {
							if (_isTypeSpecified(schemeEl) && _schemesMatch(schemeEl, runType)) {
								err = _shiftRun(schemeEl, a);
								if (err === "") {
									_addToRun(schemeEl);
									return a+1;
								}
							} else {
								err = _reasonForFailure(schemeEl, a, arg);
							}
							return a;
						} else {
							returns[schemeEl.sname] = arg;
							_addToRun(schemeEl);
							return a+1;
						}
					}

				}

				return a;
			})(a,s);
			if (err) {
				break;
			}
		}

		if (err) {
			throw new Error(err);
		}

		return returns;
	};

	Args.ANY	  = 0x1;
	Args.STRING	  = 0x1 << 1;
	Args.FUNCTION	  = 0x1 << 2;
	Args.INT	  = 0x1 << 3;
	Args.FLOAT	  = 0x1 << 4;
	Args.ARRAY_BUFFER = 0x1 << 5;
	Args.OBJECT	  = 0x1 << 6;
	Args.DATE	  = 0x1 << 7;
	Args.BOOL	  = 0x1 << 8;
	Args.DOM_EL	  = 0x1 << 9;
	Args.ARRAY	  = 0x1 << 10;


	Args.Optional	  = 0x1 << 11;
	Args.NotNull	  =
	Args.Required	  = 0x1 << 12;

    return Args;
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.nextStatus = exports.nextProgress = undefined;

var _constants = __webpack_require__(1);

var _utilities = __webpack_require__(0);

var nextProgress = exports.nextProgress = function nextProgress(_ref) {
	var options = _ref.options,
	    start = _ref.start,
	    end = _ref.end,
	    state = _ref.state,
	    source = _ref.source;

	var progress = options.ease(options.modifier(source, start, end));

	if (options.lerp && state.progress.toFixed(3) !== progress.toFixed(3)) {
		progress = (0, _utilities.lerp)(state.progress, progress, options.lerp);
	}

	if (progress >= 1) {
		progress = 1;
	}

	if (progress <= 0) {
		progress = 0;
	}

	return progress;
};

var nextStatus = exports.nextStatus = function nextStatus(_ref2) {
	var start = _ref2.start,
	    end = _ref2.end,
	    source = _ref2.source;

	if ((0, _utilities.isLesserThan)(source, start)) {
		return _constants.STATUS.WAITING;
	} else if ((0, _utilities.isInBetween)(source, start, end)) {
		return _constants.STATUS.WALKING;
	} else if ((0, _utilities.isGreaterThan)(source, end)) {
		return _constants.STATUS.FINISHED;
	}

	return _constants.STATUS.LOADING;
};

var initialState = {
	status: _constants.STATUS.LOADING,
	progress: -1
};

exports.default = function (timeline) {
	return function (state, source) {
		if (state) {
			var options = timeline.options;

			var start = timeline.start();
			var end = timeline.end();

			return {
				status: nextStatus({ start: start, end: end, source: source }),
				progress: nextProgress({ state: state, options: options, start: start, end: end, source: source })
			};
		}

		return initialState;
	};
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (reducer) {
	var state = reducer();

	return {
		getState: function getState() {
			return state;
		},
		reduce: function reduce(source) {
			state = reducer(state, source);

			return state;
		}
	};
};

module.exports = exports["default"];

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.trail = exports.removeTimeline = exports.addTimeline = exports.cache = exports.easings = exports.utilities = exports.constants = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _raf = __webpack_require__(8);

var _raf2 = _interopRequireDefault(_raf);

var _timeline = __webpack_require__(6);

var _timeline2 = _interopRequireDefault(_timeline);

var _trail = __webpack_require__(7);

var _trail2 = _interopRequireDefault(_trail);

var _guide = __webpack_require__(5);

var _guide2 = _interopRequireDefault(_guide);

var _core = __webpack_require__(4);

var _core2 = _interopRequireDefault(_core);

var _cache2 = __webpack_require__(2);

var _cache = _interopRequireWildcard(_cache2);

var _constants2 = __webpack_require__(1);

var _constants = _interopRequireWildcard(_constants2);

var _utilities2 = __webpack_require__(0);

var _utilities = _interopRequireWildcard(_utilities2);

var _easings2 = __webpack_require__(3);

var _easings = _interopRequireWildcard(_easings2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.constants = _constants;
exports.utilities = _utilities;
exports.easings = _easings;
exports.cache = _cache;


var timelines = [];
var timelineCreators = (0, _timeline2.default)(timelines);

var addTimeline = timelineCreators.addTimeline,
    removeTimeline = timelineCreators.removeTimeline;
exports.addTimeline = addTimeline;
exports.removeTimeline = removeTimeline;
var trail = exports.trail = (0, _trail2.default)(timelineCreators);

var defaultOptions = {
	source: function source() {
		return window.pageYOffset || document.documentElement.scrollTop;
	},
	offset: (0, _cache.default)(function () {
		return window.innerHeight / 2;
	}),
	iterate: _raf2.default,
	fps: 1000 / 60,
	debug: false
};

exports.default = function (userOptons) {
	var options = _extends({}, defaultOptions, userOptons);

	if (options.debug) {
		(0, _guide2.default)(timelines, options);
	}

	return (0, _core2.default)(timelines, options);
};

/***/ })
/******/ ]);
});