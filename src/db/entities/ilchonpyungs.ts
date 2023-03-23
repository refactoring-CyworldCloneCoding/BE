import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Myhomes } from './myhomes';
import { Users } from './users';

@Entity()
export class Ilchonpyungs extends BaseEntity {
  @PrimaryGeneratedColumn()
  ilchonpyungId!: number;

  @Column()
  userId!: number;

  @Column()
  myhomeId!: number;

  @Column()
  nick!: string;

  @Column()
  name!: string;

  @Column()
  ilchonpyung!: string;

 @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.ilchonpyungs)
  user!: Users;

  @ManyToOne(() => Myhomes, (myhome) => myhome.ilchonpyungs)
  myhome!: Myhomes;
}