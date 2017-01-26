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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLesserThan = isLesserThan;
exports.isGreaterThan = isGreaterThan;
exports.isInBetween = isInBetween;
exports.lerp = lerp;
exports.objectToArray = objectToArray;
exports.removeClassesFromElement = removeClassesFromElement;
exports.addClassesToElement = addClassesToElement;
exports.getElementTop = getElementTop;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var broadcast = exports.broadcast = function broadcast(_ref) {
	var listeners = _ref.listeners,
	    prevState = _ref.prevState,
	    nextState = _ref.nextState;

	if (prevState.progress !== nextState.progress) {
		listeners.progress.forEach(function (listener) {
			return listener(nextState.progress);
		});
	}

	if (prevState.status !== nextState.status) {
		listeners[nextState.status].forEach(function (listener) {
			return listener();
		});
	}
};

var update = exports.update = function update(_ref2, source) {
	var listeners = _ref2.listeners,
	    store = _ref2.store,
	    options = _ref2.options;

	var prevState = store.getState();
	var nextState = store.reduce(source);

	broadcast({ listeners: listeners, prevState: prevState, nextState: nextState });

	return nextState;
};

exports.default = function (timelines, options) {
	var next = function next() {
		var source = options.source();

		timelines.forEach(function (t) {
			return update(t, source);
		});

		options.iterate(next);
	};

	options.iterate(next);
};

/***/ }),
/* 4 */
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
			var start = t.options.start() + t.options.offset();
			var end = t.options.start() + t.options.length() - t.options.offset();

			guides.push(makeGuide(start).color(t.options.color).label(t.options.label));

			guides.push(makeGuide(end).color(t.options.color).label(t.options.label, true));
		});

		guides.push(makeGuide(options.source()).color('red').width('100%').label('').fixed());
	};

	window.addEventListener('resize', draw);
	draw();
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addStatusClassNameToElement = exports.defaultModifier = exports.defaultOffset = exports.defaultLength = exports.defaultStart = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(1);

var _utilities = __webpack_require__(0);

var _reducer = __webpack_require__(8);

var _reducer2 = _interopRequireDefault(_reducer);

var _store = __webpack_require__(9);

var _store2 = _interopRequireDefault(_store);

var _cache = __webpack_require__(7);

var _cache2 = _interopRequireDefault(_cache);

var _easings = __webpack_require__(2);

var _easings2 = _interopRequireDefault(_easings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Default option functions
 */
var defaultStart = exports.defaultStart = function defaultStart() {
	return 0;
};
var defaultLength = exports.defaultLength = function defaultLength() {
	return 0;
};
var defaultOffset = exports.defaultOffset = function defaultOffset() {
	return 0;
};
var defaultModifier = exports.defaultModifier = function defaultModifier(p, v0, v1) {
	var progress = (p - v0) / v1;

	if (progress >= 1) return 1;
	if (progress <= 0) return 0;

	return progress;
};

/**
 * Removes all status classNames from element
 * and adds {status} as className
 */
var addStatusClassNameToElement = exports.addStatusClassNameToElement = function addStatusClassNameToElement(element, status) {
	return function () {
		_utilities.removeClassesFromElement.apply(undefined, [element].concat(_toConsumableArray(_constants.STATUS_ARRAY)));
		(0, _utilities.addClassesToElement)(element, status);
	};
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
var addTimeline = function addTimeline(timelines) {
	return function (userOptions) {
		var _listeners;

		var options = _extends({
			color: 'green',
			label: 'Undefined',
			start: defaultStart,
			length: defaultLength,
			offset: defaultOffset,
			modifier: defaultModifier,
			lerp: 1
		}, userOptions, {
			ease: userOptions.ease && _easings2.default[userOptions.ease] || userOptions.ease || _easings2.default.linear
		});

		var listeners = (_listeners = {}, _defineProperty(_listeners, _constants.STATUS.LOADING, []), _defineProperty(_listeners, _constants.STATUS.WAITING, []), _defineProperty(_listeners, _constants.STATUS.WALKING, []), _defineProperty(_listeners, _constants.STATUS.FINISHED, []), _defineProperty(_listeners, 'progress', []), _listeners);

		var start = (0, _cache2.default)(function () {
			return options.start() + options.offset();
		});
		var length = (0, _cache2.default)(function () {
			return options.length() - options.offset() * 2;
		});

		var on = function on(event, listener) {
			timeline.listeners[event].push(listener);

			return timeline;
		};

		var off = function off(event, listener) {
			var index = timeline.listeners[event].indexOf(listener);

			if (index !== -1) {
				timeline.listeners[event].splice(index, 1);
			}

			return timeline;
		};

		var timeline = {
			options: options,
			listeners: listeners,
			start: start,
			length: length,
			on: on,
			off: off
		};

		timeline.store = (0, _store2.default)((0, _reducer2.default)(timeline));
		timelines.push(timeline);

		return timeline;
	};
};

/**
 * Remove a {timeline} from the collection
 */
var removeTimeline = function removeTimeline(timelines) {
	return function (timeline) {
		var index = timelines.indexOf(timeline);

		if (index !== -1) {
			timelines.splice(index, 1);
		}
	};
};

/**
 * Creates a timeline from an element
 * The {start} and {length} will be calculated based
 * on the elements position
 */
var fromElement = function fromElement(timelineCreator) {
	return function (element, options) {
		return timelineCreator(_extends({
			start: function start() {
				return (0, _utilities.getElementTop)(element);
			},
			length: function length() {
				return element.offsetHeight;
			}
		}, options)).on(_constants.STATUS.LOADING, addStatusClassNameToElement(element, _constants.STATUS.LOADING)).on(_constants.STATUS.WAITING, addStatusClassNameToElement(element, _constants.STATUS.WAITING)).on(_constants.STATUS.WALKING, addStatusClassNameToElement(element, _constants.STATUS.WALKING)).on(_constants.STATUS.FINISHED, addStatusClassNameToElement(element, _constants.STATUS.FINISHED));
	};
};

/**
 * Creates a timeline from pixel values
 * The {start} and {length} needs to be in pixels
 */
var fromPixels = function fromPixels(timelineCreator) {
	return function (_start, _length, options) {
		return timelineCreator(_extends({
			start: function start() {
				return _start;
			},
			length: function length() {
				return _length;
			}
		}, options));
	};
};

/**
 * Creates a timeline from percentage values
 * The {start} and {length} will be based on {timeline}'s
 */
var fromPercentage = function fromPercentage(timelineCreator) {
	return function (timeline, _start2, _length2, options) {
		return timelineCreator(_extends({
			start: function start() {
				return timeline.start() + timeline.length() * _start2;
			},
			length: function length() {
				return timeline.length() * _length2;
			}
		}, options));
	};
};

exports.default = function (timelines) {
	var timelineCreator = addTimeline(timelines);

	return {
		addTimeline: timelineCreator,
		fromPixels: fromPixels(timelineCreator),
		fromElement: fromElement(timelineCreator),
		fromPercentage: fromPercentage(timelineCreator),
		removeTimeline: removeTimeline(timelines)
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var now = __webpack_require__(10)
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

if (typeof window !== 'undefined') {
	window.addEventListener('resize', function () {
		iteration++;
	});
}
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.nextStatus = exports.nextProgress = undefined;

var _constants = __webpack_require__(1);

var _utilities = __webpack_require__(0);

var nextProgress = exports.nextProgress = function nextProgress(_ref, state, source) {
	var options = _ref.options,
	    start = _ref.start,
	    length = _ref.length;

	var progress = options.ease(options.modifier(source, start(), length()));

	if (options.lerp && state.progress.toFixed(3) !== progress.toFixed(3)) {
		progress = (0, _utilities.lerp)(state.progress, progress, options.lerp);
	}

	return progress;
};

var nextStatus = exports.nextStatus = function nextStatus(_ref2, source) {
	var start = _ref2.start,
	    length = _ref2.length;

	if ((0, _utilities.isLesserThan)(source, start())) {
		return _constants.STATUS.WAITING;
	} else if ((0, _utilities.isInBetween)(source, start(), start() + length())) {
		return _constants.STATUS.WALKING;
	} else if ((0, _utilities.isGreaterThan)(source, start() + length())) {
		return _constants.STATUS.FINISHED;
	}

	return _constants.STATUS.LOADING;
};

var initialState = {
	status: _constants.STATUS.LOADING,
	progress: -1
};

exports.default = function (timeline) {
	return function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var source = arguments[1];

		if (source) {
			return {
				status: nextStatus(timeline, source),
				progress: nextProgress(timeline, state, source)
			};
		}

		return state;
	};
};

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fromPixels = exports.fromPercentage = exports.fromElement = exports.addTimeline = exports.easings = exports.utilities = exports.constants = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _raf = __webpack_require__(6);

var _raf2 = _interopRequireDefault(_raf);

var _timeline2 = __webpack_require__(5);

var _timeline3 = _interopRequireDefault(_timeline2);

var _guide = __webpack_require__(4);

var _guide2 = _interopRequireDefault(_guide);

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _constants2 = __webpack_require__(1);

var _constants = _interopRequireWildcard(_constants2);

var _utilities2 = __webpack_require__(0);

var _utilities = _interopRequireWildcard(_utilities2);

var _easings2 = __webpack_require__(2);

var _easings = _interopRequireWildcard(_easings2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.constants = _constants;
exports.utilities = _utilities;
exports.easings = _easings;


var timelines = [];

var _timeline = (0, _timeline3.default)(timelines);

var addTimeline = _timeline.addTimeline,
    fromElement = _timeline.fromElement,
    fromPercentage = _timeline.fromPercentage,
    fromPixels = _timeline.fromPixels;
exports.addTimeline = addTimeline;
exports.fromElement = fromElement;
exports.fromPercentage = fromPercentage;
exports.fromPixels = fromPixels;


var defaultOptions = {
	source: function source() {
		return (window.pageYOffset || document.documentElement.scrollTop) + window.innerHeight / 2;
	},
	iterate: _raf2.default,
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