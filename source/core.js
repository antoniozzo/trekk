export const broadcast = ({ listeners, prevState, nextState }) => {
	if (prevState.progress !== nextState.progress) {
		listeners.progress.forEach(listener => listener(nextState.progress))
	}

	if (prevState.status !== nextState.status) {
		listeners[nextState.status].forEach(listener => listener())
	}
}

export const update = ({ listeners, store, options }, source) => {
	const prevState = store.getState()
	const nextState = store.reduce(source)

	broadcast({ listeners, prevState, nextState })

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
