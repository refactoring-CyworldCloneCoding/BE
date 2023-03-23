import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Diaries } from './diaries';
import { Myhomes } from './myhomes';
import { Users } from './users';

@Entity()
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  commentId!: number;

  @Column()
  userId!: number;

  @Column()
  myhomeId!: number;

  @Column()
  diaryId!: number;

  @Column()
  name!: string;

  @Column()
  comment!: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Diaries, (diaries) => diaries.comments, {
    onDelete: 'CASCADE',
  })
  diary: Diaries;

  @ManyToOne(() => Users, (user) => user.comments)
  user!: Diaries;

  @ManyToOne(() => Myhomes, (myhome) => myhome.comments)
  myhome!: Myhomes;
}
