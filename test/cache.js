import test from 'ava'

import makeCache, { clear } from '../source/cache'

test('it caches', t => {
	let num = 0
	const cache = makeCache(() => num += 1)

	t.is(cache(), 1)
	t.is(cache(), 1)
})

test('it clears cache', t => {
	let num = 0
	const cache = makeCache(() => num += 1)

	t.is(cache(), 1)
	clear()
	t.is(cache(), 2)
})
