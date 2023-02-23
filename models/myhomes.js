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
        foreignKey: 'myhomeId',
      });
      this.hasMany(models.Diaries, {
        as: 'Diaries',
        foreignKey: 'myhomeId',
      });
      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'myhomeId',
      });
      this.hasMany(models.Guestbooks, {
        as: 'Guestbooks',
        foreignKey: 'myhomeId',
      });
    }
  }
  Myhomes.init(
    {
      myhomeId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        unique: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      intro: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
      today: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Myhomes',
    }
  );
  return Myhomes;
};
