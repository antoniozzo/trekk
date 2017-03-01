import raf from 'raf'

import timeline from './source/timeline'
import makeTrailCreator from './source/trail'
import showGuides from './source/guide'
import core from './source/core'
import makeCache from './source/cache'

export * as constants from './source/constants'
export * as utilities from './source/utilities'
export * as easings from './source/easings'
export * as cache from './source/cache'

const timelines = []
const timelineCreators = timeline(timelines)

export const { addTimeline, removeTimeline } = timelineCreators
export const trail = makeTrailCreator(timelineCreators)

const defaultOptions = {
	source  : () => window.pageYOffset || document.documentElement.scrollTop,
	offset  : makeCache(() => window.innerHeight / 2),
	iterate : raf,
	fps     : 1000 / 60,
	debug   : false
}

export default userOptons => {
	const options = {
		...defaultOptions,
		...userOptons
	}

	if (options.debug) {
		showGuides(timelines, options)
	}

	return core(timelines, options)
}
