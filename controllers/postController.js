const {postService} = require('../services');

const postController = {
    addPost: async (req, res) => {
        try {
          const { title, description, category } = req.body;
          const user_id = req.user.id;
      
          if (!title || !description || !category) {
            return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
          }
      
          const coverPic = req.files.find(file => file.fieldname === 'cover_pic');
          const mediaFile = req.files.find(file => file.fieldname === 'media');
      
          if (!coverPic) {
            return res.status(400).json({ success: false, message: 'Cover image is required.' });
          }
      
          const newPost = await postService.createPost({
            user_id,
            title,
            description,
            category,
            cover_pic: `/uploads/${coverPic.filename}`,
            media: mediaFile ? `/uploads/${mediaFile.filename}` : "none",
          });
      
          return res.status(201).json({ success: true, message: 'Post shared successfully!', post: newPost });
        } catch (error) {
          console.error('Add post error:', error);
          return res.status(500).json({ success: false, message: 'An error occurred while sharing the post.' });
        }
      }
}

module.exports = postController;
