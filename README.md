# About this project

This is a server for logs using websocket.

When I was debugging on my mobile phone, I found it it difficult to known what is happened in the browser. As to the PC browsers, log messages helps me a lot. So I have tried many methods to record log messages on mobile phones.

I've tried to use Ajax(XHR) requests to send log message to server. But it is very inefficiency. I've also tried to add a little log panel on the page to display logs. But it is really annoying - it shields and blocks the page elements. I've also tried chrome remote debugging tools, but it won't work for Safari and UC Browser.

Finally, WebSocket became my last choose. So this project started.


# Install using npm

Install locally:

```
npm install --save websocket-log-server
```

Install globally:

```
npm install -g websocket-log-server
```

# Start the server

If installed locally:

```
./node_modules/.bin/websocket-log-server <HOST> <PORT>
````


If install globally:

```
websocket-log-server <HOST> <PORT>
````

# Use the client:

```
// you can use it just like the global `console`
// i.e:
const console = require('websocket-log-server/client')
console.log("hello world!") // => if the websocket-log-server is running, this message will be on the console of server.
```

Note: if you want to use a different host or port other than 127.0.0.1:9998, you should call `init(host, port)` before start to use the `log(msg)` method.
For example: 

```
const console = require('websocket-log-server/client').init('192.168.1.1', '8888')
console.log("hello world!") // => if the websocket-log-server is running, this message will be on the console of server.
```





