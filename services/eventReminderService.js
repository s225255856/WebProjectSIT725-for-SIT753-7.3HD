const { EventReminder } = require('../models');

const eventReminderService = {
    createEvent: async (eventData) => {
        try {
            const event = new EventReminder(eventData);
            const savedEvent = await event.save();
            return { 
                id: savedEvent._id, // Ensure ID is returned
                event_title: savedEvent.event_title,
                event_start_date: savedEvent.event_start_date,
                event_end_date: savedEvent.event_end_date,
                notif_time: savedEvent.notif_time,
                host: savedEvent.host,
                members: savedEvent.members
            };
        }catch (error) {
            throw new Error(`Error creating event: ${error.message}`);
        }
    },

    getEvents: async () => {
        try {
            const events = await EventReminder.find();
            if (!events || events.length === 0) {
                throw new Error("No events found");
            }
            return events.map(event => ({
                id: event._id,
                title: event.event_title,
                start: event.event_start_date,
                end: event.event_end_date
            }));
        } catch (error) {
            throw new Error(error.message);
        }
    },

    editEvent: async (req, res) => {
        try {
            const updatedEvent = await EventReminder.findByIdAndUpdate(eventId, updates, { new: true });
            if (!updatedEvent) throw new Error('Event not found.');
            return updatedEvent;
        } catch (error) {
            throw new Error(`Error editing event: ${error.message}`);
        }
    },

    deleteEvents: async (id) => {
        try {
            const result = await EventReminder.deleteMany({ _id: { $in: eventIds } });
            if (result.deletedCount === 0) {
                throw new Error("No events were deleted. Ensure valid IDs are provided.");
            }
            return { message: "Events deleted successfully", deletedCount: result.deletedCount };
        } catch (error) {
            throw new Error(`Error deleting events: ${error.message}`);
        }
    }
};

module.exports = eventReminderService;


