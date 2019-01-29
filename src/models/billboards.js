'use strict';
module.exports = (sequelize, DataTypes) => {
  const billboards = sequelize.define('billboards', {
    billboard_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    partner_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    division: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    district: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    thana: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    address: {
        type: DataTypes.STRING,
        allowNull:false
    },
    name_of_billboard: {
        type: DataTypes.STRING,
        allowNull:false
    },
    side: {
        type: DataTypes.STRING,
        allowNull:false
    },
    facing: {
        type: DataTypes.STRING,
        allowNull:false
    },
    stand_start_date: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    },
    stand_end_date: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    unit: {
        type: DataTypes.STRING,
        allowNull:false
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    lat: {
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    lng: {
        type: DataTypes.DOUBLE,
        allowNull:false
    },
      createdBy: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true
      },
      updatedBy: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true
      },
//timestamps
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.fn('now')
      },
      updatedAt: {
          type: DataTypes.DATE,
          defaultValue: null,
          allowNull: true
      }
  }, {'schema':'trade_market'});
  billboards.associate = function(models) {
    // associations can be defined here
  };
  return billboards;
};