import test from 'ava'

import { linear } from '../source/easings'
import timelineCreator, { defaultModifier } from '../source/timeline'
import makeReducer, { nextStatus, nextProgress } from '../source/reducer'

test('it makes a reducer and gets initial state', t => {
	const reducer = makeReducer({})

	const initialState = reducer()

	t.is(typeof reducer, 'function')
	t.is(typeof initialState, 'object')
})

test('it reduces next progress', t => {
	const progress = nextProgress({
		start   : 10,
		end     : 20,
		state   : { progress : 1 },
		source  : 15,
		options : {
			ease     : linear,
			modifier : defaultModifier
		}
	})

	t.is(progress, 0.5)
})

test('it reduces next progress with linear interpolation', t => {
	const progress = nextProgress({
		start   : 10,
		end     : 30,
		source  : 20,
		state   : { progress : 0 },
		options : {
			lerp     : 0.5,
			ease     : linear,
			modifier : defaultModifier
		}
	})

	t.is(progress, 0.25)
})

test('it reduces next status to waiting', t => {
	const status = nextStatus({
		start  : 120,
		end    : 420,
		source : 100
	})

	t.is(status, 'waiting')
})

test('it reduces next status to walking', t => {
	const status = nextStatus({
		start  : 120,
		end    : 420,
		source : 130
	})

	t.is(status, 'walking')
})

test('it reduces next status to finished', t => {
	const status = nextStatus({
		start  : 120,
		end    : 420,
		source : 450
	})

	t.is(status, 'finished')
})

test('it reduces next status to loading if missing source', t => {
	const status = nextStatus({
		start  : 120,
		end    : 420,
		source : undefined
	})

	t.is(status, 'loading')
})

test('it reduces next state', t => {
	const { addTimeline } = timelineCreator([])

	const reducer = makeReducer(addTimeline({
		source : () => 40,
		start  : () => 20,
		end    : () => 60
	}))

	const state = reducer({
		progress : 0
	})

	t.is(state.progress, 0.5)
})
