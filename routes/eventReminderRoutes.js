const express = require('express');
const router = express.Router();
const { eventReminderController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, eventReminderController.getEvents);
router.post('/create', authMiddleware, eventReminderController.createEvent);
router.post('/edit', authMiddleware, eventReminderController.editEvent);
router.delete('/bulk-delete', authMiddleware, eventReminderController.deleteEvents);

module.exports = router;
