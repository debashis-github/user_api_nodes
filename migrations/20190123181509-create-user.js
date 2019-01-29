'use strict';
const md5 = require('md5');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            usernm: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: md5('123456')
            },
            phone_no: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            service_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            is_active: {
                type: Sequelize.ENUM,
                values: ['0', '1'],
                defaultValue: '1'
            },
            createdBy: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            updatedBy: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            // Timestamps
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
        },
            {
                schema: 'auth'
            });
    },
    down: function (queryInterface) {
        return Promise.all([
            queryInterface.dropTable(
                'users',
                {
                    schema: 'auth'
                }
            ),
            queryInterface.dropSchema(
                'auth'
            )
        ]);
    }
};