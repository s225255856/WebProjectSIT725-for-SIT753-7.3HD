const userSocketMap = new Map(); // userId => Set of socketIds

module.exports = (io, socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    if (!userSocketMap.has(userId)) {
      userSocketMap.set(userId, new Set());
    }
    userSocketMap.get(userId).add(socket.id);
    console.log(`User ${userId} connected on socket ${socket.id}`);
  }

  socket.on('disconnect', () => {
    if (userId && userSocketMap.has(userId)) {
      userSocketMap.get(userId).delete(socket.id);
      if (userSocketMap.get(userId).size === 0) {
        userSocketMap.delete(userId);
      }
      console.log(`User ${userId} disconnected from socket ${socket.id}`);
    }
  });
};

//send notif to the post creator
module.exports.emitToUser = (io, userId, event, data) => {
  const socketIds = userSocketMap.get(userId);
  if (socketIds) {
    socketIds.forEach(socketId => {
      io.to(socketId).emit(event, data);
    });
  }
};