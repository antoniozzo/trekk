import { STATUS, STATUS_ARRAY } from './constants'

import {
	getElementTop,
	removeClassesFromElement,
	addClassesToElement
} from './utilities'

import makeReducer from './reducer'
import makeStore from './store'
import makeCache from './cache'
import easings from './easings'

/**
 * Default option functions
 */
export const defaultStart = () => 0
export const defaultLength = () => 0
export const defaultOffset = () => 0
export const defaultModifier = (p, v0, v1) => {
	const progress = (p - v0) / v1

	if (progress >= 1) return 1
	if (progress <= 0) return 0

	return progress
}

/**
 * Removes all status classNames from element
 * and adds {status} as className
 */
export const addStatusClassNameToElement = (element, status) => () => {
	removeClassesFromElement(element, ...STATUS_ARRAY)
	addClassesToElement(element, status)
}

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
const addTimeline = timelines =>
	userOptions => {
		const options = {
			color    : 'green',
			label    : 'Undefined',
			start    : defaultStart,
			length   : defaultLength,
			offset   : defaultOffset,
			modifier : defaultModifier,
			lerp     : 1,
			...userOptions,
			ease     : (userOptions.ease && easings[userOptions.ease]) || userOptions.ease || easings.linear
		}

		const listeners = {
			[STATUS.LOADING]  : [],
			[STATUS.WAITING]  : [],
			[STATUS.WALKING]  : [],
			[STATUS.FINISHED] : [],
			progress          : []
		}

		const start = makeCache(() => options.start() + options.offset())
		const length = makeCache(() => options.length() - (options.offset() * 2))

		const on = (event, listener) => {
			timeline.listeners[event].push(listener)

			return timeline
		}

		const off = (event, listener) => {
			const index = timeline.listeners[event].indexOf(listener)

			if (index !== -1) {
				timeline.listeners[event].splice(index, 1)
			}

			return timeline
		}

		const timeline = {
			options,
			listeners,
			start,
			length,
			on,
			off
		}

		timeline.store = makeStore(makeReducer(timeline))
		timelines.push(timeline)

		return timeline
	}

/**
 * Remove a {timeline} from the collection
 */
const removeTimeline = timelines =>
	timeline => {
		const index = timelines.indexOf(timeline)

		if (index !== -1) {
			timelines.splice(index, 1)
		}
	}

/**
 * Creates a timeline from an element
 * The {start} and {length} will be calculated based
 * on the elements position
 */
const fromElement = timelineCreator =>
	(element, options) =>
		timelineCreator({
			start  : () => getElementTop(element),
			length : () => element.offsetHeight,
			...options
		})
		.on(STATUS.LOADING, addStatusClassNameToElement(element, STATUS.LOADING))
		.on(STATUS.WAITING, addStatusClassNameToElement(element, STATUS.WAITING))
		.on(STATUS.WALKING, addStatusClassNameToElement(element, STATUS.WALKING))
		.on(STATUS.FINISHED, addStatusClassNameToElement(element, STATUS.FINISHED))

/**
 * Creates a timeline from pixel values
 * The {start} and {length} needs to be in pixels
 */
const fromPixels = timelineCreator =>
	(start, length, options) =>
		timelineCreator({
			start  : () => start,
			length : () => length,
			...options
		})

/**
 * Creates a timeline from percentage values
 * The {start} and {length} will be based on {timeline}'s
 */
const fromPercentage = timelineCreator =>
	(timeline, start, length, options) =>
		timelineCreator({
			start  : () => timeline.start() + (timeline.length() * start),
			length : () => timeline.length() * length,
			...options
		})

export default timelines => {
	const timelineCreator = addTimeline(timelines)

	return {
		addTimeline    : timelineCreator,
		fromPixels     : fromPixels(timelineCreator),
		fromElement    : fromElement(timelineCreator),
		fromPercentage : fromPercentage(timelineCreator),
		removeTimeline : removeTimeline(timelines)
	}
}
