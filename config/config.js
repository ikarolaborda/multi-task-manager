const path = require('path');

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: path.resolve(__dirname, '.env.test') });
} else {
    require('dotenv').config();
}

module.exports = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_TEST_DATABASE,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT
    }
};
