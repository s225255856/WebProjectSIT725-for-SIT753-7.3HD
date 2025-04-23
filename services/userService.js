const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const userService = {
    getAllUsers: async () => {
        try {
            return await User.find();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return null;

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return null;

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    signup: async ({ name, email, password }) => {
        try {
            if (!name || !email || !password) {
                throw new Error('All fields are required');
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            return await newUser.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    sendResetLink: async (email) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '1h'
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-password'
                }
            });

            const resetLink = `http://yourfrontend.com/reset-password/${resetToken}`;

            await transporter.sendMail({
                from: '"Your App" <your-email@gmail.com>',
                to: user.email,
                subject: 'Password Reset',
                text: `Click here to reset your password: ${resetLink}`
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateSettings: async (userId, { name, password, avatar }) => {
        const updates = {};


        if (name && name.trim() !== '') {
            updates.name = name.trim();
        }


        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }


        if (avatar !== undefined) {
            updates.avatar = avatar;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        return updatedUser;
    },


};

module.exports = userService;
