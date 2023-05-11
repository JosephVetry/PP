'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RentBook.belongsTo(models.Profile, { foreignKey: 'ProfileId' })
      RentBook.belongsTo(models.Book, { foreignKey: 'BookId' })
    }
  }
  RentBook.init({
    dateBorrow: DataTypes.DATE,
    dateReturn: DataTypes.DATE,
    dateMustReturn: DataTypes.DATE,
    ProfileId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RentBook',
  });
  return RentBook;
};