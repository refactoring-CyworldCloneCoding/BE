import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import { Myhomes } from '.';

class MyhomeCounts extends Model<
  InferAttributes<MyhomeCounts>,
  InferCreationAttributes<MyhomeCounts>
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

MyhomeCounts.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false, // NOT NULL, Null을 허용하지 않음
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // PRIMARY KEY, 기본키
      unique: true,
    },
    ip: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    myhomeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Myhomes',
        key: 'myhomeId',
      },
      onDelete: 'cascade',
    },
    time: {
      type: DataTypes.STRING(20),
      allowNull: false,
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
    modelName: 'MyhomeCounts',
  }
);

export default MyhomeCounts;