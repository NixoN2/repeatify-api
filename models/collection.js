'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate({User, Card,Editor}) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'author'});
      this.hasMany(Card, {foreignKey: 'collectionId', as: 'cards', onDelete: 'cascade',hooks: true});
      this.hasMany(Editor, {foreignKey: 'collectionId', as: 'editors', onDelete: 'cascade', hooks: true})
    }
    toJSON(){
      return { ...this.get(), userId: undefined};
    }
  };
  Collection.init({
    private: {
      type:DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Collection name must be entered"},
        notEmpty: {msg: "Collection name must be entered"}
      }
    }
  }, {
    sequelize,
    tableName: 'collections',
    modelName: 'Collection',
  });
  return Collection;
};