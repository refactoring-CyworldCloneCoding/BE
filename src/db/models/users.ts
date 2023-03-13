import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Comments } from './comments';
import { Diaries } from './diaries';
import { Guestbooks } from './guestbooks';
import { Ilchonpyungs } from './ilchonpyungs';
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

  @OneToMany(() => Diaries, (diaries) => diaries.user)
  diaries: Diaries[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Ilchonpyungs, (ilchonpyungs) => ilchonpyungs.user)
  ilchonpyungs: Ilchonpyungs[];

  @OneToMany(() => Guestbooks, (guestbooks) => guestbooks.user)
  guestbooks: Guestbooks[];

  // async validatePassword(password: string): Promise<boolean> {
  //   const isValid: boolean = await bcrypt.compare(password, this.password);
  //   return isValid;
  // }
}
