const {postService} = require('../services');

const postController = {
    addPost: async (req, res) => {
        try {
          const { title, description, category, notifcheckbox } = req.body;
          const user_id = req.user.id;
      
          if (!title || !description || !category) {
            return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
          }
      
          const coverPic = req.files.find(file => file.fieldname === 'cover_pic');
          const mediaFile = req.files.find(file => file.fieldname === 'media');
      
          if (!coverPic) {
            return res.status(400).json({ success: false, message: 'Cover image is required.' });
          }
      
          const getLikesNotif = notifcheckbox === 'on' || notifcheckbox === true;

          const newPost = await postService.createPost({
            user_id,
            title,
            description,
            category,
            cover_pic: `/uploads/${coverPic.filename}`,
            media: mediaFile ? `/uploads/${mediaFile.filename}` : "none",
            get_likes_notif: getLikesNotif
          });
      
          return res.status(201).json({ success: true, message: 'Post shared successfully!', post: newPost });
        } catch (error) {
          console.error('Add post error:', error);
          return res.status(500).json({ success: false, message: 'An error occurred while sharing the post.' });
        }
      },
      getCommunityMainPage: async (req, res) => {
      try{
        const categoryNames = ['Wrapping Ideas', 'DIY Gifts', 'Eco-friendly Gifts', 'Seasonal Gifts'];

        //Get 5 first posts from mongoDB per category 
        const postsByCategory = {};

        for (const cat of categoryNames) {
          postsByCategory[cat] = await postService.getPostsByCat(cat);
        }

        res.render('communityMainPage', {
          error: null,
          user: req.user,
          categories: categoryNames,
          postsByCategory
        });

      }catch (err) {
        console.error(err);
        res.render('communityMainPage', {
          error: 'Failed to fetch posts',
          user: req.user,
          categories: [],
          postsByCategory: {}
        });
      }

    }
}

module.exports = postController;
