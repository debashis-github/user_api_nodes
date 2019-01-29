'use strict';
module.exports = (sequelize, DataTypes) => {
  const resources = sequelize.define('resources', {
    billboard_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    res_path: {
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
  }, {
      'schema':'trade_market'
  });
    resources.associate = function(models) {
    // associations can be defined here
  };
  return resources;
};