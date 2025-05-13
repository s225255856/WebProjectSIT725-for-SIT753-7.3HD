const mongoose = require('mongoose');

const secretAngelGameSchema = new mongoose.Schema(
    {
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }],
        roomId: {
            type: Number,
            default: 1,
        },
        budget: {
            type: Number,
            required: false,
        },
        assignment: {
            type: String,
            required: false,
        },
        wishlist: {
            type: [String],
            required: false,
        },
        link: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
        },
        color: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const SecretAngelGame = mongoose.model('SecretAngelGame', secretAngelGameSchema);
module.exports = SecretAngelGame;
