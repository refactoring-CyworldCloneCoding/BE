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
import {
  Comments,
  Diaries,
  Guestbooks,
  Ilchonpyungs,
  Myhomes,
  Ilchons,
} from '.';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column({ default: '' })
  password!: string;

  @Column()
  gender!: string;

  @Column()
  birth!: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 'local' })
  provider: string;

  @Column({ default: '' })
  snsId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(() => Myhomes, (myhome) => myhome.user)
  myhome!: Myhomes;

  @OneToMany(() => Ilchons, (ilchons) => ilchons.user)
  ilchons!: Ilchons[];

  @OneToMany(() => Diaries, (diaries) => diaries.user)
  diaries!: Diaries[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments!: Comments[];

  @OneToMany(() => Ilchonpyungs, (ilchonpyungs) => ilchonpyungs.user)
  ilchonpyungs!: Ilchonpyungs[];

  @OneToMany(() => Guestbooks, (guestbooks) => guestbooks.user)
  guestbooks!: Guestbooks[];
}
