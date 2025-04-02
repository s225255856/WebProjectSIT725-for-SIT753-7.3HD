const { userService } = require('../services');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.json({ data: users });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = userController;
