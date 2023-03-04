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
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate() {}
}

Coupons.init(
  {
    couponId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false, // NOT NULL, Null을 허용하지 않음
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // PRIMARY KEY, 기본키
      unique: true,
    },
    // 쿠폰 번호
    couponNum: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // 쿠폰 금액
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // 쿠폰 미사용 여부
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'o',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Coupons',
  }
);

export default Coupons;