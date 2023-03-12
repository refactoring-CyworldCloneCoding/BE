import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './users';

@Entity()
export class Myhomes extends BaseEntity {
  @PrimaryGeneratedColumn()
  myhomeId: number;

  @Column()
  userId: number;

  @Column()
  intro: string;

  @Column()
  today: number;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Users, (users) => users.myhome)
  @JoinColumn()
  user: Users;
}