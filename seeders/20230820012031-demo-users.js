const bcrypt = require('bcrypt');

/**
 *
 * This seeder will create two demo users, only use this if you will not be using the registration endpoint
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'demoUser1',
      password: await bcrypt.hash('password123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'demoUser2',
      password: await bcrypt.hash('password456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
