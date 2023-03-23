import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MyhomeCounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ip!: string;

  @Column()
  myhomeId!: number;

  @Column()
  time!: string;

 @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}