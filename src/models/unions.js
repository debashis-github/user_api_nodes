'use strict';
module.exports = (sequelize, DataTypes) => {
  const unions = sequelize.define('unions', {
    upazilla_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    unions_name: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    unions_bn_name: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    unions_url: {
        type: DataTypes.INTEGER,
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
  unions.associate = function(models) {
    // associations can be defined here
  };
  return unions;
};