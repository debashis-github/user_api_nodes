'use strict';
module.exports = (sequelize, DataTypes) => {
  const menus = sequelize.define('menus', {
    menu: {
      type: DataTypes.STRING,
        allowNull:false
    },
      display_menu: {
          type: DataTypes.STRING,
          allowNull:false
      },
      parent_id: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true
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
  menus.associate = function(models) {
    // associations can be defined here
  };
  return menus;
};