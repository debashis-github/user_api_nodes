'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('billboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billboard_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      partner_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      division: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      district: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      thana: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      name_of_billboard: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      side: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      facing: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      stand_start_date: {
        type: Sequelize.DATE,
          allowNull: false,
      },
      stand_end_date: {
        type: Sequelize.DATE,
          allowNull: false,
      },
      height: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      width: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      unit: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
          allowNull: false,
      },
      lat: {
        type: Sequelize.DOUBLE,
          allowNull: false,
      },
      lng: {
        type: Sequelize.DOUBLE,
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
            queryInterface.dropTable('billboards',{schema:'trade_market'}),
            queryInterface.dropSchema('trade_market')
        ])
    }
};