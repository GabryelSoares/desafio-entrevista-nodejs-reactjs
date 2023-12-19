import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'establishments' })
export class Establishment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  cnpj: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  motorcycleSlots: number;

  @Column()
  @ApiProperty()
  carSlots: number;

  constructor(partial: Partial<Establishment>) {
    Object.assign(this, partial);
  }
}
