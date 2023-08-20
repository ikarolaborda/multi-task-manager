const request = require('supertest');
const app = require('../index'); // Import your app
const { User, RefreshToken, BlacklistedToken } = require('../models');
const { runCommand } = require('../helpers/runCommand');
const { createTestDatabase, dropTestDatabase } = require('../helpers/createTestDB');

describe('UserController', () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';

        // Create test database
        await createTestDatabase();

        // Run migrations
        await runCommand('npx sequelize-cli db:migrate');

        // Seed the database
        await runCommand('npx sequelize-cli db:seed:all');
    });

    // Test for registration
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                username: 'testuser',
                password: 'testpassword'  // Send plain password
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User registered successfully');
    });

    // TODO: Add more tests for login, logout, etc.

    afterEach(async () => {
        // Clean up data added by the tests, if necessary
    });

    afterAll(async () => {
        // Undo seeds
        await runCommand('npx sequelize-cli db:seed:undo:all');

        // Undo migrations
        await runCommand('npx sequelize-cli db:migrate:undo:all');

        // Drop test database
        await dropTestDatabase();
    });
});

