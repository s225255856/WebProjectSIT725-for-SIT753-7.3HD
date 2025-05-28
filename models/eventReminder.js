const mongoose = require('mongoose');

const eventReminderSchema = new mongoose.Schema(
    {
        event_title: {
            type: String,
            required: true,
        },
        event_start_date: {
            type: Date,
            required: true,
        },
        event_end_date: {
            type: Date,
            required: true,
        },
        notif_time: { //when to send notif
            type: Date,
            required: true,
        },
        host: { //the logged in person
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        members: [{ //tagged members (not logged in person)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        }],
    },
    { timestamps: true }
);

const EventReminder = mongoose.model('EventReminder', eventReminderSchema);
module.exports = EventReminder;
