const QuizSubmission = require('../models/quizSubmission');

// Render login page
exports.renderLogin = (req, res) => {
  res.render('quizAdminLogin', { error: null });
};

// Handle login without session
exports.handleLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.redirect('/quizAdminDashboard');
  } else {
    res.render('quizAdminLogin', { error: 'Invalid credentials' });
  }
};

// Render dashboard directly
exports.renderDashboard = async (req, res) => {
  //  Only fetch entries not deleted
  const allSubmissions = await QuizSubmission.find({
    $or: [
      { isDeleted: false },
      { isDeleted: { $exists: false } }
    ]
  }).lean();

  //  Also fetch soft-deleted entries for trash view
  const deletedSubmissions = await QuizSubmission.find({ isDeleted: true }).lean();

  //  Unique entries
  const seen = new Set();
  const uniqueSubmissions = [];

  for (let sub of allSubmissions) {
    const key = `${sub.username}-${sub.recipient}-${sub.age}-${sub.budget}-${sub.occasion}-${sub.personality}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueSubmissions.push(sub);
    }
  }

  //  Illogical filters
  const illogicalSubmissions = allSubmissions.filter(sub =>
    (sub.recipient === 'partner' && sub.age === 'under12') ||
    (sub.recipient === 'friend' && sub.age === 'under12' && sub.occasion === 'graduation')
  );

  //  Find duplicated submissions
const activeSubmissions = allSubmissions.filter(sub =>
  !sub.isDeleted && sub.isDeleted !== true
);

const keyCount = {};
activeSubmissions.forEach(sub => {
  const key = `${sub.username}-${sub.recipient}-${sub.age}-${sub.budget}-${sub.occasion}-${sub.personality}`;
  keyCount[key] = (keyCount[key] || 0) + 1;
});

const duplicatedSubmissions = activeSubmissions.filter(sub => {
  const key = `${sub.username}-${sub.recipient}-${sub.age}-${sub.budget}-${sub.occasion}-${sub.personality}`;
  return keyCount[key] > 1;
});

  

  res.render('quizAdminDashboard', {
    allSubmissions,
    uniqueSubmissions,
    illogicalSubmissions,
    deletedSubmissions,
    duplicatedSubmissions
  });
};

// Logout 
exports.logout = (req, res) => {
  res.redirect('/quizAdminLogin');
};
