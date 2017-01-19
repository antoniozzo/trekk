import timeline from './source/timeline'
import core from './source/core'

export * as constants from './source/constants'
export * as utilities from './source/utilities'
export * as easings from './source/easings'

const timelines = []

export const { addTimeline, fromElement, fromPercentage, fromPixels } = timeline(timelines)
export default core(timelines)
