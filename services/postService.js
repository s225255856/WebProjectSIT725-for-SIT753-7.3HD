const { Post } = require('../models');

const postService = {
    createPost: async (data) => {
        const post = new Post(data);
        return await post.save();
      }
};

module.exports = postService;
