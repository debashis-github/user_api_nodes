'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('unions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      upazilla_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      unions_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      unions_bn_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      unions_url: {
        type: Sequelize.STRING,
          allowNull: false,
      },
        createdBy: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

        // Timestamps
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },{
        'schema':'trade_market'
    });
  },
    down: (queryInterface, Sequelize) => {
        //return queryInterface.dropTable('roles');
        return Promise.all([
            queryInterface.dropTable('unions',{schema:'trade_market'}),
            queryInterface.dropSchema('trade_market')
        ])
    }
};