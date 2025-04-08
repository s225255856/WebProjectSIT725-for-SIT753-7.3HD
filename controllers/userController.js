const { userService } = require('../services');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.json({ data: users });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.login({ email, password });
            if (user) {
                res.json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newUser = await userService.signup({ name, email, password });
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    forgetPassword: async (req, res) => {
        try {
            const { email } = req.body;
            await userService.sendResetLink(email);
            res.json({ message: 'Reset link sent to your email' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    changePassword: async (req, res) => {
        try {
            const { userId, newPassword } = req.body;
            const updatedUser = await userService.changePassword(userId, newPassword);
            res.json({ message: 'Password changed successfully', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = userController;
