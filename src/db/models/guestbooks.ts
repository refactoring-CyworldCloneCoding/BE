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
export class Guestbooks extends BaseEntity {
  @PrimaryGeneratedColumn()
  guestbookId: number;

  @Column()
  userId: number;

  @Column()
  myhomeId: number;

  @Column()
  guestBookNum: number;

  @Column()
  name: string;

  @Column()
  guestBook: string;

  @Column()
  bookImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.guestbooks)
  user: Users;
}