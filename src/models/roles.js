'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    display_role_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      indexes: [
          {
              unique: true,
              fields: ['role_name']
          }
      ]
  },{
      'schema':'auth'
  });
  roles.associate = function(models) {
    // associations can be defined here
  };
  return roles;
};