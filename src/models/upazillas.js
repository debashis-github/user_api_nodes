'use strict';
module.exports = (sequelize, DataTypes) => {
    const upazillas = sequelize.define('upazillas', {
        districts_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        upazillas_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        upazillas_bn_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        upazillas_url: {
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
    upazillas.associate = function(models) {
        // associations can be defined here
    };
    return upazillas;
};