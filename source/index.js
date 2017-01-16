import { TRAILS } from './constants'
import { addGuide } from './utilities'
import scroll from './scroll'
import Trail from './Trail'

/**
 * Called when the user is scrolling
 * Will call run on each instance of Trail
 */
function onScroll(y) {
    for (let i = TRAILS.length - 1; i >= 0; i -= 1) {
        TRAILS[i].run(y)
    }
}

/**
 * Called when the user is not scrolling.
 * Will try to resolve any lerp progress.
 */
function onIdle(y) {
    for (let i = TRAILS.length - 1; i >= 0; i -= 1) {
        if (TRAILS[i].isProgressing()) {
            TRAILS[i].run(y)
        }
    }
}

/**
 * Start listening to scroll event
 */
export function start() {
    scroll(onScroll, onIdle)
}

/**
 * Start debug mode
 */
export function debug() {
    showGuides()
}

/**
 * Will draw helper lines for each Trail instance
 * and also for the document trigger
 */
export function showGuides() {
    for (let i = 0; i < TRAILS.length; i += 1) {
        addGuide(TRAILS[i].start)
            .color('green')
            .label(TRAILS[i].options.label)
            .col(i)
            .width(100)
            .line(TRAILS[i].end - TRAILS[i].start)

        addGuide(TRAILS[i].end, i)
            .color('green')
            .label(TRAILS[i].options.label, true)
            .width(100)
            .col(i)
    }

    addGuide(window.innerHeight / 2)
        .color('red')
        .label('')
        .width('100%')
        .fixed()
}

/**
 * Create a Trail instance of the body
 * and export the trekk method as well
 * as other helper methods and start()
 */
const documentTrail = new Trail(document.body, { label : 'body' })
const trekk = documentTrail.trekk.bind(documentTrail)

export default trekk
