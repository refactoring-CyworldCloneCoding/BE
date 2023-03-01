import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import { Users, Myhomes, Comments } from '.';

class Diaries extends Model<
  InferAttributes<Diaries>,
  InferCreationAttributes<Diaries>
> {
  declare diaryId: CreationOptional<number>;
  // declare userId: number;
  declare myhomeId: number;
  declare diaryNo: number;
  declare content: string;
  declare dirImg: string;
  declare createdAt: CreationOptional<number>;
  declare updatedAt: CreationOptional<number>;

  static associate() {
    // this.belongsTo(Users, { foreignKey: 'userId' });
    this.belongsTo(Myhomes, { foreignKey: 'myhomeId' });
    this.hasMany(Comments, {
      sourceKey: 'diaryId',
      foreignKey: 'diaryId',
    });
  }
}

Diaries.init(
  {
    diaryId: {
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
    // userId: {
    // type: DataTypes.INTEGER.UNSIGNED,
    //   allowNull: false,
    //   references: {
    //     model: 'Users',
    //     key: 'userId',
    //   },
    //   onDelete: 'cascade',
    // },
    diaryNo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dirImg: {
      type: DataTypes.STRING(100),
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
    modelName: 'Diaries',
  }
);

export default Diaries;