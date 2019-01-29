'use strict';

module.exports = (sequelize, DataTypes) => {
    let Session = sequelize.define('session', {
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        is_active: {
            type: DataTypes.ENUM,
            values: ['0', '1'],
            defaultValue: '1'
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: null
        }
    }, {
        classMethods:{
            associate:function(models){
                Session.belongsTo(models.User, { foreignKey:'userId'} );
            }
        },
        tableName:'sessions'
    },{'schema':'auth'});

    return Session;
};