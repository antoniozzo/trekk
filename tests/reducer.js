import test from 'ava'

import makeReducer, { nextStatus, nextProgress } from '../source/reducer'

test('it makes a reducer for timeline', t => {
    const reducer = makeReducer({})

    t.is(typeof reducer, 'function')
})

test('it reduces next progress', t => {
    const progress = nextProgress(.555555, .888888, 1)

    t.is(progress, .888888)
})

test('it reduces next progress with linear interpolation', t => {
    const progress = nextProgress(.555555, .888888, .5)

    t.is(progress, .7222215000000001)
})

test('it reduces next status to waiting', t => {
    const status = nextStatus({ source : 100, start : 120, length : 300 })

    t.is(status, 'waiting')
})

test('it reduces next status to walking', t => {
    const status = nextStatus({ source : 130, start : 120, length : 300 })

    t.is(status, 'walking')
})

test('it reduces next status to finished', t => {
    const status = nextStatus({ source : 450, start : 120, length : 300 })

    t.is(status, 'finished')
})

test('it reduces next status to loading if missing source', t => {
    const status = nextStatus({ source : undefined, start : 120, length : 300 })

    t.is(status, 'loading')
})

test('it reduces next state', t => {
    const fakeOptions = {
        source   : () => 40,
        start    : () => 20,
        length   : () => 40,
        modifier : (p, v0, v1) => (p - v0) / v1,
    }

    const reducer = makeReducer({ options : fakeOptions })
    
    const state = reducer({
        progress : 0
    })

    t.is(state.progress, .5)
})


















