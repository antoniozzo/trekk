// import invariant from 'invariant'
import Args from 'args-js'

import { STATUS_ARRAY } from './constants'

import {
	// isNumber,
	isObject,
	isFunction,
	// isPercentage,
	getElementTop,
	parsePercentage,
	addClassesToElement,
	removeClassesFromElement
} from './utilities'

export const defaultScope = {
	start  : () => document.body.offsetTop,
	end    : () => document.body.offsetHeight,
	source : () => (window.pageYOffset || document.documentElement.scrollTop) + (window.innerHeight / 2)
}

/**
 * Removes all status classNames from element
 * and adds {status} as className
 */
export const addStatusClassNameToElement = (element, status) => {
	removeClassesFromElement(element, ...STATUS_ARRAY)
	addClassesToElement(element, status)
}

export const getTimelineOptions = (scope, ...args) => {
	const { source } = scope
	let start
	let end

	const {
		element,
		startPercentage,
		endPercentage,
		startPixels,
		endPixels,
		progress,
		options
	} = Args([
		/* eslint-disable no-bitwise */
		{ element : Args.OBJECT | Args.Optional },
		{ startPercentage : Args.STRING | Args.Optional },
		{ endPercentage : Args.STRING | Args.Optional },
		{ startPixels : Args.INT | Args.Optional },
		{ endPixels : Args.INT | Args.Optional },
		{ progress : Args.FUNCTION | Args.Optional },
		{ options : Args.OBJECT | Args.Optional, _default : {} }
		/* eslint-enable */
	], args)

	if (element) {
		start = () => getElementTop(element)
		end = () => start() + element.offsetHeight
	}

	if (endPercentage) {
		const percentage = parsePercentage(endPercentage)
		end = () => scope.start() + ((scope.end() - scope.start()) * percentage)
	}

	if (endPixels) {
		end = () => scope.start() + endPixels
	}

	if (startPercentage) {
		const percentage = parsePercentage(startPercentage)
		start = () => scope.start() + ((scope.end() - scope.start()) * percentage)
	}

	if (startPixels) {
		start = () => scope.start() + startPixels
	}

	if (!start) {
		start = scope.start
		end = scope.end
	}

	if (!end) {
		end = start
	}

	const offset = (isFunction(options.offset) && options.offset) || (options.offset && (() => options.offset))

	return {
		source,
		progress,
		start : (offset && (() => start() + offset())) || start,
		end   : (offset && (() => end() - offset())) || end,
		...options,
		...((isObject(args[0]) && STATUS_ARRAY.reduce((object, status) => {
			object[status] = t => {
				addStatusClassNameToElement(args[0], status)

				if (isFunction(options[status])) {
					options[status](t)
				}
			}
			return object
		}, {})) || {})
	}
}

export default ({ addTimeline }) => {
	const makeTrailCreator = scope => (...args) => {
		const options = getTimelineOptions(scope, ...args)

		addTimeline(options)

		return makeTrailCreator(options)
	}

	return makeTrailCreator(defaultScope)
}
