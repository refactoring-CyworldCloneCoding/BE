import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import { Users, Myhomes } from '.';

class Guestbooks extends Model<
  InferAttributes<Guestbooks>,
  InferCreationAttributes<Guestbooks>
> {
  declare guestBookId: CreationOptional<number>;
  declare myhomeId: number;
  declare userId: number;
  declare guestBook: string;
  declare bookImage: string;
  declare createdAt: CreationOptional<number>;
  declare updatedAt: CreationOptional<number>;

  static associate() {
    this.belongsTo(Users, { foreignKey: 'userId' });
    this.belongsTo(Myhomes, { foreignKey: 'myhomeId' });
  }
}

Guestbooks.init(
  {
    guestBookId: {
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
    guestBook: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookImage: {
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
    modelName: 'Guestbooks',
  }
);

export default Guestbooks;