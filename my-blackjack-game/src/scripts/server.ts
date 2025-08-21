import http from "http";
import express from "express";
import { Server } from "Socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const gameRooms = new Map();

console.log('🚀 Starting Blackjack server...');


io.on('connection', (socket) => {
  console.log('✅ Player connected:', socket.id);

  socket.on('join-room', (data) => {
    const { roomId, playerName } = data;
    console.log(`🎮 "${playerName}" joining room "${roomId}"`);
    
    // Join the socket room
    socket.join(roomId);
    
    // Store player info (simplified for testing)
    if (!gameRooms.has(roomId)) {
      gameRooms.set(roomId, { players: [] });
    }
    
    const room = gameRooms.get(roomId);
    room.players.push({ id: socket.id, name: playerName });
    
    // Confirm join
    socket.emit('join-success', { 
      roomId, 
      playerId: socket.id 
    });
    
    // Broadcast to room
    io.to(roomId).emit('player-joined', {
      playerId: socket.id,
      playerName,
      totalPlayers: room.players.length,
      message: `${playerName} joined the game!`
    });
  });

  socket.on('start-game', (roomId) => {
    console.log(`🎯 Starting game in room "${roomId}"`);
    io.to(roomId).emit('game-started', { 
      message: 'Game started!',
      gameState: 'playing',
      roomId 
    });
  });

  socket.on('player-action', (data) => {
    const { roomId, action } = data;
    console.log(`🎲 Player ${socket.id} used "${action}" in room "${roomId}"`);
    
    io.to(roomId).emit('action-result', {
      playerId: socket.id,
      action,
      message: `Player used ${action}!`,
      timestamp: new Date().toLocaleTimeString()
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Player disconnected:', socket.id);
    
    // Remove player from all rooms
    gameRooms.forEach((room, roomId) => {
      room.players = room.players.filter(p => p.id !== socket.id);
      if (room.players.length === 0) {
        gameRooms.delete(roomId);
        console.log(`🗑️ Deleted empty room: ${roomId}`);
      }
    });
  });
});

server.listen(3001, () => {
  console.log('🚀 Blackjack server running on http://localhost:3001');
  console.log('📝 Waiting for players...');
  console.log('🎮 Open http://localhost:5173 in your browser');
});