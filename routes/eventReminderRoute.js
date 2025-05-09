const express = require('express');
const router = express.Router();
const { eventReminderController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, eventReminderController.getAllEvents);


router.post('/', authMiddleware, eventReminderController.createEvents);


router.get('/:id', authMiddleware, eventReminderController.getEventsById);


router.put('/:id', authMiddleware, eventReminderController.updateEvents);


router.delete('/:id', authMiddleware, eventReminderController.deleteEvents);

module.exports = router;
