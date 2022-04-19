'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.TEXT
      },
      message: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key:'id'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};