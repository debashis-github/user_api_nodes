'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('upazillas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            districts_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            upazillas_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            upazillas_bn_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            upazillas_url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdBy: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            updatedBy: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: null
            }
        },{
            'schema':'trade_market'
        });
    },
    down: (queryInterface, Sequelize) => {
        //return queryInterface.dropTable('roles');
        return Promise.all([
            queryInterface.dropTable('upazillas',{schema:'trade_market'}),
            queryInterface.dropSchema('trade_market')
        ])
    }
};