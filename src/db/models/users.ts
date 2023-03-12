import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Myhomes } from './myhomes';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  birth: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Myhomes, (myhome) => myhome.user, { eager: true })
  myhome: Myhomes;

  // async validatePassword(password: string): Promise<boolean> {
  //   const isValid: boolean = await bcrypt.compare(password, this.password);
  //   return isValid;
  // }
}

// import {
//   Model,
//   DataTypes,
//   InferAttributes,
//   CreationOptional,
//   InferCreationAttributes,
// } from 'sequelize';
// import sequelize from '../config/connection';
// import { Myhomes, Ilchonpyungs,Diaries, Comments, Guestbooks } from '.';

// class Users extends Model<
//   InferAttributes<Users>,
//   InferCreationAttributes<Users>
// > {
//   declare userId: CreationOptional<number>;
//   declare email: string;
//   declare name: string;
//   declare password: string;
//   declare gender: string;
//   declare birth: string;
//   // declare dotori: number;
//   // declare snsId: string;
//   // declare provider: string;
//   // declare refreshToken: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;

//   static associate() {
//     this.hasOne(Myhomes, {
//       sourceKey: 'userId',
//       foreignKey: 'userId',
//     });
//     this.hasMany(Ilchonpyungs, {
//       sourceKey: 'userId',
//       foreignKey: 'userId',
//     });
//     this.hasMany(Diaries, {
//       sourceKey: 'userId',
//       foreignKey: 'userId',
//     });
//     this.hasMany(Comments, {
//       sourceKey: 'userId',
//       foreignKey: 'userId',
//     });
//     this.hasMany(Guestbooks, {
//       sourceKey: 'userId',
//       foreignKey: 'userId',
//     });
//     // this.hasMany(Ilchons, {
//     //   sourceKey: 'userId',
//     //   foreignKey: 'userId',
//     // });
//   }
// }

// Users.init(
//   {
//     userId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false, // NOT NULL, Null을 허용하지 않음
//       autoIncrement: true, // AUTO_INCREMENT
//       primaryKey: true, // PRIMARY KEY, 기본키
//       unique: true,
//     },
//     email: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//     },
//     name: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     birth: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     // snsId: {
//     //   type: DataTypes.STRING(100),
//     //   allowNull: false,
//     // },
//     // provider: {
//     //   type: DataTypes.STRING(100),
//     //   allowNull: false,
//     // },
//     // refreshToken: {
//     //   type: DataTypes.STRING(100),
//     //   allowNull: true,
//     // },
//     // dotori: {
//     //   type: DataTypes.INTEGER.UNSIGNED,
//     //   allowNull: true,
//     //   defaultValue: 0,
//     // },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     modelName: 'Users',
//   }
// );

// export default Users;
