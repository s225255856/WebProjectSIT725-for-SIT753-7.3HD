const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { app } = require('../server');
const { User } = require('../models');

let mongoServer;
let token;
let userId;

describe('Auth Middleware Unit Test', () => {
    it('should respond 403 if no token provided', async () => {
        const res = await request(app)
            .post('/api/users/settings')
            .send({ name: 'Test' });

        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message', 'Invalid or expired token');
    });
});

describe('Auth Integration Tests', function () {
    before(async function () {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        await mongoose.connect(uri);

        console.log('MongoDB In-Memory Server connected');
    });

    after(async function () {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async function () {
        if (mongoose.connection.readyState === 1) {
            await User.deleteMany({});
        }
    });

    describe('POST /api/users/signup', function () {
        it('should register a new user', async function () {
            const res = await request(app).post('/api/users/signup').send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            });

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message', 'User created successfully');
            expect(res.body.user).to.have.property('email', 'john@example.com');

            const user = await User.findOne({ email: 'john@example.com' });
            expect(user).to.exist;
        });

        it('should not allow duplicate registration', async function () {
            await User.create({
                name: 'Jane',
                email: 'jane@example.com',
                password: 'hashedpassword',
            });

            const res = await request(app).post('/api/users/signup').send({
                name: 'Jane',
                email: 'jane@example.com',
                password: 'newpassword',
            });

            expect(res.status).to.equal(500);
            expect(res.body).to.have.property('message', 'Server error');
            expect(res.body.error).to.include('User already exists');
        });

        it('should fail if required fields are missing', async function () {
            const res = await request(app).post('/api/users/signup').send({
                email: 'missing@fields.com',
            });

            expect(res.status).to.equal(500);
            expect(res.body.error).to.include('All fields are required');
        });

        it('should fail if email is invalid format (optional)', async function () {
            const res = await request(app).post('/api/users/signup').send({
                name: 'Invalid Email',
                email: 'invalid-email',
                password: 'password123',
            });

            expect(res.status).to.not.equal(201);
        });
    });

    describe('POST /api/users/login', function () {
        beforeEach(async function () {
            const hashed = await bcrypt.hash('password123', 10);
            await User.create({ name: 'Test User', email: 'test@login.com', password: hashed });
        });

        it('should login a user with valid credentials', async function () {
            const res = await request(app).post('/api/users/login').send({
                email: 'test@login.com',
                password: 'password123',
            });

            expect(res.status).to.equal(200);
        });
    });

    describe('POST /api/users/settings', function () {
        beforeEach(async function () {
            const password = 'password123';
            const hashed = await bcrypt.hash(password, 10);

            const user = await User.create({
                name: 'Settings User',
                email: 'settings@example.com',
                password: hashed,
                avatar: 'oldavatar.png',
            });

            userId = user._id.toString();

            token = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: '1h' }
            );
        });

        it('should update user name and avatar', async function () {
            const res = await request(app)
                .post('/api/users/settings')
                .set('Cookie', [`token=${token}`])
                .field('name', 'New Name')
                .redirects(0);

            expect(res.status).to.equal(302); // Because the endpoint redirects
            const updatedUser = await User.findById(userId);
            expect(updatedUser.name).to.equal('New Name');
        });

        it('should update password correctly', async function () {
            const newPassword = 'newStrongPass123';

            const res = await request(app)
                .post('/api/users/settings')
                .set('Cookie', [`token=${token}`])
                .field('password', newPassword)
                .field('confirmPassword', newPassword);

            expect(res.status).to.equal(302); // because it redirects

            const updatedUser = await User.findById(userId);
            const match = await bcrypt.compare(newPassword, updatedUser.password);
            expect(match).to.be.true;
        });
    });
});

