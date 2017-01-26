import test from 'ava'

import makeStore from '../source/store'
import core, { update } from '../source/core'

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

	core([], {
		source  : () => 0,
		iterate : next => {
			iterations += 1

			if (iterations < 3) {
				next()
			}
		}
	})

	t.is(iterations, 3)
})
