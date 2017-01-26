/**
 * Test if {v} is a string
 */
// export function isString(v) {
// 	return typeof v === 'string'
// }

/**
 * Test if {v} is a function
 */
export function isFunction(v) {
	return typeof v === 'function'
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
export function isObject(v) {
	return typeof v === 'object'
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
export function parsePercentage(v) {
	return parseInt(v, 10) / 100
}

/**
 * Test if {y} is lesser than {v}
 */
export function isLesserThan(y, v) {
	return y < v
}

/**
 * Test if {y} is greater than {v}
 */
export function isGreaterThan(y, v) {
	return y > v
}

/**
 * Test if {y} is greater than {v0} and lesser than {v1}
 */
export function isInBetween(y, v0, v1) {
	return y >= v0 && y <= v1
}

/**
 * Linear interpolation method.
 * Takes a {start} and {end} value and
 * return value in-between based on a {time} variable.
 * Pass true to {round} for rounding to int value.
 */
export function lerp(start, end, time, round) {
	const v = (start * (1 - time)) + (end * time)

	return round ? Math.round(v) : v
}

/**
 * Returns an Object's values as an Array
 */
export function objectToArray(object) {
	return Object.keys(object).map(key => object[key])
}

/**
 * Removes {classNames} from {element}
 */
export function removeClassesFromElement(element, ...classNames) {
	return element.classList.remove(...classNames)
}

/**
 * Add {classNames} to {element}
 */
export function addClassesToElement(element, ...classNames) {
	return element.classList.add(...classNames)
}

/**
 * Get {element}'s top position in document
 */
export function getElementTop(element) {
	let currentElement = element
	let top = 0

	do {
		top += currentElement.offsetTop || 0
		currentElement = currentElement.offsetParent
	} while (currentElement)

	return top
}
