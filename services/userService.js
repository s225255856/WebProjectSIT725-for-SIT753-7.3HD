const { User } = require('../models');

const userService = {
    getAllUsers: async () => {
        try {
            return await User.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }
};


module.exports = userService

