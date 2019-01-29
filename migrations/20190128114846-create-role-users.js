'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('role_users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            user: {
                type: Sequelize.INTEGER,
                allowNull: false
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
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: null
            }
        },{
            'schema': 'auth'
        });
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.dropTable('role_users',{schema: 'auth'}),
            queryInterface.dropSchema('auth')
        ])
    }
};