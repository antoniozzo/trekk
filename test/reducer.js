import test from 'ava'

import { defaultModifier } from '../source/timeline'
import makeReducer, { nextStatus, nextProgress } from '../source/reducer'

test('it makes a reducer and gets initial state', t => {
	const reducer = makeReducer({})

	const initialState = reducer()

	t.is(typeof reducer, 'function')
	t.is(typeof initialState, 'object')
})

test('it reduces next progress', t => {
	const progress = nextProgress({
		start   : () => 10,
		length  : () => 20,
		options : {
			lerp     : 1,
			ease     : p => p,
			modifier : defaultModifier
		}
	}, {
		progress : 1
	}, 20)

	t.is(progress, 0.5)
})

test('it reduces next progress with linear interpolation', t => {
	const progress = nextProgress({
		start   : () => 10,
		length  : () => 20,
		options : {
			lerp     : 0.5,
			ease     : p => p,
			modifier : defaultModifier
		}
	}, {
		progress : 1
	}, 20)

	t.is(progress, 0.75)
})

test('it reduces next status to waiting', t => {
	const status = nextStatus({
		start  : () => 120,
		length : () => 300
	}, 100)

	t.is(status, 'waiting')
})

test('it reduces next status to walking', t => {
	const status = nextStatus({
		start  : () => 120,
		length : () => 300
	}, 130)

	t.is(status, 'walking')
})

test('it reduces next status to finished', t => {
	const status = nextStatus({
		start  : () => 120,
		length : () => 300
	}, 450)

	t.is(status, 'finished')
})

test('it reduces next status to loading if missing source', t => {
	const status = nextStatus({
		start  : () => 120,
		length : () => 300
	}, undefined)

	t.is(status, 'loading')
})

test('it reduces next state', t => {
	const reducer = makeReducer({
		options : {
			offset   : () => 0,
			lerp     : 1,
			ease     : p => p,
			modifier : defaultModifier
		},
		start  : () => 20,
		length : () => 40
	})

	const state = reducer({
		progress : 0
	}, 40)

	t.is(state.progress, 0.5)
})
