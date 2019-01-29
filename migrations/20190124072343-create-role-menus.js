'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role_menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu: {
        type: Sequelize.INTEGER,
          allowNull: false
      },
      role: {
        type: Sequelize.INTEGER,
          allowNull: false
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
        return Promise.all([
            queryInterface.dropTable('role_menus',{schema: 'auth'}),
            queryInterface.dropSchema('auth')
        ])
    }
};