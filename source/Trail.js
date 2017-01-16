import { DEFAULTS, TRAILS, STATUS, STATUS_ARRAY } from './constants'
import easings from './easings'

import {
    log,
    lerp,
    isArray,
    getElementTop,
    addClassesToElement,
    removeClassesFromElement
} from './utilities'

export default class Trail {
    /**
     * Trail class takes a {path} that can be
     * an element or an array of numbers.
     *
     * Pass {options} to modify the default options.
     *
     * Pass another Trail as {parent} to base
     * start and end positions within the parent
     */
    constructor(path, options, parent) {
        this.status = STATUS.LOAD

        this.options = {
            ...DEFAULTS,
            ...options
        }

        this.options.ease = typeof this.options.ease === 'string'
            ? easings[this.options.ease]
            : this.options.ease

        if (isArray(path)) {
            this.start = (path[1] > 1 ? path[0] : path[0] * parent.length) + parent.start
            this.end = (path[1] > 1 ? path[1] : path[1] * parent.length) + parent.start
        } else {
            const top = getElementTop(path)
            this.element = path
            this.start = top
            this.end = top + path.offsetHeight
        }

        this.start += isArray(this.options.offset) ? this.options.offset[0] : this.options.offset
        this.end -= isArray(this.options.offset) ? this.options.offset[1] : this.options.offset
        this.length = this.end - this.start

        TRAILS.push(this)
    }
    /**
     * Main method to set the next state for the Trail.
     * Call with current {y} scroll position
     */
    run(y) {
        if (this.status !== STATUS.IDLE && this.shouldWait(y)) {
            this.progress(y, 0)
            this.wait()
        }

        if (this.status !== STATUS.DONE && this.shouldFinish(y)) {
            this.progress(y, 1)
            this.finish()
        }

        if (this.status !== STATUS.WALK && this.shouldWalk(y)) {
            this.walk()
        }

        if (this.shouldWalk(y) || this.isProgressing()) {
            this.progress(y)
        }
    }
    /**
     * Creates a new Trail with {this} as {parent}
     * and returns the new Trail
     */
    trekk(path, onProgress, options) {
        return new Trail(
            path,
            (options && { onProgress, ...options }) || onProgress,
            this
        )
    }
    /**
     * Creates a new Trail with {this} as {parent}
     * and returns {this}
     */
    trail(...args) {
        this.trekk(...args)
        return this
    }
    /**
     * Creates a new Trail with {this} as {parent}
     * and the same start and end position
     * then returns {this}
     */
    stop(path, ...args) {
        if (typeof path === 'number') {
            this.trekk([path, path], ...args)
        } else {
            this.trekk([path.offsetTop, path.offsetTop], ...args)
        }

        return this
    }
    /**
     * Set the {status} of {this}.
     * If there is an element,
     * will add the {status} as element className.
     */
    setStatus(status) {
        this.status = status

        if (this.element) {
            removeClassesFromElement(this.element, ...STATUS_ARRAY)
            addClassesToElement(this.element, status)
        }
    }
    /**
     * Is called when scroll position is above the Trail start position.
     * Will set the {status} to "waiting" and trigger {onWaiting} callback.
     */
    wait() {
        this.setStatus(STATUS.IDLE)
        log(this.options.log, `${this.options.label} is ${STATUS.IDLE}`)
        if (this.options.onWaiting) this.options.onWaiting(0)
    }
    /**
     * Is called when scroll position is within the Trail start and end position.
     * Will set the {status} to "walking" and trigger {onWalking} callback.
     */
    walk() {
        this.setStatus(STATUS.WALK)
        log(this.options.log, `${this.options.label} is ${STATUS.WALK}`)
        if (this.options.onWalking) this.options.onWalking()
    }
    /**
     * Is called when scroll position is below the Trail end position.
     * Will set the {status} to "finished" and trigger {onFinished} callback.
     */
    finish() {
        this.setStatus(STATUS.DONE)
        log(this.options.log, `${this.options.label} is ${STATUS.DONE}`)
        if (this.options.onFinished) this.options.onFinished(1)
    }
    /**
     * Sets the current progress or calls {getProgress} with current scroll y position.
     *
     * If the Trail has a {lerp} value, create a linear interpolation
     * between the previous progress and the new progress.
     *
     * Will trigger {onProgress} callback with the current progress.
     */
    progress(y, progress) {
        this.currentProgress = progress !== undefined ? progress : this.getProgress(y)

        const lerpProgress = (this.prevProgress && lerp(this.prevProgress, this.currentProgress, this.options.lerp)) || this.currentProgress
        this.prevProgress = this.currentProgress.toFixed(3) !== lerpProgress.toFixed(3) ? lerpProgress : this.currentProgress

        log(this.options.log, `${this.options.label} is progressing: ${this.prevProgress}`)
        if (this.options.onProgress) this.options.onProgress(this.prevProgress)
    }
    /**
     * Check if {y} is above the Trail start position.
     */
    shouldWait(y) {
        return y < this.start
    }
    /**
     * Check if {y} is below the Trail end position.
     */
    shouldFinish(y) {
        return y >= this.end
    }
    /**
     * Check if {y} is within the Trail start and end position.
     */
    shouldWalk(y) {
        return (!this.shouldWait(y) && !this.shouldFinish(y))
    }
    /**
     * Get the {progress} based on {y} scroll position
     */
    getProgress(y) {
        const length = this.end - this.start
        const posY = y - this.start
        const progress = posY / length

        return this.options.ease(progress > 1 ? 1 : (progress < 0 ? 0 : progress))
    }
    /**
     * Check if {progress} has any linear interpolation to resolve
     */
    isProgressing() {
        return this.currentProgress !== undefined && this.prevProgress !== this.currentProgress
    }
}
