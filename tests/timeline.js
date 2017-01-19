import test from 'ava'

import timelineService from '../source/timeline'


test('it creates a timeline and adds to the collection', t => {
    const timelines = []
    const { addTimeline } = timelineService(timelines)

    addTimeline({})
    t.is(timelines.length, 1)
})

test('it removes a timeline from the collection', t => {
    const timelines = []
    const { addTimeline, removeTimeline } = timelineService(timelines)

    const timeline = addTimeline({})
    t.is(timelines.length, 1)

    removeTimeline(timeline)
    t.is(timelines.length, 0)
})

test('it removes timeline from the collection only if found', t => {
    const timelines = []
    const { addTimeline, removeTimeline } = timelineService(timelines)

    const timeline = addTimeline({})
    t.is(timelines.length, 1)

    removeTimeline({})
    t.is(timelines.length, 1)
})

test('it creates a timeline from element', t => {
    const timelines = []
    const { fromElement } = timelineService(timelines)

    const fakeElement = {
        offsetTop    : 50,
        offsetHeight : 500
    }

    const timeline = fromElement(fakeElement, {})

    t.is(timelines.length, 1)
    t.is(timeline.options.start(), 50)
    t.is(timeline.options.length(), 500)
})

test('it creates a timeline from pixels', t => {
    const timelines = []
    const { fromPixels } = timelineService(timelines)

    const timeline = fromPixels(300, 600, {})

    t.is(timelines.length, 1)
    t.is(timeline.options.start(), 300)
    t.is(timeline.options.length(), 600)
})

test('it creates a timeline from percentage', t => {
    const timelines = []
    const { fromPixels, fromPercentage } = timelineService(timelines)

    const timelineFromPixels = fromPixels(200, 400, {})
    const timelineFromPercentage = fromPercentage(timelineFromPixels, .2, .5, {})

    t.is(timelines.length, 2)
    t.is(timelineFromPercentage.options.start(), 280)
    t.is(timelineFromPercentage.options.length(), 200)
})

test('it adds event listener to timeline', t => {
    const { addTimeline } = timelineService([])

    const fn = () => {}
    const timeline = addTimeline({}).on('progress', fn)

    t.is(timeline.listeners.progress.length, 1)
    t.is(timeline.listeners.progress[0], fn)
    t.is(timeline.listeners.progress[0], fn)
})

test('it removes event listener from timeline', t => {
    const { addTimeline } = timelineService([])

    const fn = () => {}
    const timeline = addTimeline({}).on('progress', fn)

    t.is(timeline.listeners.progress.length, 1)
    t.is(timeline.listeners.progress[0], fn)

    timeline.off('progress', fn)
    t.is(timeline.listeners.progress.length, 0)
})

test('it only removes event listener from timeline if it can find it', t => {
    const { addTimeline } = timelineService([])

    const fn1 = () => {}
    const fn2 = () => {}
    const timeline = addTimeline({}).on('progress', fn1)

    t.is(timeline.listeners.progress.length, 1)
    t.is(timeline.listeners.progress[0], fn1)

    timeline.off('progress', fn2)
    t.is(timeline.listeners.progress.length, 1)
})


















