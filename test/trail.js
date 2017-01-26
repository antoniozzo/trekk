import test from 'ava'

import makeTimelineCreators from '../source/timeline'
import makeTrailCreator, { getTimelineOptions } from '../source/trail'

const scope = {
	start : () => 100,
	end   : () => 200
}

test('it makes a trail creator', t => {
	const trail = makeTrailCreator(makeTimelineCreators([]))

	t.is(typeof trail, 'function')
})

test('it adds a timeline', t => {
	const trail = makeTrailCreator(makeTimelineCreators([]))

	const myTrail = trail(0)

	t.is(typeof myTrail, 'function')
})

// test('it throws error for missing param', t => {
// 	t.throws(() => getTimelineOptions(scope), Error, 'First parameter false...')
// })

test('it gets options from start, end, progress and options', t => {
	const progress = () => {}
	const options = getTimelineOptions(scope, 200, 400, progress, { foo : 'bar' })

	t.is(options.progress, progress)
	t.is(options.start(), 300)
	t.is(options.end(), 500)
	t.is(options.foo, 'bar')
})

test('it gets options from start and progress', t => {
	const progress = () => {}
	const options = getTimelineOptions(scope, 200, progress)

	t.is(options.progress, progress)
	t.is(options.start(), 300)
	t.is(options.end(), 300)
})

test('it gets options from element and progress', t => {
	const element = {
		offsetTop    : 200,
		offsetHeight : 400
	}

	const progress = () => {}
	const options = getTimelineOptions(scope, element, progress)

	t.is(options.progress, progress)
	t.is(options.start(), 200)
	t.is(options.end(), 600)
})

test('it toggles classes for trail created from element', t => {
	const element = {
		offsetTop    : 200,
		offsetHeight : 400,
		classList    : {
			remove : className => t.is(className, 'loading')
		}
	}

	const progress = () => {}
	const options = getTimelineOptions(scope, element, progress)

	element.classList.add = className => t.is(className, 'waiting')
	options.waiting()

	element.classList.add = className => t.is(className, 'walking')
	options.walking()

	element.classList.add = className => t.is(className, 'finished')
	options.finished()
})

test.cb('it bubbles callbacks of trail created from element', t => {
	const element = {
		offsetTop    : 200,
		offsetHeight : 400,
		classList    : {
			remove : className => t.is(className, 'loading'),
			add    : className => t.is(className, 'waiting')
		}
	}

	const options = getTimelineOptions(scope, element, () => {}, {
		waiting : () => t.end()
	})

	options.waiting()
})

test('it gets options from percentage and progress', t => {
	const progress = () => {}
	const options = getTimelineOptions(scope, '5%', '60%', progress)

	t.is(options.progress, progress)
	t.is(options.start(), 105)
	t.is(options.end(), 160)
})

test('it gets options from single percentage and progress', t => {
	const progress = () => {}
	const options = getTimelineOptions(scope, '5%', progress)

	t.is(options.progress, progress)
	t.is(options.start(), 105)
	t.is(options.end(), 105)
})

test('it gets options from progress', t => {
	const progress = () => {}
	const options = getTimelineOptions(scope, progress)

	t.is(options.progress, progress)
	t.is(options.start(), 100)
	t.is(options.end(), 200)
})

test('it gets options with offset', t => {
	const progress = () => {}
	const options = getTimelineOptions(scope, progress, {
		offset : () => 40
	})

	t.is(options.progress, progress)
	t.is(options.start(), 140)
	t.is(options.end(), 160)
})
