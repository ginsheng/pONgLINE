GAME_WIDTH = 700;
GAME_HEIGHT = 450;
GAME_FPS = 30;
var players = [];
var clients = {};

var io = require('socket.io').listen(8124);

io.sockets.on('connection', function (socket) {

	// var sessionID = socket.id;
	//console.log('Confirmada la entrada de sesión: ' + socket.id);
	clients[socket.id] = socket;
	// player tries to connect
	socket.on('game connect', function(user) {
		// console.log('[' + user.session_id + '] quiere jugar');
		console.log('Ten&iacute;mos: ' + players.length + ' jugadores conectados');
		if (players.length < 2 ) {
			//Setting game: 
			if (typeof game == 'undefined') {
				game = new Object();
				game._width = GAME_WIDTH;
				game._height = GAME_HEIGHT;
				game._fps = GAME_FPS;
				
				ball = new Object();

				ball._color = 'black';
				ball._x = 0;
				ball._y = 15;
				ball._radius = 15;
				ball._speed = 7;
				ball._factorX = 1;
				ball._factorY = 1;

				game._BALL = ball;

			}
			// console.log('Enviando datos de bola ' + game._BALL);
			// Setting player
			var player = new Object();
			player._name = 'player' + (players.length + 1);
			player._number = (players.length + 1);
			player._width = 5;
			player._speed = 12;
			player._color = player._number == 1 ? 'blue' : 'red';
			player._x = player._number == 1 ? 0 : GAME_WIDTH - player._width;
			player._height = (GAME_HEIGHT / 4);
			player._y = (GAME_HEIGHT / 2) - (player._height / 2);
			player._sessionID = user.session_id;
			// adding player to list
			players.push(player);
			
			console.log('Se conectó al jugador número ' + (players.length));
		} 

		// sending player & game data back to client
		socket.emit('game connected', {player_settings: player, game_settings: game});

		// when player2 connects, then the server notifies both players they can start
		if (players.length == 2) {
			player1 = players[0];
			player2 = players[1];
			
			var table = {
				_width: GAME_WIDTH,
				_height: GAME_HEIGHT,
			}

			clients[player1._sessionID].emit('rival arrived', player2);
			clients[player2._sessionID].emit('rival arrived', player1);

			game_latency = setInterval(function() {
				// var player1 = clients[socketPlayer1].player;
				// var player2 = clients[socketPlayer2].player;

				console.log('Jugador 1: (' + player1._x + ', ' + player1._y + ')');
				console.log('Jugador 2: (' + player2._x + ', ' + player2._y + ')');

				var condition = (typeof player2 == 'undefined') ?
						(game._BALL._x + game._BALL._radius > table._width) : 
						(game._BALL._x + game._BALL._radius > player2._x - player2._width && game._BALL._x < player2._x);

				if (condition)
					game._BALL._factorX = -1;

				if (game._BALL._x - game._BALL._radius < player1._x + player1._width && game._BALL._x > player1._x)
					if (game._BALL._y >= player1._y && game._BALL._y <= player1._y + player1._height)
						game._BALL._factorX = 1;

				if (game._BALL._y + game._BALL._radius > table._height)
					game._BALL._factorY = -1;
				if (game._BALL._y - game._BALL._radius < 0)
					game._BALL._factorY = 1;

				// this makes the ball move
				game._BALL._x = game._BALL._x + (game._BALL._speed * game._BALL._factorX);
				game._BALL._y = game._BALL._y + (game._BALL._speed * game._BALL._factorY);

    			io.sockets.emit('move ball', game._BALL);
    		}, 1000/(GAME_FPS/2));

		}

	});

	socket.on('move confirmed', function(player) {
		// updating player position
		var _y = player.future_position;
		if (player1._sessionID == this.id)
			player1._y = _y;
		else
			if (player2._sessionID == this.id)
				player2._y = _y;

		socket.broadcast.emit('rival moves', _y);
		socket.emit('move confirmed', _y);
	});

	// socket.on('player loses', function (data) {
	// 	console.log('Jugador ' + data.nombre_jugador + ' pierde');
	// });
});

console.log('Corre que corre en http://localhost:8124');