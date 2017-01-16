import raf from 'raf'

/**
 * Current scroll y position
 */
let y = 0

/**
 * Get y scroll position from window or document
 */
function getY() {
    return window.pageYOffset || document.documentElement.scrollTop
}

/**
 * Recursive method running requestAnimationFrame.
 * Will callback {onScroll} with current y when user is scrolling.
 * Will callback {onIdle} with current y when user is NOT scrolling.
 * Pass an {offset} to move the current y down
 */
export default function (onScroll, onIdle, offset = (window.innerHeight / 2)) {
    const next = () => {
        const nextY = getY() + offset

        if (y === nextY) {
            onIdle(y)
            raf(next)
            return
        }

        y = nextY

        onScroll(y)
        raf(next)
    }

    next()
}
