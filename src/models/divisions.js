'use strict';
module.exports = (sequelize, DataTypes) => {
  const divisions = sequelize.define('divisions', {
    division_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    division_bn_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    division_url: {
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
  divisions.associate = function(models) {
    // associations can be defined here
  };
  return divisions;
};