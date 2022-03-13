const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUserInRoom } = require('./users');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('we have a connection');

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);
    const { user, error } = addUser({
      id: socket.id,
      name,
      room,
    });
    if (error) return callback(error);

    socket.emit('message', {
      user: { name: 'admin' },
      text: `Welcome, ${user.name} - room ${user.room}`,
      time: new Date(),
    });
    socket.broadcast.to(user.room).emit('message', {
      user: { name: 'admin' },
      text: `${user.name} has joined`,
      time: new Date(),
    });

    const usersInRoom = getUserInRoom(user.room);
    socket.emit('roomData', {
      room: user.room,
      users: usersInRoom,
    });

    socket.join(user.room);
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {
      user: user,
      text: message,
      time: new Date(),
    });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      console.log(`user ${user.name} disconnected from ${user.room}`);
      io.to(user.room).emit('message', {
        user: { name: 'admin' },
        text: `${user.name} has left the room`,
        time: new Date(),
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUserInRoom(user.room),
      });
    }
  });
});

app.use('/', require('./router'));

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
