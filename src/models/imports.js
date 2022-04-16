'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Imports.init({
    dateTransactions: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Imports',
    paranoid: true
  });
  return Imports;
};