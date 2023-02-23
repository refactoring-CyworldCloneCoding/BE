'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ilchonpyungs, {
        as: 'Ilchonpyungs',
        foreignKey: 'userId',
      });
      this.hasMany(models.Diaries, {
        as: 'Diaries',
        foreignKey: 'userId',
      });
      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'userId',
      });
      this.hasMany(models.Guestbooks, {
        as: 'Guestbooks',
        foreignKey: 'userId',
      });
      this.hasOne(models.Myhomes, {
        as: 'Myhomes',
        foreignKey: 'userId',
      });
      // this.hasMany(models.Ilchons, {
      //   as: 'Ilchons',
      //   foreignKey: 'userId',
      // });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        unique: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dotori: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
