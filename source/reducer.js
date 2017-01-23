import { STATUS } from './constants'

import {
	lerp,
	isLesserThan,
	isGreaterThan,
	isInBetween
} from './utilities'

export const nextProgress = ({ options, start, length }, state, source) => {
	let progress = options.ease(options.modifier(source, start(), length()))

	if (options.lerp && state.progress.toFixed(3) !== progress.toFixed(3)) {
		progress = lerp(state.progress, progress, options.lerp)
	}

	return progress
}

export const nextStatus = ({ start, length }, source) => {
	if (isLesserThan(source, start())) {
		return STATUS.WAITING
	} else if (isInBetween(source, start(), start() + length())) {
		return STATUS.WALKING
	} else if (isGreaterThan(source, start() + length())) {
		return STATUS.FINISHED
	}

	return STATUS.LOADING
}

const initialState = {
	status   : STATUS.LOADING,
	progress : -1
}

export default timeline => (state = initialState, source) => {
	if (source) {
		return {
			status   : nextStatus(timeline, source),
			progress : nextProgress(timeline, state, source)
		}
	}

	return state
}
