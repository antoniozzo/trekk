import test from 'ava'

import {
	lerp,
	isInBetween,
	isLesserThan,
	isGreaterThan,
	objectToArray,
	getElementTop,
	addClassesToElement,
	removeClassesFromElement
} from '../source/utilities'

test('x is lesser than y', t => {
	t.true(isLesserThan(1, 2))
	t.false(isLesserThan(2, 1))
})

test('x is greater than y', t => {
	t.true(isGreaterThan(2, 1))
	t.false(isGreaterThan(1, 2))
})

test('x is in between v and y', t => {
	t.true(isInBetween(5, 4, 7))
	t.false(isInBetween(4, 5, 6))
})

test('it linear interpolates v0 toward the v1', t => {
	t.is(lerp(20, 40, 0.5), 30)
	t.is(lerp(200, 800, 0.2), 320)
})

test('it linear interpolates v0 toward the v1 and rounds', t => {
	t.is(lerp(200, 800, 0.19, true), 314)
})

test('it creates array from object', t => {
	t.deepEqual(objectToArray({ foo : 'bar', bar : 'foo' }), ['bar', 'foo'])
})

test('it adds classes to element', t => {
	const fakeElement = {
		classList : {
			add : c => {
				t.is(c, 'test')
			}
		}
	}

	addClassesToElement(fakeElement, 'test')
})

test('it removes classes from element', t => {
	const fakeElement = {
		classList : {
			remove : c => {
				t.is(c, 'test')
			}
		}
	}

	removeClassesFromElement(fakeElement, 'test')
})

test('it gets element top value', t => {
	const fakeElement = {
		offsetTop    : 30,
		offsetParent : {
			offsetTop : 50
		}
	}

	t.is(getElementTop(fakeElement), 80)
})

test('it returns zero of can not get element top', t => {
	t.is(getElementTop({}), 0)
})
