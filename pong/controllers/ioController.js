// fichier /controllers/ioController.js
let idFirstPlayer;
let idSecondPlayer;
let nbPlayer = 0; 

class IoController {        
  constructor() {  }
  registerSocket(socket, io) {
    socket.on('startGame', this.connectionHandler(socket, io));
    socket.on('disconnect', this.disconnectionHandler(socket));
    socket.on('paddleLeftUp', this.paddleLetUp(socket));
    socket.on('paddleLeftDown', this.paddleLeftDown(socket));
    socket.on('paddleLeftStop', this.paddleLeftstop(socket));
    socket.on('!isPlaying', this.notIsPlaying(io));
    socket.on('newBall', this.newBall(socket));
    socket.on('synchroBall', this.synchroBall(socket));
  }
  
  /*
  * Gestion de la connection des joueurs 
  */    
  connectionHandler(socket, io) {
    return () => {
      if (nbPlayer == 0) {
        idFirstPlayer = socket.id;
        socket.emit('firstPlayerConnected');
        console.log("First Player connected with id : " + idFirstPlayer);
        console.log("nbPlayer : " + (nbPlayer + 1));
        nbPlayer = nbPlayer + 1;
      }
      else if (nbPlayer == 1) {
        idSecondPlayer = socket.id;
        socket.emit('secondPlayerConnected');
        io.to(idFirstPlayer).emit('youCanStart');
        console.log("Second Player connected with id : " + idSecondPlayer);
        console.log("nbPlayer : " + (nbPlayer + 1));
        console.log("Game can Start ! ");
        nbPlayer = nbPlayer + 1;
      }
      else {
        socket.disconnect(true);
        console.log("Too much Player ! " + socket.id + " disconnected from the server.");
      }
    };
  }

  /*
  * Gestion de la deconnection des joueurs 
  */
  disconnectionHandler(socket) {
    return () => {
      if (socket.id == idFirstPlayer) {
        console.log("First player just disconnected !");
        if (idSecondPlayer) {
          idFirstPlayer = idSecondPlayer;
          console.log("Second player is now first player !");
          nbPlayer = nbPlayer - 1;
        }
      }
      else if (socket.id == idSecondPlayer) {
        console.log("Second player just disconnected !");
        nbPlayer = nbPlayer - 1;
      }
      console.log("nbPlayer : " + (nbPlayer + 1));
    };
  }

  paddleLetUp(socket) {
    return () => {
      socket.broadcast.emit('paddleRightUp');
    };
  }

  paddleLeftDown(socket) {
    return () => {
      socket.broadcast.emit('paddleRightDown');
    };
  }

  paddleLeftstop(socket) {
    return (currentY) => {
      socket.broadcast.emit('paddleRightStop', currentY);
    };
  }

  /*
  * Gestion des but 
  */
  notIsPlaying(io) {
    return () => {
      io.to(idFirstPlayer).emit('youCanStart');
    };
  }

  /*
  * Gestion de la synchroniastion de la balle
  */
  newBall(socket) {
    return (x, y, speedX, speedY) => {
      socket.broadcast.emit('newBallWasSend', x, y, speedX, speedY);
    };
  }

  /*
  * Gestion de la synchroniastion de la balle
  */
  synchroBall(socket) {
    return (x, y, speedX, speedY) => {
      socket.to(idSecondPlayer).emit('synchroBallWasSend', x, y, speedX, speedY);
    };
  }
 }
 module.exports = new IoController();