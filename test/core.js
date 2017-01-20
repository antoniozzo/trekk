import test from 'ava'

import makeCore, { update } from '../source/core'

test('it updates state', t => {
	const nextState = update({
		reduce : state => state * 2,
		state  : 2
	})

	t.is(nextState, 4)
})

test.cb('it notifies listeners on status change', t => {
	update({
		reduce    : () => ({ status : 'bar' }),
		state     : { status : 'foo' },
		listeners : {
			bar : [() => t.end()]
		}
	})
})

test.cb('it notifies listeners on progress change', t => {
	update({
		reduce    : () => ({ progress : 1 }),
		state     : { progress : 0 },
		listeners : {
			progress : [p => {
				t.is(p, 1)
				t.end()
			}]
		}
	})
})

test('it makes a core function', t => {
	const core = makeCore([])

	t.is(typeof core, 'function')
})

test('it iterates', t => {
	const core = makeCore([])

	let iterations = 0
	core(next => {
		iterations += 1

		if (iterations < 3) {
			next()
		}
	})

	t.is(iterations, 3)
})
