import { STATUS } from './constants'

import {
	lerp,
	isLesserThan,
	isGreaterThan,
	isInBetween
} from './utilities'

export const nextProgress = ({ options, start, end, state, source }) => {
	let progress = options.ease(options.modifier(source, start, end))

	if (options.lerp && state.progress.toFixed(3) !== progress.toFixed(3)) {
		progress = lerp(state.progress, progress, options.lerp)
	}

	if (progress >= 1) {
		progress = 1
	}

	if (progress <= 0) {
		progress = 0
	}

	return progress
}

export const nextStatus = ({ start, end, source }) => {
	if (isLesserThan(source, start)) {
		return STATUS.WAITING
	} else if (isInBetween(source, start, end)) {
		return STATUS.WALKING
	} else if (isGreaterThan(source, end)) {
		return STATUS.FINISHED
	}

	return STATUS.LOADING
}

const initialState = {
	status   : STATUS.LOADING,
	progress : -1
}

export default timeline => (state, source) => {
	if (state) {
		const { options } = timeline
		const start = timeline.start()
		const end = timeline.end()

		return {
			status   : nextStatus({ start, end, source }),
			progress : nextProgress({ state, options, start, end, source })
		}
	}

	return initialState
}
