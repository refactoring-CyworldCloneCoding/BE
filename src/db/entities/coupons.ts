import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Coupons extends BaseEntity {
  @PrimaryGeneratedColumn()
  couponId!: number;

  @Column()
  couponNum!: number;

  @Column()
  price!: number;

  @Column({ default: false })
  status: boolean;

 @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}