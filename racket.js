function Racket(playerName) {
	this._playerName = playerName;
	this._player = 0;
	this._color = '#000';
	this._x = 0;
	this._y = 0;
	this._height = 0;
	this._width = 5;
	this._speed = 12;
}

Racket.prototype.draw = function(c) {
	c.fillStyle = this._color;
	c.beginPath();
	c.fillRect(this._x, this._y, this._width, this._height);
}

Racket.prototype.move = function(keyControl) {
	if (keyControl == 38) // up
		if (this._y - this._speed > 0)
			this._y -= this._speed;
		else
			this._y = 0;
	if (keyControl == 40)
		if (this._y + this._speed < GAME_HEIGHT - this._height)
			this._y += this._speed;
		else
			this._y = GAME_HEIGHT - this._height;
}