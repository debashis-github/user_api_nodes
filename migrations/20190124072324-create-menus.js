'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
        display_menu: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        parent_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
      createdBy: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      updatedBy: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
        {
          'schema': 'auth'
        });
  },
  down: (queryInterface, Sequelize) => {
    //return queryInterface.dropTable('menus');
    return Promise.all([
        queryInterface.dropTable('menus',{schema: 'auth'}),
        queryInterface.dropSchema('auth')
    ])
  }
};