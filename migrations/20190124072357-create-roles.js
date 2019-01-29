'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
        display_role_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
      createdBy: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      updatedBy: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      createdAt: {
          allowNull: false,
          type: 'TIMESTAMP',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: null
      }
    },{
        'schema':'auth'
    });
  },
  down: (queryInterface, Sequelize) => {
    //return queryInterface.dropTable('roles');
      return Promise.all([
          queryInterface.dropTable('roles',{schema:'auth'}),
          queryInterface.dropSchema('auth')
      ])
  }
};