#!/usr/bin/env node
if (/^(undefined|-h|--help|-\?)$/.test(process.argv[2])) {
  console.log('Usage: websocket-log-server [listen-host] [listen-port]');
  process.exit(1);
}


let WebSocketServer = require('websocket').server;
let http = require('http');

const HOST = process.argv[2] || '0.0.0.0'
const PORT = process.argv[3] || 9998

let server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(PORT, HOST, function() {
    console.log((new Date()) + ' Server is listening on  ' + HOST + ':' + PORT);
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    let connection = request.accept('', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    
    clientInfo = connection.remoteAddress
    
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log(clientInfo + ' [LOG] ' + message.utf8Data)
        } else {
            console.log(clientInfo + " [SYS] Warn: unknown message type: " + message.type)
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

