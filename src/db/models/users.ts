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
// import bcrypt from 'bcrypt';

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

  @OneToOne(() => Myhomes, (myhome) => myhome.user)
  myhome: Myhomes;

  // async validatePassword(password: string): Promise<boolean> {
  //   const isValid: boolean = await bcrypt.compare(password, this.password);
  //   return isValid;
  // }
}