const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/quizAdminController');
const QuizSubmission = require('../models/quizSubmission');



router.get('/quizAdminLogin', adminCtrl.renderLogin);
router.post('/quizAdminLogin', adminCtrl.handleLogin);
router.get('/quizAdminDashboard', adminCtrl.renderDashboard);
router.get('/quizAdminLogout', adminCtrl.logout);

router.post('/delete/:id', async (req, res) => {
  await QuizSubmission.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.redirect('/quizAdminDashboard');
});

router.post('/restore/:id', async (req, res) => {
  await QuizSubmission.findByIdAndUpdate(req.params.id, { isDeleted: false });
  res.redirect('/quizAdminDashboard');
});


module.exports = router;
