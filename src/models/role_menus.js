'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_menus = sequelize.define('role_menus', {
    menu: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
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
  }, {'schema':'auth'});
  role_menus.associate = function(models) {
    // associations can be defined here
  };
  return role_menus;
};