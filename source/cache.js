let iteration = 0

export default compute => {
	let cached
	let next

	return () => {
		if (next !== iteration) {
			next = iteration
			cached = compute()
		}

		return cached
	}
}

if (typeof window !== 'undefined') {
	window.addEventListener('resize', () => {
		iteration++
	})
}
