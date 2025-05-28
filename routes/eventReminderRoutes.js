const express = require('express');
const router = express.Router();
const { eventReminderController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, eventReminderController.getEvents);
router.get('/create', authMiddleware, eventReminderController.createEvent);
router.get('/edit', authMiddleware, eventReminderController.editEvent);
router.get('/bulk-delete', authMiddleware, eventReminderController.deleteEvents);

module.exports = router;
