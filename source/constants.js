import { objectToArray } from './utilities'

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
