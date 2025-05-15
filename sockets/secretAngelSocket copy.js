const SecretAngelGame = require('../models/secretAngel');
const User = require('../models/user');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('✅ User connected:', socket.id);

        socket.on('joinRoom', async ({ roomId, userId }) => {
            if (!roomId || !userId) {
                socket.emit('errorMessage', 'Room ID and User ID are required to join.');
                return;
            }

            try {
                const game = await SecretAngelGame.findOne({ roomId }).populate('members.user', 'name');
                if (!game) {
                    socket.emit('errorMessage', 'Game room not found.');
                    return;
                }

                const user = await User.findById(userId);
                if (!user) {
                    socket.emit('errorMessage', 'User not found.');
                    return;
                }

                const isMember = game.members.some(
                    member => member.user._id.toString() === userId.toString()
                );
                if (!isMember) {
                    socket.emit('errorMessage', 'You are not a member of this room.');
                    return;
                }

                socket.join(roomId);
                console.log(`👤 User ${user.name} (${userId}) joined room ${roomId}`);

                // Create and save the system message
                const systemMessage = {
                    isSystem: true,
                    message: `${user.name} has joined the chat.`,
                    createdAt: new Date()
                };

                game.chat.push(systemMessage);
                await game.save();

                // Emit system message to the room
                io.to(roomId).emit('newMessage', {
                    sender: systemMessage.sender,
                    isSystem: systemMessage.isSystem,
                    message: systemMessage.message,
                    timestamp: systemMessage.createdAt
                });

            } catch (err) {
                console.error('❌ Error in joinRoom:', err.message);
                socket.emit('errorMessage', 'An error occurred while joining the room.');
            }
        });


        socket.on('sendMessage', async ({ roomId, userId, userName, message }) => {
            if (!roomId || !userId || !message?.trim()) {
                socket.emit('errorMessage', 'Invalid message payload.');
                return;
            }

            try {
                const game = await SecretAngelGame.findOne({ roomId });
                if (!game) {
                    socket.emit('errorMessage', 'Game room not found.');
                    return;
                }

                const isMember = game.members.some(
                    member => member.user.toString() === userId.toString()
                );
                if (!isMember) {
                    socket.emit('errorMessage', 'You are not a member of this room.');
                    return;
                }

                // Create and save the message
                const chatMessage = {
                    sender: userId,
                    message: message.trim(),
                    createdAt: new Date()
                };

                game.chat.push(chatMessage);
                await game.save();

                // Emit to all in room including sender
                io.to(roomId).emit('newMessage', {
                    senderId: userId,
                    senderName: userName, // Use the provided userName
                    message: chatMessage.message,
                    timestamp: chatMessage.createdAt // Match frontend expectation
                });

                console.log(`💬 Message from ${userName} (${userId}) in room ${roomId}: ${message}`);
            } catch (err) {
                console.error('❌ Error handling sendMessage:', err.message);
                socket.emit('errorMessage', 'An error occurred while sending your message.');
            }
        });

        socket.on('disconnect', () => {
            console.log('❎ User disconnected:', socket.id);
        });
    });
};


