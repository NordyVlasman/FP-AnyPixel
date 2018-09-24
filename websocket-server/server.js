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

    ws.on('close', () => {
        for (let j = 0, len = clients.length; j < len; j++)
        {
            if(clients[j] === ws)
                clients.splice(j, 1);
        }
    });


    if(clients.length === 0)  {
        clients.push(ws);
    } else {
        for (let j = 0, len = clients.length; j < len; j++)
        {
            if(clients[j].id === ws.id)
            {
                return;
            } else {
                clients.push(ws);
            }
        }
    }

    for (let i = 0, len = clients.length; i < len; i++) {
        if(clients[i].id === ws.id)
            clients[i].send("Player: " + i);
    }
    ws.on('message', function incoming(message) {

        if(message === "board")
        {
            for (let i = 0, len = clients.length; i < len; i++) {
                if(clients[i].id === ws.id)
                {
                    host = ws;
                    clients.splice(i, 1);
                }
            }
        }

        if(message !== "board")
        {
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
                        data.msg = message;
                        host.send(JSON.stringify(data));
                    }
                }
            }

        }
	});
});
