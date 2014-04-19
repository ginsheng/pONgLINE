GAME_WIDTH = 700;
GAME_HEIGHT = 450;
GAME_FPS = 30;
GAME_SPACE = '';

function init() {

	var table = document.createElement('canvas');
	table.id = 'table';
	table.width = GAME_WIDTH;
	table.height = GAME_HEIGHT;
	table.style.border = 'black 1px solid';

	document.body.appendChild(table);

    GAME_SPACE = document.getElementById("table");

    init_ball();
    init_players();

    game = setInterval(function() {
    	update();
    	draw(GAME_SPACE.getContext("2d"));
    }, 1000/GAME_FPS);

    // var ctx = c.getContext("2d");
    // ctx.fillStyle = "#FF3300";
    // ctx.fillRect(0,0,150,75);
}

function init_players() {
	player = new Racket('player1');

    player._color = 'blue';

    player._height = GAME_HEIGHT / 4;

    player._x = ball._radius * 3;
    //player2._x = GAME_WIDTH - player2._width;

    player._y = (GAME_HEIGHT / 2) - (player._height / 2);
}

function init_ball() {
	ball = {
		_color: 'black',
		_x: 0,
		_y: 15,
		_radius: 15,
		_speed: 7,
		_factorX: 1,
		_factorY: 1,
		draw: function(c) {
			c.fillStyle = this._color;
			c.beginPath();

			if (this._x + this._radius > GAME_WIDTH)
			// if (this._x + this._radius > player2._x - player2._width && this._x < player2._x)
				this._factorX = -1;

			if (this._x - this._radius < player._x + player._width && this._x > player._x)
				if (this._y >= player._y && this._y <= player._y + player._height)
					this._factorX = 1;

			if (this._y + this._radius > GAME_HEIGHT)
				this._factorY = -1;
			if (this._y - this._radius < 0)
				this._factorY = 1;

			this._x = this._x + (this._speed * this._factorX);
			this._y = this._y + (this._speed * this._factorY);

			c.arc(this._x, this._y, this._radius, 0, 2*Math.PI);
			c.fill();
			c.stroke();

			if (this._x == 0) {
				clearInterval(game);
				socket.emit('player loses', { nombre_jugador: player._playerName })
				alert('GAME OVER');
			}
		}
	}
}

function update() {
	document.onkeydown = function(e) {
		if (e.keyCode == 38 || e.keyCode == 40) {
			socket.emit('my player moves', { direction: e.keyCode });
			socket.on('server update', function(data){
				if (data.canMove = 'yes')
					player.move(e.keyCode);
			});
		}
	}
}

function draw(c) {
	c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	player.draw(c);
	ball.draw(c);
}