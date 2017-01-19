import { objectToArray } from './utilities'

/**
 * Default Trail options
 */
export const DEFAULTS = {
    // Label used in guidelines
    label : 'Undefined Trail',

    // Offset the start and end position
    offset : 0,

    // Easing of the Trail progress, supports strings:
    //
    // linear
    // easeInQuad
    // easeOutQuad
    // easeInOutQuad
    // easeInCubic
    // easeOutCubic
    // easeInOutCubic
    // easeInQuart
    // easeOutQuart
    // easeInOutQuart
    // easeInQuint
    // easeOutQuint
    // easeInOutQuint
    //
    // or a custom easing function(progress) {}
    ease : 'linear',

    // Linear interpolation value, from 0..1
    // used to "delay" progress
    lerp : 1,

    // Activate debug logs for the Trail
    log : false
}

/**
 * All available Trail statuses
 */
export const STATUS = {
    // The Trail has not loaded yet.
    // Will change after calling {trekk.start}
    LOADING : 'loading',

    // The y scroll position is above the Trail start position
    WAITING : 'waiting',

    // The y scroll position is within the Trail start and end position
    WALKING : 'walking',

    // The y scroll position is below the Trail end position
    FINISHED : 'finished'
}

/**
 * All Trail statuses as an array
 */
export const STATUS_ARRAY = objectToArray(STATUS)

/**
 * Will hold all the instances of Trail
 */
export const TRAILS = []
