export default reducer => {
	let state = reducer()

	return {
		getState : () => state,
		reduce   : source => {
			state = reducer(state, source)

			return state
		}
	}
}
