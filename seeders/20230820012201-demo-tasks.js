module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      description: 'Demo Task 1',
      projectId: 1,
      finishDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Demo Task 2',
      projectId: 2,
      finishDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
