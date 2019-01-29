'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sessions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            token: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER
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
                type: Sequelize.INTEGER
            },
            updatedBy: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: null
            }
        },{
          'schema':'auth'
        });
    },
    down: function (queryInterface) {
        return Promise.all([
            queryInterface.dropTable(
                'sessions',
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