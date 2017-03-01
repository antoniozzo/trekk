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
	let enabled = true

	const next = () => {
		if (enabled) {
			const source = options.source() + options.offset()
			const start = +new Date()

			for (let i = 0; i < timelines.length; i += 1) {
				update(timelines[i], source)

				const end = +new Date()

				if (end - start > options.fps) {
					break
				}
			}
		}

		options.iterate(next)
	}

	options.iterate(next)

	return {
		enable  : () => { enabled = true },
		disable : () => { enabled = false }
	}
}
