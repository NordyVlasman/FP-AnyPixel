const WebSocket = require('ws');
const uuid = require('node-uuid');

const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    clientMaxWindowBits: 10,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024,
  }
});

console.log("Server listening on port: 8080");

let clients = [];
let host = null;

wss.on('connection', function connection(ws, req) {
    ws.id = uuid.v4();

    /**
     * Websocket close state, wanneer iemand disconnect. pleur m uit de lijst
     */
    ws.on('close', () => {
        for (let j = 0, len = clients.length; j < len; j++)
        {
            if(clients[j] === ws)
                clients.splice(j, 1);
        }
    });

    /**
     * Client list met check of de client al in de list staat
     */
    if(clients.length === 0)  {
        clients.push(ws);
    } else {
        if(clients.filter(e => e.id === ws.id)) {
            return;
        } else {
            clients.push(ws);
        }
    }

    ws.on('message', function incoming(message) {

        if(message === "board") {
            if (clients[clients.length - 1].id === ws.id) {
                host = ws;
                clients.splice(clients.length - 1, 1);
            }
        }

        if(message !== "board")
        {
            console.log(message + ws.id);
            if(clients.length === 2)
            {
                for (let i = 0, len = 2; i < len; i++) {
                    if (clients[i].id === ws.id) {
                        let data = new Object();
                        data.user = ws.id;
                        data.player = i;
                        data.msg = message;
                        host.send(JSON.stringify(data));
                    }
                }
            } else {
                for (let i = 0, len = clients.length; i < len; i++) {
                    if (clients[i].id === ws.id) {
                        let data = new Object();
                        data.user = ws.id;
                        data.player = i;
                        data.msg = message;
                        host.send(JSON.stringify(data));
                    }
                }
            }

        }
	});
});
