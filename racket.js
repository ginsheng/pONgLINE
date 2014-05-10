function Racket(player) {
	this._playerName = player._name;
	this._player = player._number;
	this._color = player._color;
	this._height = player._height;
	this._width = player._width;
	this._speed = player._speed;
	this._x = player._number == 1 ?
    			ball._settings._radius * 3 :
    			GAME_SETTINGS._width - (ball._settings._radius * 3);
	this._y = player._y;
}

Racket.prototype.draw = function(c) {
	c.fillStyle = this._color;
	c.beginPath();
	c.fillRect(this._x, this._y, this._width, this._height);
}

Racket.prototype.move = function(keyControl) {
	var i = this;
	var hipotetical_y = i._y;
	if (keyControl == 38) // up
		if (this._y - this._speed > 0)
			// this._y -= this._speed;
			hipotetical_y -= this._speed;
		else
			this._y = 0;
	if (keyControl == 40)
		if (this._y + this._speed < GAME_SETTINGS._height - this._height)
			hipotetical_y += this._speed;
		else
			hipotetical_y = GAME_SETTINGS._height - this._height;
	SOCKET.emit('move confirmed', {number: this._player, future_position: hipotetical_y, direction: keyControl});

	SOCKET.on('move confirmed', function(new_position) {
		i._y = new_position;
	});
}