'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init({
    bancoOrigem: DataTypes.STRING,
    agenciaOrigem: DataTypes.STRING,
    contaOrigem: DataTypes.STRING,
    bancoDestino: DataTypes.STRING,
    agenciaDestino: DataTypes.STRING,
    contaDestino: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    dataHora: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transactions',
    paranoid: true,
  });
  return Transactions;
};