function connect_to_game() {
	SOCKET = io.connect('http://localhost:8124');

// 	SOCKET.on('connect', function() {
// console.debug('Mi id de sesión es: ' + SOCKET.socket.sessionid);
// 	});

}


function start_game() {

	SOCKET.emit('game connect', {session_id: SOCKET.socket.sessionid});

	SOCKET.on('game connected', function(gameAndPlayerSet){
		GAME_SETTINGS = gameAndPlayerSet.game_settings;
		PLAYER_SETTINGS = gameAndPlayerSet.player_settings;

		if (GAME_SETTINGS != undefined && PLAYER_SETTINGS != undefined) {
	 		console.debug('Eres el jugador ' + PLAYER_SETTINGS._number);
	 		if (PLAYER_SETTINGS._number == 1)
	 			console.log('En espera de un rival... ');
	 		else
	 			console.log('En espera de que el jugador 1 inicie... ');
	 		init_game();
	 	} else
	 		console.debug('Lo sentimos, ya no hay cupo en la cancha :(');
 	});

 	SOCKET.on('rival arrived', function(rival) {
 		// console.log('Lleg&oacute; tu rival! ' + rival);
 		RIVAL_SETTINGS = rival;
 		init_player(rival);
 	});

	set_keyListener();

}