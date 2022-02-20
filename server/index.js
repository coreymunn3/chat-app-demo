const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

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

  socket.on('join', (args, callback) => {
    console.log(args);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

app.use('/', require('./router'));

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
