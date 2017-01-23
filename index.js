import raf from 'raf'

import timeline from './source/timeline'
import showGuides from './source/guide'
import core from './source/core'

export * as constants from './source/constants'
export * as utilities from './source/utilities'
export * as easings from './source/easings'

const timelines = []

export const { addTimeline, fromElement, fromPercentage, fromPixels } = timeline(timelines)

const defaultOptions = {
	source  : () => (window.pageYOffset || document.documentElement.scrollTop) + (window.innerHeight / 2),
	iterate : raf,
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
