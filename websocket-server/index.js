const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);
mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Integrate Socket.io with the HTTP server
const io = socketIo(server);

const searchRoutes = require('./search');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
// Define a port
const PORT = process.env.PORT || 3000;

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

   // Handle room creation
   socket.on('createRoom', (room) => {
    socket.join(room);
    console.log(`Room created: ${room}`);
  });

  // Handle joining a room
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Handle incoming messages
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
    io.emit('message', msg);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.use('/api/auth', searchRoutes);
server.use('/api', authRoutes);
server.use('/api', chatRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
