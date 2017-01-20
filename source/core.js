import raf from 'raf'

export const update = (source, { listeners, store }) => {
	const prevState = store.getState()
	const nextState = store.reduce(source)

	if (prevState.progress !== nextState.progress) {
		listeners.progress.forEach(listener => listener(nextState.progress))
	}

	if (prevState.status !== nextState.status) {
		listeners[nextState.status].forEach(listener => listener())
	}
}

const defaultOptions = {
	source  : () => (window.pageYOffset || document.documentElement.scrollTop) + (window.innerHeight / 2),
	iterate : raf
}

export default timelines => userOptons => {
	const options = {
		...defaultOptions,
		...userOptons
	}

	const next = () => {
		const source = options.source()

		timelines.forEach(t => update(source, t))

		options.iterate(next)
	}

	options.iterate(next)
}
