import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Comments } from './comments';
import { Diaries } from './diaries';
import { Guestbooks } from './guestbooks';
import { Ilchonpyungs } from './ilchonpyungs';
import { Users } from './users';

@Entity()
export class Myhomes extends BaseEntity {
  @PrimaryGeneratedColumn()
  myhomeId!: number;

  @Column()
  userId!: number;

  @Column({ default: '' })
  intro: string;

  @Column()
  profile: string;

  @Column({ default: 0 })
  today: number;

  @Column({ default: 0 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Users, (users) => users.myhome)
  @JoinColumn()
  user!: Users;

  @OneToMany(() => Diaries, (diaries) => diaries.myhome)
  diaries!: Diaries[];

  @OneToMany(() => Comments, (comments) => comments.myhome)
  comments!: Comments[];

  @OneToMany(() => Ilchonpyungs, (ilchonpyungs) => ilchonpyungs.myhome)
  ilchonpyungs!: Ilchonpyungs[];

  @OneToMany(() => Guestbooks, (guestbooks) => guestbooks.myhome)
  guestbooks!: Guestbooks[];
}
