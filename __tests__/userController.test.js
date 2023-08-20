require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const { User, RefreshToken, BlacklistedToken } = require('../models');
const { runCommand } = require('../helpers/runCommand');
const app = require('../index');

let server;

describe('UserController', () => {
    beforeAll(async () => {
        server = app.listen(3010);
        process.env.NODE_ENV = 'test';

        // Run migrations
        await runCommand('npx sequelize-cli db:migrate');

    });

    // Test for registration
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User registered successfully');
    });

    // TODO: Add more tests for login, logout, etc.

    afterEach(async () => {
        // Clean up data added by the tests, if necessary
    });

    afterAll(async () => {
        // Undo migrations
        await runCommand('npx sequelize-cli db:migrate:undo:all');
        server.close();
    });
});

