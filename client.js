// this is a sample client:
// you can use it just like the global `console`
// i.e:
//   const console = require('websocket-log-server/client')
//   console.log("hello world!") // => if the websocket-log-server is running, this message will be on the console of server.

module.exports = {init, log, warn, error}

const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9998

let ws = null

/**
 * init the log client (will not reinitialized)
 * @param {String} msg 
 * @return this
 */
function init(host, port) {
    if (ws){
        return this
    }

    try {
        host = host || SERVER_HOST
        port = port || SERVER_PORT
        ws = new WebSocket(`ws://${host}:${port=SERVER_PORT}}/`)
    } catch (e){
        window.console.warn('WebSocket open failed. ' + e)
    }

    return this
}

/**
 * Record a log message
 * @param {String} msg 
 */
function log(msg, ...args) {
    init()

    msg = '[' + now() + '] ' + msg

    if (args.length > 0) {
        msg += ' ' + [].slice.call(args).map(arg => JSON.stringify(arg)).join(' ')
    }

    if (ws){
        try {
            ws.send(msg)
        } catch (e){
            window.console.warn('WebSocket log failed: ' + e)
        }
    }
}

/**
 * Record a warning log message
 * @param {String} msg 
 */
function warn(msg, ...args) {
    log("[WARN] " + msg, ...args)
}

/**
 * Record an error log message
 * @param {String} msg 
 */
function error(msg, ...args) {
    log("[ERR] " + msg, ...args)
}

/**
 * @return string - current time, only the minutes and seconds
 */
function now() {
    return (new Date()).toISOString().replace(/^.*T\d+:|Z$/g,'')
}
