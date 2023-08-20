const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: process.env.DATABASE_TEST_DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    logging: false
});


async function createTestDatabase() {
    const dbName = process.env.DATABASE_TEST_DATABASE;
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
}

async function dropTestDatabase() {
    const dbName = process.env.DATABASE_TEST_DATABASE;
    await sequelize.query(`DROP DATABASE IF EXISTS ${dbName};`);
}

module.exports = {
    sequelize,
    createTestDatabase,
    dropTestDatabase
};