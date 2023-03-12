import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comments } from './comments';

@Entity()
export class Diaries extends BaseEntity {
  @PrimaryGeneratedColumn()
  diaryId: number;

  @Column()
  userId: number;

  @Column()
  myhomeId: number;

  @Column()
  diaryNo: number;

  @Column()
  content: string;

  @Column({ nullable: true, default: true })
  dirImg: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comments, (comments) => comments.diary)
  @JoinColumn()
  comment: Comments;
}