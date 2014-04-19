GAME_FPS = 30;
function start() {
 	socket = io.connect('http://localhost:8124');
 	socket.on('game started', function (data) {
		// console.log(data);
		if (data.canStart == 'yes')
			init();
	});

	game = setInterval(function() {
    	update();
    }, 1000/GAME_FPS);

}