import { STATUS, STATUS_ARRAY } from './constants'

import {
	getElementTop,
	removeClassesFromElement,
	addClassesToElement
} from './utilities'

import makeReducer from './reducer'
import makeStore from './store'

// const windowY = () => window.pageYOffset || document.documentElement.scrollTop
const defaultStart = () => 0
const defaultLength = () => 0
const defaultOffset = () => 0
const defaultModifier = (p, v0, v1) => (p - v0) / v1

const addStatusClassNameToElement = (element, status) => () => {
	removeClassesFromElement(element, ...STATUS_ARRAY)
	addClassesToElement(element, status)
}

const addTimeline = timelines =>
	userOptions => {
		const options = {
			start    : defaultStart,
			length   : defaultLength,
			offset   : defaultOffset,
			modifier : defaultModifier,
			...userOptions
		}

		const listeners = {
			[STATUS.LOADING]  : [],
			[STATUS.WAITING]  : [],
			[STATUS.WALKING]  : [],
			[STATUS.FINISHED] : [],
			progress          : []
		}

		const store = makeStore(makeReducer(options))

		const timeline = {
			store,
			options,
			listeners,
			on : (event, listener) => {
				timeline.listeners[event].push(listener)

				return timeline
			},
			off : (event, listener) => {
				const index = timeline.listeners[event].indexOf(listener)

				if (index !== -1) {
					timeline.listeners[event].splice(index, 1)
				}

				return timeline
			}
		}

		timelines.push(timeline)

		return timeline
	}

const removeTimeline = timelines =>
	timeline => {
		const index = timelines.indexOf(timeline)

		if (index !== -1) {
			timelines.splice(index, 1)
		}
	}

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

const fromPixels = timelineCreator =>
	(start, length, options) =>
		timelineCreator({
			start  : () => start,
			length : () => length,
			...options
		})

const fromPercentage = timelineCreator =>
	(timeline, start, length, options) =>
		timelineCreator({
			start  : () => timeline.options.start() + (timeline.options.length() * start),
			length : () => timeline.options.length() * length,
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
