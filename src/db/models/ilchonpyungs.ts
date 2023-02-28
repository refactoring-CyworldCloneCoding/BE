import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import { Users, Myhomes } from '.';

class Ilchonpyungs extends Model<
  InferAttributes<Ilchonpyungs>,
  InferCreationAttributes<Ilchonpyungs>
> {
  declare ilchonpyungId: CreationOptional<number>;
  declare userId: number;
  declare myhomeId: number;
  declare nick: string;
  declare ilchonpyung: string;
  declare createdAt: CreationOptional<number>;
  declare updatedAt: CreationOptional<number>;

  static associate() {
    this.belongsTo(Users, { foreignKey: 'userId' });
    this.belongsTo(Myhomes, { foreignKey: 'myhomeId' });
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
      allowNull: false,
      references: {
        model: 'Myhomes',
        key: 'myhomeId',
      },
      onDelete: 'cascade',
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
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ilchonpyung: {
      type: DataTypes.STRING,
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
    modelName: 'Ilchonpyungs',
  }
);

export default Ilchonpyungs;