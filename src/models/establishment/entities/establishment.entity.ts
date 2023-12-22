import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ParkingRegister } from 'src/models/parking-register/entities/parking-register.entity';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';
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

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @ApiProperty()
  email: string;

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

  @Column()
  @ApiProperty()
  availableCarSlots: number;

  @Column()
  @ApiProperty()
  availableMotorcycleSlots: number;

  @OneToMany(
    () => ParkingRegister,
    (parkingRegister) => parkingRegister.establishment,
    { lazy: true, eager: false },
  )
  @ApiProperty({ type: () => ParkingRegister })
  parkingRegisters: ParkingRegister[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.establishment)
  vehicles: Vehicle[];

  constructor(partial: Partial<Establishment>) {
    Object.assign(this, partial);
  }
}
