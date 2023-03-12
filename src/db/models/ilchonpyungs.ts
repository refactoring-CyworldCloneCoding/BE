import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './users';

@Entity()
export class Ilchonpyungs extends BaseEntity {
  @PrimaryGeneratedColumn()
  ilchonpyungId: number;

  @Column()
  userId: number;

  @Column()
  myhomeId: number;

  @Column()
  nick: string;

  @Column()
  name: string;

  @Column()
  ilchonpyung: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.ilchonpyungs)
  user: Users;
}