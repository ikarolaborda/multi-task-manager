const request = require('supertest');
const app = require('../index');
const { runCommand } = require('../helpers/runCommand');
const { createTestDatabase, dropTestDatabase } = require('../helpers/createTestDB');

let jwtToken; // To store the JWT token

describe('ProjectController', () => {

    // Before running the tests, simulate a login to get the JWT token
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';

        // Create test database
        await createTestDatabase();

        // Run migrations
        await runCommand('npx sequelize-cli db:migrate');

        // Seed the database
        await runCommand('npx sequelize-cli db:seed:all');

        const res = await request(app)
            .post('/api/login') // Assuming this is your login endpoint
            .send({
                username: 'testUser', // Use a test user's credentials
                password: 'testPass'
            });

        jwtToken = res.body.token; // Store the token for later use
    });

    // Test for getting all projects
    it('should get all projects for a user', async () => {
        const res = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${jwtToken}`); // Set the token in the request header

        expect(res.statusCode).toEqual(200);
    });

    // Test for adding a project
    it('should add a new project for a user', async () => {
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${jwtToken}`) // Set the token in the request header
            .send({
                name: 'Test Project'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Test Project');
    });

    afterAll(async () => {
        // Undo seeds
        await runCommand('npx sequelize-cli db:seed:undo:all');

        // Undo migrations
        await runCommand('npx sequelize-cli db:migrate:undo:all');

        await dropTestDatabase();
    });
});
