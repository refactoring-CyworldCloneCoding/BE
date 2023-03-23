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
export class Guestbooks extends BaseEntity {
  @PrimaryGeneratedColumn()
  guestbookId!: number;

  @Column()
  userId!: number;

  @Column()
  myhomeId!: number;

  @Column({ default: 0 })
  guestBookNum: number;

  @Column()
  name!: string;

  @Column()
  guestBook!: string;

  @Column()
  bookImage!: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Users, (user) => user.guestbooks)
  user!: Users;

  @ManyToOne(() => Myhomes, (myhome) => myhome.guestbooks)
  myhome!: Myhomes;
}
