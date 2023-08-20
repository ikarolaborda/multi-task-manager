module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = await queryInterface.describeTable('Projects');
    if (!columns.userId) {
      await queryInterface.addColumn('Projects', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Projects', 'userId');
  }
};
