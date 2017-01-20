import { STATUS } from './constants'

import {
	lerp,
	isLesserThan,
	isGreaterThan,
	isInBetween
} from './utilities'

export const nextProgress = (prev, p, l) => {
	const next = p > 1 ? 1 : (p < 0 ? 0 : p)

	return (l !== 1 && prev.toFixed(3) !== next.toFixed(3) && lerp(prev, next, l)) || next
}

export const nextStatus = ({ source, start, length }) => {
	if (isLesserThan(source, start)) {
		return STATUS.WAITING
	} else if (isInBetween(source, start, start + length)) {
		return STATUS.WALKING
	} else if (isGreaterThan(source, start + length)) {
		return STATUS.FINISHED
	}

	return STATUS.LOADING
}

const initialState = {
	status   : STATUS.LOADING,
	progress : -1
}

export default options => (state = initialState, source) => {
	if (source) {
		const offset = options.offset()
		const start = options.start() + offset
		const length = options.length() - (offset * 2)
		const status = nextStatus({ source, start, length })
		const progress = nextProgress(
			state.progress,
			options.modifier(source, start, length),
			options.lerp
		)

		return { status, progress }
	}

	return state
}
