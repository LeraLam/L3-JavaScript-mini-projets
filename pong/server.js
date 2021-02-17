var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function(socket){
  console.log(`connection done by ${socket.id}`);
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});