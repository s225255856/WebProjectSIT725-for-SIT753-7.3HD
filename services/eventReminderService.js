const { EventReminder } = require('../models');
const mongoose = require("mongoose");

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

    getEvents: async (start, end) => {
        try {
            console.log("Fetching events between:", start, "and", end);

            //Convert FullCalendar's date (with timezone) to UTC
            const startUTC = new Date(start).toISOString();
            const endUTC = new Date(end).toISOString();

            console.log("Converted Dates for Query:", startUTC, endUTC);

            const events = await EventReminder.find({
                event_start_date: { $gte: startUTC },
                event_end_date: { $lte: endUTC }
            });

            console.log("Retrieved Events:", events);
            return events;
        } catch (error) {
            console.error("Error retrieving events:", error);
            throw new Error(`Error retrieving events: ${error.message}`);
        }
},

    editEvent: async (eventId, eventData) => {
        try {
            console.log("Attempting to update event:", eventId, eventData);

            //ensure members is an array, filter out empty values
            if (eventData.members) {
                eventData.members = eventData.members.filter(member => member.trim() !== ""); // Remove empty entries

                // If `members` are stored as ObjectIds in MongoDB, convert them properly
                eventData.members = eventData.members.map(member => {
                    return mongoose.Types.ObjectId.isValid(member) ? new mongoose.Types.ObjectId(member) : member;
                });
            }

            const result = await EventReminder.findByIdAndUpdate(
                eventId,
                { 
                    event_title: eventData.event_title,
                    event_start_date: eventData.event_start_date,
                    event_end_date: eventData.event_end_date,
                    notif_time: eventData.notif_time,
                    members: eventData.members
                },
                { new: true }
            );

            if (!result) throw new Error("Event not found.");
            return result;
        } catch (error) {
            console.error("Error updating event:", error);
            throw new Error(`Error updating event: ${error.message}`);
        }
    },


    deleteEvents: async (eventIds) => {
        try {
            console.log("Attempting to delete events:", eventIds);

            const result = await EventReminder.deleteMany({ _id: { $in: eventIds } });
            console.log("MongoDB Deletion Result:", result);

            if (result.deletedCount === 0) {
                throw new Error("No events were deleted. Ensure valid IDs are provided.");
            }
            return result;
        } catch (error) {
            console.error("Error deleting events:", error);
            throw new Error(`Error deleting events: ${error.message}`);
        }
    }
};

module.exports = eventReminderService;


