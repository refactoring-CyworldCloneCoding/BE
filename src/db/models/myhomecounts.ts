import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MyhomeCounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  myhomeId: number;

  @Column()
  time: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// import {
//   Model,
//   DataTypes,
//   InferAttributes,
//   CreationOptional,
//   InferCreationAttributes,
// } from 'sequelize';
// import sequelize from '../config/connection';
// import { Myhomes } from '.';

// class MyhomeCounts extends Model<
//   InferAttributes<MyhomeCounts>,
//   InferCreationAttributes<MyhomeCounts>
// > {
//   declare id: CreationOptional<number>;
//   declare ip: string;
//   declare myhomeId: number;
//   declare time: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;

//   static associate() {
//     this.belongsTo(Myhomes, { foreignKey: 'myhomeId' });
//   }
// }

// MyhomeCounts.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false, // NOT NULL, Null을 허용하지 않음
//       autoIncrement: true, // AUTO_INCREMENT
//       primaryKey: true, // PRIMARY KEY, 기본키
//       unique: true,
//     },
//     ip: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     myhomeId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       references: {
//         model: 'Myhomes',
//         key: 'myhomeId',
//       },
//       onDelete: 'cascade',
//     },
//     time: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     modelName: 'MyhomeCounts',
//   }
// );

// export default MyhomeCounts;
