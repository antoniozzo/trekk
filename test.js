import test from 'ava'

import { STATUS } from './source/constants'
import base from './source/objects/base'
import stop from './source/objects/stop'
import wait from './source/abilities/wait'

test('it sets the status', t => {
    const object = Object.create(stop)
    t.is(object.status, STATUS.LOAD)

    object.setStatus(STATUS.IDLE)
    t.is(object.status, STATUS.IDLE)
    t.is(stop.status, STATUS.LOAD)
    t.is(base.status, STATUS.LOAD)
})

test('it sets and rounds start', t => {
    const object = Object.create(base)
    object.setStart(300.2)
    t.is(object.start, 300)
})

test('it sets and rounds end', t => {
    const object = Object.create(base)
    object.setEnd(300.2)
    t.is(object.end, 300)
})
