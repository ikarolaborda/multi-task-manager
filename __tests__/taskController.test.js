const request = require('supertest');
const app = require('../index');
const { runCommand } = require('../helpers/runCommand');
const { createTestDatabase, dropTestDatabase } = require('../helpers/createTestDB');

let jwtToken; // To store the JWT token

describe('TaskController', () => {

    // Before any tests run, log in to get a JWT token
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';

        // Create test database
        await createTestDatabase();

        // Run migrations
        await runCommand('npx sequelize-cli db:migrate');

        // Seed the database
        await runCommand('npx sequelize-cli db:seed:all');

        const res = await request(app)
            .post('/login') // Replace with your actual login endpoint
            .send({
                username: 'testUser', // Replace with a valid test user's username
                password: 'testPassword' // Replace with the test user's password
            });

        jwtToken = res.body.token; // Assuming the token is returned in the response body under "token"
    });

    // Test for getting all tasks
    it('should get all tasks for a project', async () => {
        const projectId = 'someValidProjectId'; // Replace with a valid project ID
        const res = await request(app)
            .get(`/projects/${projectId}/tasks`)
            .set('Authorization', `Bearer ${jwtToken}`); // Set the JWT token in the Authorization header

        expect(res.statusCode).toEqual(200);
    });

    it('should add a new task for a project', async () => {
        const projectId = 'someValidProjectId'; // Replace with a valid project ID
        const res = await request(app)
            .post(`/projects/${projectId}/tasks`)
            .set('Authorization', `Bearer ${jwtToken}`) // Set the token in the request header
            .send({
                description: 'Test Task',
                finishDate: '2023-08-20' // Example date
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.description).toEqual('Test Task');
    });

    afterAll(async () => {
        // Undo seeds
        await runCommand('npx sequelize-cli db:seed:undo:all');

        // Undo migrations
        await runCommand('npx sequelize-cli db:migrate:undo:all');

        await dropTestDatabase();
    });
});
