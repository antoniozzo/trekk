/**
 * Log next arguments if {loud} is true
 */
export const isLesserThan = (y, v) => y < v
export const isGreaterThan = (y, v) => y > v
export const isInBetween = (y, v0, v1) => y >= v0 && y <= v1


/**
 * Linear interpolation method.
 * Takes a {start} and {end} value and
 * return value in-between based on a {time} variable.
 * Pass true to {round} for rounding to int value.
 */
export function lerp(start, end, time, round) {
    const v = (start * (1 - time)) + (end * time)

    return round ? Math.round(v) : v
}

/**
 * Returns an Object's values as an Array
 */
export function objectToArray(object) {
    return Object.keys(object).map(key => object[key])
}

/**
 * Removes {classNames} from {element}
 */
export function removeClassesFromElement(element, ...classNames) {
    return element.classList.remove(...classNames)
}

/**
 * Add {classNames} to {element}
 */
export function addClassesToElement(element, ...classNames) {
    return element.classList.add(...classNames)
}

/**
 * Get {element}'s top position in document
 */
export function getElementTop(element) {
    let currentElement = element
    let top = 0

    do {
        top += currentElement.offsetTop || 0
        currentElement = currentElement.offsetParent
    } while (currentElement)

    return top
}

/**
 * Create a guideline
 */
// export function addGuide(pos, col = 0) {
//     const guide = document.createElement('div')
//     const label = document.createElement('span')
//     const line = document.createElement('div')

//     guide.style.zIndex = 999
//     guide.style.width = '100%'
//     guide.style.position = 'absolute'
//     guide.style.top = `${pos}px`
//     guide.style.left = 0

//     label.style.borderWidth = 0
//     label.style.borderStyle = 'dashed'
//     label.style.position = 'absolute'
//     label.style.margin = '2px 5px'

//     document.body.appendChild(guide)

//     return {
//         color(value) {
//             // guide.style.borderTopColor = value
//             line.style.borderLeftColor = value
//             label.style.color = value
//             label.style.borderColor = value

//             return this
//         },
//         fixed() {
//             guide.style.position = 'fixed'

//             return this
//         },
//         label(text, top) {
//             label.innerHTML = text

//             guide.appendChild(label)

//             if (top) {
//                 label.style.bottom = 0
//                 label.style.borderBottomWidth = '1px'
//             } else {
//                 label.style.top = 0
//                 label.style.borderTopWidth = '1px'
//             }

//             return this
//         },
//         col(i) {
//             guide.style.left = `${20 * i}px`

//             return this
//         },
//         width(w) {
//             label.style.width = w

//             return this
//         },
//         line(h) {
//             line.style.borderLeft = '1px dashed green'
//             line.style.position = 'absolute'
//             line.style.top = 0
//             line.style.left = 0
//             line.style.width = '1px'
//             line.style.height = `${h}px`

//             guide.appendChild(line)

//             return this
//         }
//     }
// }
