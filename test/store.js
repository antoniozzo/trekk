import test from 'ava'

import makeStore from '../source/store'

test('it makes a store with a reducer and initial state', t => {
	const reducer = () => 1
	const store = makeStore(reducer)

	t.is(typeof store, 'object')
	t.is(store.getState(), 1)
})

test('it reduces', t => {
	const reducer = state => {
		if (state) {
			t.is(state, 1)
		}

		return 1
	}

	const store = makeStore(reducer)
	store.reduce()
})

test('it reduces multiple times', t => {
	const reducer = state =>
		(state && state + 1) || 1

	const store = makeStore(reducer)

	t.is(store.getState(), 1)
	store.reduce()
	t.is(store.getState(), 2)
	store.reduce()
	t.is(store.getState(), 3)
	store.reduce()
	t.is(store.getState(), 4)
	store.reduce()
	t.is(store.getState(), 5)
})
