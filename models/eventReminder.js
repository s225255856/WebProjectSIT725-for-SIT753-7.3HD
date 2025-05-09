const mongoose = require('mongoose');

const eventReminderSchema = new mongoose.Schema(
    {
        
        title: {
            type: String,
            required: true,
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }],
        password: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const EventReminder = mongoose.model('EventReminder', eventReminderSchema);
module.exports = EventReminder;
