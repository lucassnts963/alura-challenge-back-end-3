'use strict';

const EncryptPasswordHandler = require('../services/EncryptPasswordHandler')

//TODO: Guardar infos em outro lugar
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Users', [
     {
       name: 'admin',
       email: 'admin@email.com.br',
       password: EncryptPasswordHandler.generateHash('123999'),
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
