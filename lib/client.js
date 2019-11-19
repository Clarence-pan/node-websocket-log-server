'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this is a sample client:
// you can use it just like the global `console`
// i.e:
//   const console = require('websocket-log-server/client')
//   console.log("hello world!") // => if the websocket-log-server is running, this message will be on the console of server.

module.exports = { init: init, log: log, warn: warn, error: error };

var SERVER_HOST = '127.0.0.1';
var SERVER_PORT = 9998;

var ws = null;

/**
 * init the log client (will not reinitialized)
 * @param {String} msg 
 * @return this
 */
function init(host, port) {
    if (ws) {
        return this;
    }

    try {
        host = host || SERVER_HOST;
        port = port || SERVER_PORT;
        ws = new WebSocket('ws://' + host + ':' + port + '/');
    } catch (e) {
        window.console.warn('WebSocket open failed. ' + e);
    }

    return this;
}

/**
 * Record a log message
 * @param {String} msg 
 */
function log(msg) {
    init();

    msg = '[' + now() + '] ' + msg;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (args.length > 0) {
        msg += ' ' + [].slice.call(args).map(function (arg) {
            return (0, _stringify2.default)(arg);
        }).join(' ');
    }

    if (ws) {
        try {
            ws.send(msg);
        } catch (e) {
            window.console.warn('WebSocket log failed: ' + e);
        }
    }
}

/**
 * Record a warning log message
 * @param {String} msg 
 */
function warn(msg) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    log.apply(undefined, ["[WARN] " + msg].concat(args));
}

/**
 * Record an error log message
 * @param {String} msg 
 */
function error(msg) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    log.apply(undefined, ["[ERR] " + msg].concat(args));
}

/**
 * @return string - current time, only the minutes and seconds
 */
function now() {
    return new Date().toISOString().replace(/^.*T\d+:|Z$/g, '');
}