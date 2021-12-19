'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Collection,Editor}) {
      this.hasMany(Collection, { as: 'author', foreignKey: 'userId', onDelete: 'cascade', hooks: true});
      this.hasMany(Editor, {as: 'editor', foreignKey: 'userId', onDelete: 'cascade', hooks: true});
    }

    toJSON(){
      return { ...this.get(), password: undefined};
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a first name'},
        notEmpty: { msg: 'First name must not be empty'}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a last name'},
        notEmpty: { msg: 'Last name must not be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an email'},
        notEmpty: { msg: 'Email must not be empty'},
        isEmail: { msg: 'Email must be valid'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password'},
        notEmpty: { msg: 'Password must not be empty'}
      }
    },
    animal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        notNull: { msg: 'User must have a role'},
        notEmpty: { msg: 'Role must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};