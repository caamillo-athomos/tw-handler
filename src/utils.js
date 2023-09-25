/**
 * Breakpoints sorter (ASC)
 * @param { Object } breakpoints - tailwind breakpoints
 * @returns { Object } sorted breakpoints
 */
const sortBreakpoints = (breakpoints) => Object.fromEntries(
        Object.entries(breakpoints).sort(
            ([ ,a ], [ ,b ]) => a - b
        )
)

/**
 * Convert string pixels to an actual number
 * @param { String } pixels - pixels to convert (e.g. '1024px')
 * @returns { Number } pixels value (e.g. 1024)
 */
const getPixelValue = (pixels) =>
        parseInt(pixels.split('px')[0])

/**
 * Normalizes breakpoints into a string-list (for CSS vars)
 * @param { Object } breakpoints - tailwind breakpoints
 * @returns { String } normalized breakpoints
 */
const normalizeBreakpoints = (breakpoints) => 
        Object.keys(breakpoints)
            .filter(key => !(key.includes('letter-spacing') || key.includes('line-height')))
            .join(',')

module.exports = {
    sortBreakpoints,
    getPixelValue,
    normalizeBreakpoints
}