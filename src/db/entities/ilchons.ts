import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from '.';

@Entity()
export class Ilchons extends BaseEntity {
  @PrimaryGeneratedColumn()
  ilchonId!: number;

  @Column()
  reqId!: number;

  @Column()
  resId!: number;

  @Column()
  reqName!: string;

  @Column()
  resName!: string;

  @Column()
  reqIlchonName!: string;

  @Column()
  resIlchonName!: string;

  @Column({ default: 'standby' })
  state: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Users, (user) => user.ilchons)
  user!: Users;
}
