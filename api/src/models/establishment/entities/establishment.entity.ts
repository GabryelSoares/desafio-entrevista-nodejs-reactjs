import { ApiProperty } from '@nestjs/swagger';
import { ParkingRegister } from 'src/models/parking-register/entities/parking-register.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(
    () => ParkingRegister,
    (parkingRegister) => parkingRegister.establishment,
    { lazy: true, eager: false },
  )
  @ApiProperty({ type: () => ParkingRegister })
  parkingRegisters: ParkingRegister[];

  constructor(partial: Partial<Establishment>) {
    Object.assign(this, partial);
  }
}
