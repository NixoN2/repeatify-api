'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Editor extends Model {
    static associate({User, Collection}) {
        this.belongsTo(User, {foreignKey: 'userId', as: 'editor'});
        this.belongsTo(Collection, {foreignKey: 'collectionId', as: 'collection'});
    }
  };
  Editor.init({
  }, {
    sequelize,
    tableName: 'editors',
    modelName: 'Editor',
  });
  return Editor;
};