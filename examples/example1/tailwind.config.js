const twHandler = require('../../src/main')

module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {},
  },
  plugins: [
    twHandler
  ],
}