import makeReducer from './reducer'
import makeStore from './store'
import makeCache from './cache'
import easings from './easings'

/**
 * Default option functions
 */
export const defaultStart = () => 0
export const defaultEnd = () => 0
export const defaultModifier = (p, v0, v1) => {
	const progress = (p - v0) / (v1 - v0)

	if (progress >= 1) return 1
	if (progress <= 0) return 0

	return progress
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
			end      : defaultEnd,
			modifier : defaultModifier,
			lerp     : 1,
			...userOptions,
			ease     : (userOptions.ease && easings[userOptions.ease]) || userOptions.ease || easings.linear
		}

		const start = makeCache(options.start)
		const end = makeCache(options.end)

		const timeline = {
			options,
			start,
			end
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

export default timelines => ({
	addTimeline    : addTimeline(timelines),
	removeTimeline : removeTimeline(timelines)
})
