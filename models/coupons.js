'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupons.init(
    {
      couponId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // 쿠폰 번호
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // 쿠폰 금액
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // 쿠폰 미사용 여부
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'o',
      },
    },
    {
      sequelize,
      modelName: 'Coupons',
    }
  );
  return Coupons;
};
