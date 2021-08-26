'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
      'Users', 
      'first_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn(
      'Users',
      'last_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn(
      'Users',
      'age', {
        type: Sequelize.INTEGER
      })
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn(
      'Users', 
      'first_name', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn(
      'Users',
      'last_name', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn(
      'Users',
      'age', {
        type: Sequelize.INTEGER
      })
    ]
  }
};
