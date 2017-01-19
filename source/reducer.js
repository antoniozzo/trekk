import { STATUS } from './constants'

import {
    lerp,
    isLesserThan,
    isGreaterThan,
    isInBetween
} from './utilities'

export const nextProgress = (prev, p, l) => {
    const next = p > 1 ? 1 : (p < 0 ? 0 : p)

    return (l !== 1 && prev.toFixed(3) !== next.toFixed(3) && lerp(prev, next, l)) || next
}

export const nextStatus = ({ source, start, length }) => {
    if (isLesserThan(source, start)) {
        return STATUS.WAITING
    } else if (isInBetween(source, start, start + length)) {
        return STATUS.WALKING
    } else if (isGreaterThan(source, start + length)) {
        return STATUS.FINISHED
    }

    return STATUS.LOADING
}

const initialState = {
    status   : STATUS.LOADING,
    progress : 0
}

export default ({ options }) => (state = initialState) => {
    const source = options.source()
    const start = options.start()
    const length = options.length()
    const status = nextStatus({ source, start, length })
    const progress = nextProgress(state.progress, options.modifier(options.source(), start, length), options.lerp)

    return { status, progress }
}
