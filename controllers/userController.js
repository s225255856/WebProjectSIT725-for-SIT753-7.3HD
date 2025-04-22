const { userService } = require('../services');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

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
                const token = jwt.sign(
                    { id: user._id, name: user.name, email: user.email },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Set this to true if using HTTPS
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'lax',
                });

                return res.json({ message: 'Login successful' });
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
    },
    logout: (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });
        res.redirect('/login');
    }
};

module.exports = userController;
