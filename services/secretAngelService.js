const { SecretAngelGame } = require('../models');

const secretAngelService = {

    createGame: async (gameData) => {
        try {
            const colors = [
                '#FF9F68',
                '#72BDA3',
                '#A16AE8',
                '#FF6B6B',
                '#FFD700',
                '#4CAF50',
                '#2196F3',
                '#FF5722',
                '#8E44AD',
                '#F39C12',
                '#2ECC71',
                '#E74C3C',
                '#1ABC9C',
                '#3498DB',
                '#F1C40F',
                '#9B59B6',
                '#34495E',
                '#ECF0F1',
                '#D35400',
                '#BDC3C7',
                '#34495E'
            ];
            const maxRoom = await SecretAngelGame.findOne().sort({ roomId: -1 });
            const newRoomId = maxRoom ? maxRoom.roomId + 1 : 1;
            const hashedPassword = await bcrypt.hash(gameData.password, 10);

            const game = new SecretAngelGame({
                ...gameData,
                password: hashedPassword,
                members: [gameData.host],
                roomId: newRoomId,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
            await game.save();

            return game;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    joinGame: async (roomId, userId, password) => {
        try {
            const game = await SecretAngelGame.findOne({ roomId });
            if (!game) return { success: false, message: 'Game not found' };

            const isMatch = await bcrypt.compare(password, game.password);
            if (!isMatch) return { success: false, message: 'Incorrect password' };

            if (!game.members.includes(userId)) {
                game.members.push(userId);
                await game.save();
            }
            return { success: true, message: 'Joined successfully' };
        } catch (err) {
            console.error(err);
            return { success: false, message: 'Server error' };
        }
    },
    startGame: async (gameId) => {
        try {
            // const shuffledMembers = shuffleArray([...members]);

            // const assignments = members.map((member, index) => ({
            //     user: member,
            //     secretAngel: shuffledMembers[(index + 1) % shuffledMembers.length],
            // }));

            // game.assignment = assignments;

        } catch (error) {

        }
    },
    getAllGames: async () => {
        try {
            return await SecretAngelGame.find().populate('host members');
        } catch (error) {
            throw new Error(error.message);
        }
    },


    getGameById: async (gameId) => {
        try {
            return await SecretAngelGame.findById(gameId).populate('host members');
        } catch (error) {
            throw new Error(error.message);
        }
    },


    updateGame: async (gameId, updatedData) => {
        try {
            const game = await SecretAngelGame.findByIdAndUpdate(gameId, updatedData, { new: true });
            if (!game) throw new Error('Game not found');
            return game;
        } catch (error) {
            throw new Error(error.message);
        }
    },


    deleteGame: async (gameId) => {
        try {
            const game = await SecretAngelGame.findByIdAndDelete(gameId);
            if (!game) throw new Error('Game not found');
            return game;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = secretAngelService;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
