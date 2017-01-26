export default reducer => {
	let state = reducer()

	return {
		getState : () => state,
		reduce   : () => {
			state = reducer(state)

			return state
		}
	}
}
