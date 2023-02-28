import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import { Myhomes } from '.';

class MyHomeCounts extends Model<
  InferAttributes<MyHomeCounts>,
  InferCreationAttributes<MyHomeCounts>
> {
  declare id: CreationOptional<number>;
  declare ip: string;
  declare myhomeId: number;
  declare time: string;
  declare createdAt: CreationOptional<number>;
  declare updatedAt: CreationOptional<number>;

  static associate() {
    this.belongsTo(Myhomes, { foreignKey: 'myhomeId' });
  }
}

MyHomeCounts.init(
  {
    id: {
      allowNull: false, // NOT NULL, Null을 허용하지 않음
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // PRIMARY KEY, 기본키
      type: DataTypes.INTEGER,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    myhomeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Myhomes',
        key: 'myhomeId',
      },
      onDelete: 'cascade',
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'MyHomeCounts',
  }
);

export default MyHomeCounts;