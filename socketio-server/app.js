const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('static'));

let games = {};

function getOrCreateGame(gameName) {
    let game = games[gameName];
    if(game)
        return game;

    console.log("Creating new game", gameName);
    return games[gameName] = {
        hostSocket: null,
        players: [],
    };
}

function leaveGame(gameName, leavingPlayer) {
    let game = games[gameName];
    if (!game) return console.log('no game with name', gameName, 'to leave');
    game.players = game.players.filter(function(player) { return player.player !== leavingPlayer; });
}

io.on('connection', function(socket) {
   let hostedGames = [];
   let joinedGames = [];

   console.log("User connected");
   socket.on('disconnect',() => {
       console.log('user disconnected');
       console.log('unhosting games', hostedGames);
       hostedGames.forEach(function(g) { games[g].hostSocket = null });
       console.log('leaving games', joinedGames);
       joinedGames.forEach(function(jg) { leaveGame(jg.gameName, jg.player); });
    });

   socket.on('host', (data) => {
      console.log("Host user is gevonden", data);
      let game = getOrCreateGame(data.gameName);
      game.hostSocket = socket;

      hostedGames.push(data.gameName);

   });

   socket.on('buttonUp', (data) => {
       let game = getOrCreateGame(data.gameName);
       game.players.forEach(function(p) {
            if(p.player.num === parseInt(data.user)) {
                let user = {
                    player: data.user,
                    btnEvent: 'buttonUp'
                };
                game.hostSocket.emit('button_event', user);
            }
       });
   });

    socket.on('buttonDown', (data) => {
        let game = getOrCreateGame(data.gameName);
        game.players.forEach(function(p) {
            if(p.player.num === parseInt(data.user)) {
                let user = {
                    player: data.user,
                    btnEvent: 'buttonDown'
                };
                game.hostSocket.emit('button_event', user);
            }
        });
    });

    socket.on('false', (data) => {
        let game = getOrCreateGame(data.gameName);
        game.players.forEach(function(p) {
            if(p.player.num === parseInt(data.user)) {
                let user = {
                    player: data.user,
                    btnEvent: 'false'
                };
                game.hostSocket.emit('button_event', user);
            }
        });
    });

   socket.on('join', (data) => {
      console.log('join game', data);

      let game = getOrCreateGame(data.gameName);
      let num = 1;
      game.players.forEach(function(p) {
         if(p.player.num === num)
             num += 1;
      });

      socket.broadcast.emit("player_join");

      let player = {
         num: num,
         playerName: 'Player' + num,
      };

      game.players.push({
          player: player,
          socket: socket
      });

      joinedGames.push({
          gameName: data.gameName,
          player: player
      });

       console.log("new player joined", player);

       socket.emit('user_join', player);
   });


});

const port = 5000;
server.listen(port, function(err) {
   if (err)
       return console.log(err.stack);
   console.log('Listening on port', port);
});
