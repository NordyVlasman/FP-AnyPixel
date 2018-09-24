const WebSocket = require('ws');
 
const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: { // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    clientMaxWindowBits: 10,       // Defaults to negotiated value.
    serverMaxWindowBits: 10,       // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10,          // Limits zlib concurrency for perf.
    threshold: 1024,               // Size (in bytes) below which messages
                                   // should not be compressed.
  }
});
console.log("Server listening on port: 8080");
let webSocketList = [];

wss.on('connection', function connection(ws, req) {
	webSocketList.push(ws);
    ws.on('message', function incoming(message) {
		webSocketList.forEach((webSocket) => {
		    const data = new Object();
            data.user = webSocket._socket.remoteAddress.toString();
            data.msg = message;
			webSocket.send(JSON.stringify(data));
		});
	});
});