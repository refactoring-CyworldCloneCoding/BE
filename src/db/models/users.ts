import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../config/connection';
import { Myhomes, Ilchonpyungs,Diaries, Comments, Guestbooks } from '.';

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare userId: CreationOptional<number>;
  declare email: string;
  declare name: string;
  declare password: string;
  declare gender: string;
  declare birth: string;
  // declare dotori: number;
  // declare snsId: string;
  // declare provider: string;
  // declare refreshToken: string;
  declare createdAt: CreationOptional<number>;
  declare updatedAt: CreationOptional<number>;

  static associate() {
    this.hasOne(Myhomes, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
    this.hasMany(Ilchonpyungs, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
    this.hasMany(Diaries, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
    this.hasMany(Comments, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
    this.hasMany(Guestbooks, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
    // this.hasMany(Ilchons, {
    //   sourceKey: 'userId',
    //   foreignKey: 'userId',
    // });
  }
}

Users.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birth: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    // snsId: {
    //   type: DataTypes.STRING(100),
    //   allowNull: false,
    // },
    // provider: {
    //   type: DataTypes.STRING(100),
    //   allowNull: false,
    // },
    // refreshToken: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },
    // dotori: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   allowNull: true,
    //   defaultValue: 0,
    // },
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
    modelName: 'Users',
  }
);

export default Users;