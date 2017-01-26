import { isFunction } from './utilities'

export const update = (timeline, source) => {
	const { store, options } = timeline
	const prevState = store.getState()
	const nextState = store.reduce(source)

	if (options.progress && prevState.progress !== nextState.progress) {
		options.progress(nextState.progress, timeline)
	}

	if (prevState.status !== nextState.status && isFunction(options[nextState.status])) {
		options[nextState.status](timeline)
	}

	return nextState
}

export default (timelines, options) => {
	const next = () => {
		const source = options.source()

		timelines.forEach(t => update(t, source))

		options.iterate(next)
	}

	options.iterate(next)
}
