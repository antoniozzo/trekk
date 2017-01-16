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
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(29)('wks')
  , uid        = __webpack_require__(32)
  , Symbol     = __webpack_require__(4).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(24)
  , hide      = __webpack_require__(10)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(7)
  , IE8_DOM_DEFINE = __webpack_require__(51)
  , toPrimitive    = __webpack_require__(69)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(37);

var _keys2 = _interopRequireDefault(_keys);

exports.log = log;
exports.lerp = lerp;
exports.isArray = isArray;
exports.objectToArray = objectToArray;
exports.arrayWithout = arrayWithout;
exports.removeClassesFromElement = removeClassesFromElement;
exports.addClassesToElement = addClassesToElement;
exports.getElementTop = getElementTop;
exports.addGuide = addGuide;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Log next arguments if {loud} is true
 */
function log(loud) {
    var _console;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (loud) (_console = console).log.apply(_console, args);
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
 * Check if {value} is of type Array
 */
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * Returns an Object's values as an Array
 */
function objectToArray(object) {
    return (0, _keys2.default)(object).map(function (key) {
        return object[key];
    });
}

/**
 * Returns a new Array without the value of {x}
 */
function arrayWithout(array, x) {
    return array.filter(function (y) {
        return y !== x;
    });
}

/**
 * Removes {classNames} from {element}
 */
function removeClassesFromElement(element) {
    var _element$classList;

    for (var _len2 = arguments.length, classNames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        classNames[_key2 - 1] = arguments[_key2];
    }

    return (_element$classList = element.classList).remove.apply(_element$classList, classNames);
}

/**
 * Add {classNames} to {element}
 */
function addClassesToElement(element) {
    var _element$classList2;

    for (var _len3 = arguments.length, classNames = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        classNames[_key3 - 1] = arguments[_key3];
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

/**
 * Create a guideline
 */
function addGuide(pos) {
    var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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
    _label.style.margin = '2px 5px';

    document.body.appendChild(guide);

    return {
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(5)
  , createDesc = __webpack_require__(17);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(13);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRAILS = exports.STATUS_ARRAY = exports.STATUS = exports.DEFAULTS = undefined;

var _utilities = __webpack_require__(6);

/**
 * Default Trail options
 */
var DEFAULTS = exports.DEFAULTS = {
  // Label used in guidelines
  label: 'Undefined Trail',

  // Offset the start and end position
  offset: 0,

  // Easing of the Trail progress, supports strings:
  //
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
  //
  // or a custom easing function(progress) {}
  ease: 'linear',

  // Linear interpolation value, from 0..1
  // used to "delay" progress
  lerp: 1,

  // Activate debug logs for the Trail
  log: false
};

/**
 * All available Trail statuses
 */
var STATUS = exports.STATUS = {
  // The Trail has not loaded yet.
  // Will change after calling {trekk.start}
  LOAD: 'loading',

  // The y scroll position is above the Trail start position
  IDLE: 'waiting',

  // The y scroll position is within the Trail start and end position
  WALK: 'walking',

  // The y scroll position is below the Trail end position
  DONE: 'finished'
};

/**
 * All Trail statuses as an array
 */
var STATUS_ARRAY = exports.STATUS_ARRAY = (0, _utilities.objectToArray)(STATUS);

/**
 * Will hold all the instances of Trail
 */
var TRAILS = exports.TRAILS = [];

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(63)
  , enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(29)('keys')
  , uid    = __webpack_require__(32);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(41);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__(40);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(38);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(39);

var _createClass3 = _interopRequireDefault(_createClass2);

var _constants = __webpack_require__(12);

var _easings = __webpack_require__(21);

var _easings2 = _interopRequireDefault(_easings);

var _utilities = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trail = function () {
    /**
     * Trail class takes a {path} that can be
     * an element or an array of numbers.
     *
     * Pass {options} to modify the default options.
     *
     * Pass another Trail as {parent} to base
     * start and end positions within the parent
     */
    function Trail(path, options, parent) {
        (0, _classCallCheck3.default)(this, Trail);

        this.status = _constants.STATUS.LOAD;

        this.options = (0, _extends3.default)({}, _constants.DEFAULTS, options);

        this.options.ease = typeof this.options.ease === 'string' ? _easings2.default[this.options.ease] : this.options.ease;

        if ((0, _utilities.isArray)(path)) {
            this.start = (path[1] > 1 ? path[0] : path[0] * parent.length) + parent.start;
            this.end = (path[1] > 1 ? path[1] : path[1] * parent.length) + parent.start;
        } else {
            var top = (0, _utilities.getElementTop)(path);
            this.element = path;
            this.start = top;
            this.end = top + path.offsetHeight;
        }

        this.start += (0, _utilities.isArray)(this.options.offset) ? this.options.offset[0] : this.options.offset;
        this.end -= (0, _utilities.isArray)(this.options.offset) ? this.options.offset[1] : this.options.offset;
        this.length = this.end - this.start;

        _constants.TRAILS.push(this);
    }
    /**
     * Main method to set the next state for the Trail.
     * Call with current {y} scroll position
     */


    (0, _createClass3.default)(Trail, [{
        key: 'run',
        value: function run(y) {
            if (this.status !== _constants.STATUS.IDLE && this.shouldWait(y)) {
                this.progress(y, 0);
                this.wait();
            }

            if (this.status !== _constants.STATUS.DONE && this.shouldFinish(y)) {
                this.progress(y, 1);
                this.finish();
            }

            if (this.status !== _constants.STATUS.WALK && this.shouldWalk(y)) {
                this.walk();
            }

            if (this.shouldWalk(y) || this.isProgressing()) {
                this.progress(y);
            }
        }
        /**
         * Creates a new Trail with {this} as {parent}
         * and returns the new Trail
         */

    }, {
        key: 'trekk',
        value: function trekk(path, onProgress, options) {
            return new Trail(path, options && (0, _extends3.default)({ onProgress: onProgress }, options) || onProgress, this);
        }
        /**
         * Creates a new Trail with {this} as {parent}
         * and returns {this}
         */

    }, {
        key: 'trail',
        value: function trail() {
            this.trekk.apply(this, arguments);
            return this;
        }
        /**
         * Creates a new Trail with {this} as {parent}
         * and the same start and end position
         * then returns {this}
         */

    }, {
        key: 'stop',
        value: function stop(path) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            if (typeof path === 'number') {
                this.trekk.apply(this, [[path, path]].concat(args));
            } else {
                this.trekk.apply(this, [[path.offsetTop, path.offsetTop]].concat(args));
            }

            return this;
        }
        /**
         * Set the {status} of {this}.
         * If there is an element,
         * will add the {status} as element className.
         */

    }, {
        key: 'setStatus',
        value: function setStatus(status) {
            this.status = status;

            if (this.element) {
                _utilities.removeClassesFromElement.apply(undefined, [this.element].concat((0, _toConsumableArray3.default)(_constants.STATUS_ARRAY)));
                (0, _utilities.addClassesToElement)(this.element, status);
            }
        }
        /**
         * Is called when scroll position is above the Trail start position.
         * Will set the {status} to "waiting" and trigger {onWaiting} callback.
         */

    }, {
        key: 'wait',
        value: function wait() {
            this.setStatus(_constants.STATUS.IDLE);
            (0, _utilities.log)(this.options.log, this.options.label + ' is ' + _constants.STATUS.IDLE);
            if (this.options.onWaiting) this.options.onWaiting(0);
        }
        /**
         * Is called when scroll position is within the Trail start and end position.
         * Will set the {status} to "walking" and trigger {onWalking} callback.
         */

    }, {
        key: 'walk',
        value: function walk() {
            this.setStatus(_constants.STATUS.WALK);
            (0, _utilities.log)(this.options.log, this.options.label + ' is ' + _constants.STATUS.WALK);
            if (this.options.onWalking) this.options.onWalking();
        }
        /**
         * Is called when scroll position is below the Trail end position.
         * Will set the {status} to "finished" and trigger {onFinished} callback.
         */

    }, {
        key: 'finish',
        value: function finish() {
            this.setStatus(_constants.STATUS.DONE);
            (0, _utilities.log)(this.options.log, this.options.label + ' is ' + _constants.STATUS.DONE);
            if (this.options.onFinished) this.options.onFinished(1);
        }
        /**
         * Sets the current progress or calls {getProgress} with current scroll y position.
         *
         * If the Trail has a {lerp} value, create a linear interpolation
         * between the previous progress and the new progress.
         *
         * Will trigger {onProgress} callback with the current progress.
         */

    }, {
        key: 'progress',
        value: function progress(y, _progress) {
            this.currentProgress = _progress !== undefined ? _progress : this.getProgress(y);

            var lerpProgress = this.prevProgress && (0, _utilities.lerp)(this.prevProgress, this.currentProgress, this.options.lerp) || this.currentProgress;
            this.prevProgress = this.currentProgress.toFixed(3) !== lerpProgress.toFixed(3) ? lerpProgress : this.currentProgress;

            (0, _utilities.log)(this.options.log, this.options.label + ' is progressing: ' + this.prevProgress);
            if (this.options.onProgress) this.options.onProgress(this.prevProgress);
        }
        /**
         * Check if {y} is above the Trail start position.
         */

    }, {
        key: 'shouldWait',
        value: function shouldWait(y) {
            return y < this.start;
        }
        /**
         * Check if {y} is below the Trail end position.
         */

    }, {
        key: 'shouldFinish',
        value: function shouldFinish(y) {
            return y >= this.end;
        }
        /**
         * Check if {y} is within the Trail start and end position.
         */

    }, {
        key: 'shouldWalk',
        value: function shouldWalk(y) {
            return !this.shouldWait(y) && !this.shouldFinish(y);
        }
        /**
         * Get the {progress} based on {y} scroll position
         */

    }, {
        key: 'getProgress',
        value: function getProgress(y) {
            var length = this.end - this.start;
            var posY = y - this.start;
            var progress = posY / length;

            return this.options.ease(progress > 1 ? 1 : progress < 0 ? 0 : progress);
        }
        /**
         * Check if {progress} has any linear interpolation to resolve
         */

    }, {
        key: 'isProgressing',
        value: function isProgressing() {
            return this.currentProgress !== undefined && this.prevProgress !== this.currentProgress;
        }
    }]);
    return Trail;
}();

exports.default = Trail;

/***/ }),
/* 21 */
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

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (onScroll, onIdle) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.innerHeight / 2;

    var next = function next() {
        var nextY = getY() + offset;

        if (y === nextY) {
            onIdle(y);
            (0, _raf2.default)(next);
            return;
        }

        y = nextY;

        onScroll(y);
        (0, _raf2.default)(next);
    };

    next();
};

var _raf = __webpack_require__(77);

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Current scroll y position
 */
var y = 0;

/**
 * Get y scroll position from window or document
 */
function getY() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Recursive method running requestAnimationFrame.
 * Will callback {onScroll} with current y when user is scrolling.
 * Will callback {onIdle} with current y when user is NOT scrolling.
 * Pass an {offset} to move the current y down
 */

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(46);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f
  , has = __webpack_require__(9)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(27)
  , defined = __webpack_require__(13);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = start;
exports.debug = debug;
exports.showGuides = showGuides;

var _constants = __webpack_require__(12);

var _utilities = __webpack_require__(6);

var _scroll = __webpack_require__(22);

var _scroll2 = _interopRequireDefault(_scroll);

var _Trail = __webpack_require__(20);

var _Trail2 = _interopRequireDefault(_Trail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Called when the user is scrolling
 * Will call run on each instance of Trail
 */
function onScroll(y) {
    for (var i = _constants.TRAILS.length - 1; i >= 0; i -= 1) {
        _constants.TRAILS[i].run(y);
    }
}

/**
 * Called when the user is not scrolling.
 * Will try to resolve any lerp progress.
 */
function onIdle(y) {
    for (var i = _constants.TRAILS.length - 1; i >= 0; i -= 1) {
        if (_constants.TRAILS[i].isProgressing()) {
            _constants.TRAILS[i].run(y);
        }
    }
}

/**
 * Start listening to scroll event
 */
function start() {
    (0, _scroll2.default)(onScroll, onIdle);
}

/**
 * Start debug mode
 */
function debug() {
    showGuides();
}

/**
 * Will draw helper lines for each Trail instance
 * and also for the document trigger
 */
function showGuides() {
    for (var i = 0; i < _constants.TRAILS.length; i += 1) {
        (0, _utilities.addGuide)(_constants.TRAILS[i].start).color('green').label(_constants.TRAILS[i].options.label).col(i).width(100).line(_constants.TRAILS[i].end - _constants.TRAILS[i].start);

        (0, _utilities.addGuide)(_constants.TRAILS[i].end, i).color('green').label(_constants.TRAILS[i].options.label, true).width(100).col(i);
    }

    (0, _utilities.addGuide)(window.innerHeight / 2).color('red').label('').width('100%').fixed();
}

/**
 * Create a Trail instance of the body
 * and export the trekk method as well
 * as other helper methods and start()
 */
var documentTrail = new _Trail2.default(document.body, { label: 'body' });
var trekk = documentTrail.trekk.bind(documentTrail);

exports.default = trekk;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(36);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(35);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(34);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
__webpack_require__(71);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(30)
  , toLength  = __webpack_require__(31)
  , toIndex   = __webpack_require__(68);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5)
  , createDesc      = __webpack_require__(17);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4).document && document.documentElement;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(8)(function(){
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(15)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(59)
  , descriptor     = __webpack_require__(17)
  , setToStringTag = __webpack_require__(28)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(57)
  , $export        = __webpack_require__(3)
  , redefine       = __webpack_require__(66)
  , hide           = __webpack_require__(10)
  , has            = __webpack_require__(9)
  , Iterators      = __webpack_require__(15)
  , $iterCreate    = __webpack_require__(54)
  , setToStringTag = __webpack_require__(28)
  , getPrototypeOf = __webpack_require__(62)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(16)
  , gOPS     = __webpack_require__(61)
  , pIE      = __webpack_require__(64)
  , toObject = __webpack_require__(11)
  , IObject  = __webpack_require__(27)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(8)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(7)
  , dPs         = __webpack_require__(60)
  , enumBugKeys = __webpack_require__(26)
  , IE_PROTO    = __webpack_require__(18)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(25)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(50).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(5)
  , anObject = __webpack_require__(7)
  , getKeys  = __webpack_require__(16);

module.exports = __webpack_require__(2) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(9)
  , toObject    = __webpack_require__(11)
  , IE_PROTO    = __webpack_require__(18)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(9)
  , toIObject    = __webpack_require__(30)
  , arrayIndexOf = __webpack_require__(47)(false)
  , IE_PROTO     = __webpack_require__(18)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(8);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19)
  , defined   = __webpack_require__(13);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(48)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(15);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(24)
  , $export        = __webpack_require__(3)
  , toObject       = __webpack_require__(11)
  , call           = __webpack_require__(53)
  , isArrayIter    = __webpack_require__(52)
  , toLength       = __webpack_require__(31)
  , createProperty = __webpack_require__(49)
  , getIterFn      = __webpack_require__(70);

$export($export.S + $export.F * !__webpack_require__(56)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(58)});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(2), 'Object', {defineProperty: __webpack_require__(5).f});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11)
  , $keys    = __webpack_require__(16);

__webpack_require__(65)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(67)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(55)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 76 */
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var now = __webpack_require__(76)
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.start = exports.debug = exports.showGuides = exports.easings = exports.utilities = exports.constants = exports.Trail = exports.scroll = undefined;

var _source = __webpack_require__(33);

Object.defineProperty(exports, 'showGuides', {
  enumerable: true,
  get: function get() {
    return _source.showGuides;
  }
});
Object.defineProperty(exports, 'debug', {
  enumerable: true,
  get: function get() {
    return _source.debug;
  }
});
Object.defineProperty(exports, 'start', {
  enumerable: true,
  get: function get() {
    return _source.start;
  }
});

var _scroll2 = __webpack_require__(22);

var _scroll3 = _interopRequireDefault(_scroll2);

var _Trail2 = __webpack_require__(20);

var _Trail3 = _interopRequireDefault(_Trail2);

var _constants2 = __webpack_require__(12);

var _constants = _interopRequireWildcard(_constants2);

var _utilities2 = __webpack_require__(6);

var _utilities = _interopRequireWildcard(_utilities2);

var _easings2 = __webpack_require__(21);

var _easings = _interopRequireWildcard(_easings2);

var _source2 = _interopRequireDefault(_source);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.scroll = _scroll3.default;
exports.Trail = _Trail3.default;
exports.constants = _constants;
exports.utilities = _utilities;
exports.easings = _easings;
exports.default = _source2.default;

/***/ })
/******/ ]);
});