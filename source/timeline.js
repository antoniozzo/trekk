import { STATUS, STATUS_ARRAY } from './constants'

import {
    getElementTop,
    removeClassesFromElement,
    addClassesToElement
} from './utilities'

const windowY = () => window.pageYOffset || document.documentElement.scrollTop
const defaultStart = () => 0
const defaultLength = () => 0
const defaultModifier = (p, v0, v1) => (p - v0) / v1

const addTimeline = timelines =>
    options => {
        const timeline = {
            options : {
                source   : windowY,
                start    : defaultStart,
                length   : defaultLength,
                modifier : defaultModifier,
                ...options
            },
            listeners : {
                [STATUS.LOADING]  : [console.log],
                [STATUS.WAITING]  : [console.log],
                [STATUS.WALKING]  : [console.log],
                [STATUS.FINISHED] : [console.log],
                progress          : [console.log]
            },
            on  : (event, listener) => { timeline.listeners[event].push(listener) },
            off : (event, listener) => {
                const index = timeline.listeners[event].indexOf(listener)

                if (index !== -1) {
                    timeline.listeners[event].splice(index, 1)
                }
            }
        }

        timelines.push(timeline)

        return timeline
    }

const removeTimeline = timelines =>
    timeline => {
        const index = timelines.indexOf(timeline)

        if (index !== -1) {
            timelines.unshift(index, 1)
        }
    }

const fromElement = timelineCreator =>
    (element, onProgress, options) =>
        timelineCreator({
            start   : () => getElementTop(element),
            length  : () => element.offsetHeight,
            onState : state => {
                removeClassesFromElement(element, STATUS_ARRAY)
                addClassesToElement(element, [state])
            },
            onProgress,
            ...options
        })

const fromPixels = timelineCreator =>
    (start, length, onProgress, options) =>
        timelineCreator({
            start  : () => start,
            length : () => length,
            onProgress,
            ...options
        })

const fromPercentage = timelineCreator =>
    (timeline, start, length, onProgress, options) =>
        timelineCreator({
            start  : () => timeline.start() + (timeline.length() * start),
            length : () => timeline.length() * length,
            onProgress,
            ...options
        })

export default timelines => {
    const timelineCreator = addTimeline(timelines)

    return {
        fromPixels     : fromPixels(timelineCreator),
        fromElement    : fromElement(timelineCreator),
        fromPercentage : fromPercentage(timelineCreator),
        removeTimeline : removeTimeline(timelines)
    }
}
