'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('divisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      division_name: {
        type: Sequelize.STRING,
          allowNull: false
      },
      division_bn_name: {
        type: Sequelize.STRING,
          allowNull: false
      },
      division_url: {
        type: Sequelize.STRING,
        allowNull: false
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
            queryInterface.dropTable('divisions',{schema:'trade_market'}),
            queryInterface.dropSchema('trade_market')
        ])
    }
};