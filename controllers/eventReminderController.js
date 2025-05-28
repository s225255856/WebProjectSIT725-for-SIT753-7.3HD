const eventReminderService = require('../services/eventReminderService');
const EventReminder = require('../models/eventReminder');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { io } = require('../sockets/eventReminderSocket');

const eventReminderController = {

    //get all events
    getEvents: async (req, res) => {
        try {
            const events = await eventReminderService.getEvents();
            console.log("Events:", events);
            res.status(200).json(events);
        } catch (error) {
            console.error("Error retrieving events:", error);
            res.status(500).json({ error: error.message });
        }
    },

    //create event
    createEvent: async (req, res) => {
        try {

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const eventData = {
            event_title: req.body.event_title,
            event_start_date: req.body.event_start_date,
            event_end_date: req.body.event_end_date,
            notif_time: req.body.notif_time,
            host: req.user.id, //auto assign logged-in user
            members: req.body.members?.filter(m => mongoose.isValidObjectId(m)).map(id => new mongoose.Types.ObjectId(id)) || [] 
        };
        const event = await eventReminderService.createEvent(eventData);
        res.status(201).json(event);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
    },

    //edit event
    editEvent: async (req, res) => {
        try {
            const { eventId, updates } = req.body;
            const updatedEvent = await eventReminderService.editEvent(eventId, updates);
            io.emit('eventUpdated', updatedEvent); //real time update
            res.status(200).json(updatedEvent);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    //bulk delete events
    deleteEvents: async (req, res) => {
        try {
        console.log("Received Request:", req.body); //debugging step

        const { eventIds } = req.body;
        if (!eventIds || eventIds.length === 0) {
            return res.status(400).json({ error: "No event IDs provided for deletion." });
        }

        const result = await eventReminderService.deleteEvents(eventIds);
        io.emit("eventsDeleted", eventIds);
        res.status(200).json(result);
        } catch (error) {
            console.error("Error deleting events:", error);
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
            subject: `Reminder: ${event.event_title}`,
            text: `You have an upcoming event: ${event.event_title} on ${event.event_start_date}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
            else console.log('Email sent: ' + info.response);
        })
    },
};




module.exports = eventReminderController;