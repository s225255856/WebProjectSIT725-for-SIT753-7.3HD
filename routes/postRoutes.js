const express = require('express');
const router = express.Router();
const { postController, quizController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); 



router.post('/addpost', authMiddleware, upload.any(), postController.addPost);
router.get('/loadMorePosts', authMiddleware, postController.loadMorePosts)
router.post('/like/:postId', authMiddleware, postController.toggleLike);

router.post('/quizSubmit', quizController.submitQuizAndRedirect); 



module.exports = router;

