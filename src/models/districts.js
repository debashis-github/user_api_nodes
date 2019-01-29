'use strict';
module.exports = (sequelize, DataTypes) => {
  const districts = sequelize.define('districts', {
    division_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    districts_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    districts_bn_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    districts_url: {
        type: DataTypes.STRING,
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
  districts.associate = function(models) {
    // associations can be defined here
  };
  return districts;
};