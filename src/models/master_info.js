'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_info = sequelize.define('master_info', {
    divisions_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    divisions_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    divisions_bn_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    divisions_url:{
        type: DataTypes.STRING,
        allowNull:false
    },
    districts_id: {
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
    upazillas_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    upazillas_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    upazillas_bn_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    upazillas_url: {
        type: DataTypes.STRING,
        allowNull:false
    },
    union_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    union_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    union_bn_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    union_url: {
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
  master_info.associate = function(models) {
    // associations can be defined here
  };
  return master_info;
};