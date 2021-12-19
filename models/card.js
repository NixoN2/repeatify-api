'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Collection}) {
      // define association here
      this.belongsTo(Collection, {foreignKey: 'collectionId', as: 'collection'});
    }
  };
  Card.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Card name must be filled"},
        notEmpty: {msg: "Card name must not be empty"},
      }
    },
    material: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: "Card material must be filled"},
        notEmpty: {msg: "Card material must not be empty"},
      }
    }
  }, {
    sequelize,
    tableName: 'cards',
    modelName: 'Card',
  });
  return Card;
};