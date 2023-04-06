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
  senderId!: number;

  @Column()
  recipientId!: number;

  @Column()
  senderName!: string;

  @Column()
  recipientName!: string;

  @Column()
  senderIlchonName!: string;

  @Column()
  recipientIlchonName!: string;

  @Column({ default: 'standby' })
  state: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Users, (user) => user.ilchons)
  user!: Users;
}
