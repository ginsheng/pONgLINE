pONgLINE
========

Just an exercise on nodejs/socket.io making an online pong game

First of all, you will need Node.js and Socket.io installed in order to run the server.

index.html consults at http://localhost:8124/socket.io/socket.io.js and (by now) shows a "jugar" button.

If you are the first on press it, the server will give you the honor to be player #1 and you will be notified
(via browser's console, again: just by now) and the server waits for a second player to connect and push "jugar" button.

The game starts at the moment the player 2 press "jugar" button. So, both of you need to be alert.

Besides index.html, my exrcise includes these files:

client.js <- includes a function called start_game() which sets the initial server calls and
             attends when the players loses or win.
             
server.js <- ummm... the server, not to much to comment in here. You should better open it and see the comments in there.

game.js <- 

racket <-
