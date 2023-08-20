module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [{
      name: 'Demo Project 1',
      userId: 1,  // Assuming demoUser1 has ID 1
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Demo Project 2',
      userId: 2,  // Assuming demoUser2 has ID 2
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
