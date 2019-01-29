'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('master_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      divisions_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      divisions_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      divisions_bn_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      divisions_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      districts_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      districts_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      districts_bn_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      districts_url: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      upazillas_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      upazillas_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      upazillas_bn_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      upazillas_url: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      union_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      union_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      union_bn_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      union_url: {
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
            queryInterface.dropTable('master_infos',{schema:'trade_market'}),
            queryInterface.dropSchema('trade_market')
        ])
    }
};