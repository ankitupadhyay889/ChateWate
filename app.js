var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

const port = 80;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ankit.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`y chla humara server port ${port}`);
});