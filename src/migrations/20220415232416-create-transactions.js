'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bancoOrigem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      agenciaOrigem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contaOrigem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bancoDestino: {
        allowNull: false,
        type: Sequelize.STRING
      },
      agenciaDestino: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contaDestino: {
        allowNull: false,
        type: Sequelize.STRING
      },
      valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      dataHora: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};