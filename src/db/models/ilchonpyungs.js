'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ilchonpyungs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Myhomes, { foreignKey: 'myhomeId' });
    }
  }
  Ilchonpyungs.init(
    {
      ilchonpyungId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        unique: true,
        type: DataTypes.INTEGER,
      },
      myhomeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Myhomes',
          key: 'myhomeId',
        },
        onDelete: 'cascade',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      nick: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ilchonpyung: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Ilchonpyungs',
    }
  );
  return Ilchonpyungs;
};