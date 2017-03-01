import test from 'ava'

import makeStore from '../source/store'
import makeCore, { update } from '../source/core'

test('it updates state', t => {
	const nextState = update({
		store   : makeStore(state => (state && state * 2) || 2),
		options : {}
	}, 0)

	t.is(nextState, 4)
})

test.cb('it notifies listeners on status change', t => {
	update({
		store : makeStore(state => ({
			status : state ? 'bar' : 'foo'
		})),
		options : {
			bar : () => t.end()
		}
	}, 0)
})

test.cb('it notifies listeners on progress change', t => {
	update({
		store : makeStore(state => ({
			progress : state ? 1 : 0
		})),
		options : {
			progress : p => {
				t.is(p, 1)
				t.end()
			}
		}
	}, 0)
})

test('it iterates', t => {
	let iterations = 0

	makeCore([], {
		source  : () => 0,
		offset  : () => 0,
		iterate : next => {
			iterations += 1

			if (iterations < 3) {
				next()
			}
		}
	})

	t.is(iterations, 3)
})

test('it skips timelines above 60fps', t => {
	let iterations = 0

	makeCore([
		{
			store   : makeStore(() => 1),
			options : {}
		},
		{
			store   : makeStore(state => (state && t.fail()) || 1),
			options : {}
		}
	], {
		source  : () => 0,
		offset  : () => 0,
		fps     : -1,
		iterate : next => {
			iterations += 1

			if (iterations < 2) {
				next()
			}
		}
	})
})

test.cb('it disables/enables the core', t => {
	let iterations = 0

	const core = makeCore([{
		store   : makeStore(state => (state && t.fail()) || 1),
		options : {}
	}], {
		source  : () => 0,
		offset  : () => 0,
		fps     : -1,
		iterate : next => {
			iterations += 1

			if (iterations < 2) {
				setTimeout(() => {
					next()
					t.end()
				}, 100)
			}
		}
	})

	core.enable()
	core.disable()
})
