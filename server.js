const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 8080;
let users = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('new connection made');

  // Join private room
  socket.on('join-private', (data) => {
    socket.join('private');
    console.log(`${data.nickname} joined private`);
  });

  socket.on('private-chat', (data) => {
    socket.broadcast.to('private').emit('show-message', data.message);
  });

  // Show all users when first logged on
  socket.on('get-users', (data) => {
    console.log(data);
    socket.emit('all-users', users);
  });

  // When new socket joins
  socket.on('join', (data) => {
    socket.nickname = data.nickname;
    users[socket.nickname] = socket;
    const userObj = {
      nickname: data.nickname,
      socketid: socket.id,
    };
    users.push(userObj);
    io.emit('all-users', users);
  });

  // Send a message
  socket.on('send-message', (data) => {
    // socket.broadcast.emit('message-received', data);
    io.emit('message-received', data);
  });

  // Send a 'like' to the user of your choice
  socket.on('send-like', (data) => {
    console.log(data);
    console.log(data.like);
    console.log(data.from);
    socket.broadcast.to(data.like).emit('user-liked', data);
  });

  socket.on('disconnect', () => {
    users = users.filter(item => item.nickname !== socket.nickname);
    io.emit('all-users', users);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
