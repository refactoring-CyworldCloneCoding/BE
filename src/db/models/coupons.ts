import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';

class Coupons extends Model<
  InferAttributes<Coupons>,
  InferCreationAttributes<Coupons>
> {
  declare couponId: CreationOptional<number>;
  declare couponNum: number;
  declare price: number;
  declare status: string;
  declare createdAt: CreationOptional<number>;
  declare updatedAt: CreationOptional<number>;

  static associate() {}
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
    couponNum: {
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
    createdAt: {
      type: DataTypes.INTEGER,
      defaultValue: (Date.now() / 1000) | (0 + 60 * 60 * 9),
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      defaultValue: (Date.now() / 1000) | (0 + 60 * 60 * 9),
    },
  },
  {
    sequelize,
    modelName: 'Coupons',
  }
);

export default Coupons;