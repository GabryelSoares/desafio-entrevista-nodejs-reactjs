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

  constructor(establishment?: Partial<Establishment>) {
    this.id = establishment?.id;
    this.name = establishment?.name;
    this.cnpj = establishment?.cnpj;
    this.password = establishment?.password;
    this.address = establishment?.address;
    this.phone = establishment?.phone;
    this.motorcycleSlots = establishment?.motorcycleSlots;
    this.carSlots = establishment?.carSlots;
  }
}
