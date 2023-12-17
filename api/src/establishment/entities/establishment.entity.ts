import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'establishments' })
export class Establishment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  motorcycleSlots: number;

  @Column()
  carSlots: number;
}
