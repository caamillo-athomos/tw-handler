const {
    sortBreakpoints
} = require('./utils')

const plugin = require('tailwindcss/plugin')

// Parse data-breakpoints attribute from DOM into a real JS object
const parseDomBreakpoints = (breakpoints) => {
    const breakpointsArray = breakpoints.split(';')
    const breakpointsObject = {}

    for (let breakpoint of breakpointsArray) {
        const [ screen, value ] = breakpoint.split(':')
        breakpointsObject[ screen ] = parseInt(value)
    }

    return sortBreakpoints(breakpointsObject)
}

// Check if breakpoint is impossible
const isBreakpointValid = (breakpoint, twBreakpoint) => {
    if (breakpoint === '*') return true
    const idxTwBreakpoint = Object.keys(mapScreenBreakpoints).indexOf(twBreakpoint)
    const idxBreakpoint = Object.keys(mapScreenBreakpoints).indexOf(breakpoint)
    return idxBreakpoint <= idxTwBreakpoint
}

// Get current Tailwind screen breakpoint
const getTwBreakpoint = () => {
    let currTwBreakPoint = Object.keys(mapScreenBreakpoints)[0]
    Object.keys(mapScreenBreakpoints).forEach(breakPoint =>
        window.innerWidth > mapScreenBreakpoints[breakPoint] ? currTwBreakPoint = breakPoint : ''
    )
    return currTwBreakPoint
}

// Get current Object breakpoint
const getObjectCurrBreakpoint = (breakPoints) => {
    let currBreakPoint = Object.keys(breakPoints)[0]
    Object.keys(breakPoints).forEach(breakPoint =>
        window.innerWidth > mapScreenBreakpoints[breakPoint] ? currBreakPoint = breakPoint : ''
    )
    return currBreakPoint
}

module.exports = plugin(({ addComponents, theme, config }) => {
    const screens = theme('screens', []) // Tailwind configured screens
    const root = {}  // :root
    let lastBreakpoint // Last breakpoint used
    const TW_PREFIX = config('prefix', '') // Tailwind prefix

    for (let screen of Object.keys(screens)) 
        root[`--${ TW_PREFIX }screen-${ screen }`] = screens[screen] // Write all screens
    root[`--${ TW_PREFIX }screens`] = Object.keys(screens).join(',') // Write screens 'array'
    addComponents({ ':root': root })
})