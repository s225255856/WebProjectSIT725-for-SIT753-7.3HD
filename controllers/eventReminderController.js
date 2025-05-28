const eventReminderService = require('../services/eventReminderService');
const eventRemminder = require('../models/eventReminder');
const nodemailer = require('nodemailer');
const { io } = require('../sockets/eventReminderSocket');

const eventReminderController = {

    //get all events
    getEvents: async (req, res) => {
        try {
            const events = await Event.find();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //create event
    createEvent: async (req, res) => {
        try {
            const event = await Event.create(req.body);
            res.status(201).json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //edit event
    editEvent: async (req, res) => {
        try {
            const { eventId, updates } = req.body;
            const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });
            io.emit('eventUpdated', updatedEvent); //real time update
            res.status(200).json(updatedEvent);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    //bulk delete events
    deleteEvents: async (req, res) => {
        try {
            await Event.deleteMany({ _id: { $in: req.body.eventIds } });
            io.emit('eventsDeleted', req.body.eventIds); //real time update
            res.status(200).json({ message: 'Events deleted!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //send email notification
    notifyUsers: async (event) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: event.members.join(','),
            subject: `Reminder: ${event.title}`,
            text: `You have an upcoming event: ${event.title} on ${event.startDate}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
            else console.log('Email sent: ' + info.response);
        })
    },
};




module.exports = eventReminderController;