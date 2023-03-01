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
  declare guestbookId: CreationOptional<number>;
  declare myhomeId: number;
  declare userId: number;
  declare guestBookNum: number;
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
    guestbookId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false, // NOT NULL, Null을 허용하지 않음
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // PRIMARY KEY, 기본키
      unique: true,
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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      },
      onDelete: 'cascade',
    },
    guestBookNum: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    guestBook: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bookImage: {
      type: DataTypes.STRING(100),
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