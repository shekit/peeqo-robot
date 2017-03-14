const events = require('events')
var eventEmitter = new events.EventEmitter()

eventEmitter.setMaxListeners(Infinity)

module.exports = eventEmitter