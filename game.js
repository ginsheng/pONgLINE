// GAME_WIDTH = 700;
// GAME_HEIGHT = 450;
// GAME_FPS = 30;
GAME_SPACE = '';

function init_game() {

	document.getElementById('start_buton').style.display = 'none';

	GAME_FPS = GAME_SETTINGS._fps;
	rackets = [];

	var table = document.createElement('canvas');
	table.id = 'table';
	table.width = GAME_SETTINGS._width;
	table.height = GAME_SETTINGS._height;
	table.style.border = 'black 1px solid';

	document.body.appendChild(table);

    GAME_SPACE = document.getElementById("table");

    init_ball(GAME_SETTINGS._BALL);

    init_player(PLAYER_SETTINGS);

    game = setInterval(function() {
    	draw(GAME_SPACE.getContext("2d"));
    }, 1000/GAME_FPS);

    // This event tiggers when my opponent make a move
	SOCKET.on('rival moves', function(position) {
		// console.debug('Tu rival movi&oacute;: ' + position);
		rackets[1]._y = position;
	});

	// Thie event triggers when server order to move the ball
	SOCKET.on('move ball', function(_ball) {
		ball._settings = _ball;
	});

}

function init_player(settings) {

	var racket = new Racket(settings);

    rackets.push(racket);

}

function init_ball(_ball) {
	console.debug('This are my initial ball settings: ' + _ball.toString());
	ball = {
		_settings: _ball,
		draw: function(c) {
			c.fillStyle = this._settings._color;
			c.beginPath();
	
			c.arc(this._settings._x, this._settings._y, this._settings._radius, 0, 2*Math.PI);
			c.fill();
			c.stroke();
		},
	}
}
	
function set_keyListener() {
	document.onkeydown = function(e) {
		if (e.keyCode == 38 || e.keyCode == 40) {
			rackets[0].move(e.keyCode);
		}
	}
}
	
function draw(c) {
	c.clearRect(0, 0, GAME_SETTINGS._width, GAME_SETTINGS._height);
	for (var racket in rackets)
		rackets[racket].draw(c);
	ball.draw(c);
}