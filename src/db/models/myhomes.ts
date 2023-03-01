import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import {
  Users,
  Ilchonpyungs,
  Diaries,
  Comments,
  Guestbooks,
  MyhomeCounts,
} from '.';

class Myhomes extends Model<
  InferAttributes<Myhomes>,
  InferCreationAttributes<Myhomes>
> {
  declare myhomeId: CreationOptional<number>;
  declare userId: number;
  declare intro: string;
  declare today: number;
  declare total: number;
  declare createdAt: CreationOptional<number>;
  declare updatedAt: CreationOptional<number>;

  static associate() {
    this.belongsTo(Users, { foreignKey: 'userId' });
    this.hasMany(Ilchonpyungs, {
      sourceKey: 'myhomeId',
      foreignKey: 'myhomeId',
    });
    this.hasMany(Diaries, {
      sourceKey: 'myhomeId',
      foreignKey: 'myhomeId',
    });
    this.hasMany(Comments, {
      sourceKey: 'myhomeId',
      foreignKey: 'myhomeId',
    });
    this.hasMany(Guestbooks, {
      sourceKey: 'myhomeId',
      foreignKey: 'myhomeId',
    });
    this.hasMany(MyhomeCounts, {
      sourceKey: 'myhomeId',
      foreignKey: 'myhomeId',
    });
  }
}

Myhomes.init(
  {
    myhomeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false, // NOT NULL, Null을 허용하지 않음
      autoIncrement: true, // AUTO_INCREMENT
      primaryKey: true, // PRIMARY KEY, 기본키
      unique: true,
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
    intro: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
    },
    today: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
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
    modelName: 'Myhomes',
  }
);

export default Myhomes;