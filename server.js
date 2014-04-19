var io = require('socket.io').listen(8124);

io.sockets.on('connection', function (socket) {
  socket.emit('game started', { canStart: 'yes' });
  socket.on('my player moves', function (data) {
    console.log(data);
    socket.emit('server update', { canMove: 'yes' });
  });
  socket.on('player loses', function (data) {
  	console.log('Jugador ' + data.nombre_jugador + ' pierde');
  });
});

console.log('Corre que corre en http://localhost:8124');