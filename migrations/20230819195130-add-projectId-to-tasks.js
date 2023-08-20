module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = await queryInterface.describeTable('Tasks');
    if (!columns.projectId) {
      await queryInterface.addColumn('Tasks', 'projectId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'projectId');
  }
};
