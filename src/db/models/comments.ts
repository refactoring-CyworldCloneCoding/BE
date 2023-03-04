import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import { Users, Myhomes, Diaries } from '.';

class Comments extends Model<
  InferAttributes<Comments>,
  InferCreationAttributes<Comments>
> {
  declare commentId: CreationOptional<number>;
  declare userId: number;
  declare myhomeId: number;
  declare diaryId: number;
  declare name: string;
  declare comment: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate() {
    this.belongsTo(Users, { foreignKey: 'userId' });
    this.belongsTo(Myhomes, { foreignKey: 'myhomeId' });
    this.belongsTo(Diaries, { foreignKey: 'diaryId' });
  }
}

Comments.init(
  {
    commentId: {
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
    diaryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Diaries',
        key: 'diaryId',
      },
      onDelete: 'cascade',
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Comments',
  }
);

export default Comments;