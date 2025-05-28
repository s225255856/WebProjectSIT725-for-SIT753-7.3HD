const eventReminderService = require("../services/eventReminderService");

const userSocketMap = new Map();

module.exports = (io, socket) => {

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('eventCreated', (event) => {
            console.log(`Sending email notification for event: ${event.event_title}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
    // socket.on('createEvent', async () => {
    //     try {
    //         const events = await eventReminderService.getAllEvents();
    //         io.emit('Event Created', events);
    //     } catch (err) {
    //         socket.emit('errorMessage', err.message);
    //     }
    // });

    // socket.on("deleteEvent", async ({ event_id }) => {
    //     try {
    //         const event = await eventReminderService.deleteEvent(event_id);
    //         io.to(`event-${event.event_id}`).emit("Event Deleted", event._id);
    //     } catch (err) {
    //         socket.emit("errorMessage", err.message);
    //     }
    // });

};


module.exports.userSocketMap = userSocketMap;
