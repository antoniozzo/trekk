import raf from 'raf'
import makeReducer from './reducer'

export default timelines => () => {
    const reducers = timelines.map(makeReducer)
    const listeners = timelines.map(t => t.listeners)
    let state = reducers.map(r => r())

    const next = () => {
        state = reducers.map((reduce, i) => {
            const prevState = state[i]
            const nextState = reduce(prevState)

            if (prevState.status !== nextState.status) {
                listeners[i][nextState.status].forEach(listener => listener())
            }

            if (prevState.progress !== nextState.progress) {
                listeners[i].progress.forEach(listener => listener(nextState.progress))
            }

            return nextState
        })

        raf(next)
    }

    raf(next)
}
